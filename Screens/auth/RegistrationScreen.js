import { useState } from "react";
import { debounce } from "lodash";
import {
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { useDispatch } from "react-redux";
import { authSignUp } from "../../redux/auth/authOperations";
import { uploadBytes, ref, getDownloadURL, getStorage } from "firebase/storage";

import db from "../../firebase/config";
const storage = getStorage(db);

const initialState = {
  login: "",
  email: "",
  password: "",
  imageUri: null,
};

export default RegistrationScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState(null);
  const [isKeaboardShown, setIsKeyboardShown] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState({
    login: false,
    email: false,
    password: false,
  });
  const [data, setData] = useState(initialState);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(true);

  const handleAddAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permission");
      return;
    }

    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (image.assets.length > 0) {
      setPhoto(image.assets[0]);
    }
  };

  const clearPhoto = () => {
    setPhoto(null);
  };

  const uploadPhotoToServer = async () => {
    const uniquePostId = Date.now().toString();
    try {
      const response = await fetch(photo.uri);
      const file = await response.blob();

      const storageRef = ref(
        storage,
        `profileAvatar/${uniquePostId}/${file.data.name}`
      );
      await uploadBytes(storageRef, file);

      const getAvatarRef = await getDownloadURL(storageRef);
      return getAvatarRef;
    } catch (error) {
      console.log(error.message);
    }
  };

  const onRegister = async () => {
    if (!checkValidEmail) {
      return;
    }
    if (data.login === "" || data.email === "" || data.password === "") {
      console.log("All fields must be filled");
      return;
    }
    try {
      setIsKeyboardShown(false);
      Keyboard.dismiss();
      const avatar = photo ? await uploadPhotoToServer() : null;

      const user = {
        login: data.login,
        email: data.email,
        password: data.password,
        photo: avatar,
      };

      dispatch(authSignUp(user));

      setData(initialState);
      setPhoto(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCheckEmail = (value) => {
    let redex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    setCheckValidEmail(redex.test(value));
  };

  const debouncedHandleEmailCheck = debounce(handleCheckEmail, 1000);
  const handleValidEmail = (value) => {
    setData((prevState) => ({ ...prevState, email: value }));
    debouncedHandleEmailCheck(value);
  };

  return (
    <ImageBackground
      style={styles.background}
      resizeMode="cover"
      source={require("../../assets/BgPic.jpg")}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            ...styles.formWrapper,
            ...Platform.select({
              ios: {
                marginTop: isKeaboardShown ? 195 : 219,
              },
              android: {
                marginTop: isKeaboardShown ? -185 : 0,
              },
            }),
          }}
        >
          {photo ? (
            <View
              style={{
                ...styles.avatarBox,
                top: isKeaboardShown ? "-12%" : "-15%",
              }}
            >
              <Image style={styles.avatar} source={{ uri: photo.uri }} />
              <View style={styles.iconBtn}>
                <TouchableOpacity onPress={clearPhoto}>
                  <Feather name="delete" size={25} color={"#212121"} />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View
              style={{
                ...styles.avatarBox,
                top: isKeaboardShown ? "-12%" : "-15%",
              }}
            >
              <View style={styles.iconBtn}>
                <TouchableOpacity onPress={handleAddAvatar}>
                  <AntDesign name="pluscircleo" size={25} color={"#FF6C00"} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={styles.form}>
            <Text style={styles.title}>Реєстрація</Text>
            <View>
              <TextInput
                onFocus={() => {
                  setIsKeyboardShown(true);
                  setIsInputFocused({ ...isInputFocused, login: true });
                }}
                onBlur={() => {
                  setIsInputFocused({
                    ...isInputFocused,
                    login: false,
                  });
                }}
                style={[styles.input, isInputFocused.login && styles.focused]}
                placeholder="Логін"
                placeholderTextColor={styles.placeholderColor}
                value={data.login}
                onChangeText={(value) =>
                  setData((prevState) => ({ ...prevState, login: value }))
                }
                textContentType="username"
              />
            </View>
            <View style={styles.emailInput}>
              <TextInput
                onFocus={() => {
                  setIsKeyboardShown(true);
                  setIsInputFocused({ ...isInputFocused, email: true });
                }}
                style={[styles.input, isInputFocused.email && styles.focused]}
                placeholder="Адреса електронної пошти"
                value={data.email}
                onChangeText={handleValidEmail}
                onBlur={() => {
                  setIsInputFocused({
                    ...isInputFocused,
                    email: false,
                  });
                }}
                textContentType="emailAddress"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {!checkValidEmail ? (
                <Text style={styles.validation}> Wrong format</Text>
              ) : (
                <Text style={styles.validation}></Text>
              )}
            </View>
            <View style={styles.inputBox}>
              <TextInput
                onFocus={() => {
                  setIsInputFocused({ ...isInputFocused, password: true });
                }}
                onBlur={() => {
                  setIsKeyboardShown(false);
                  setIsInputFocused({
                    ...isInputFocused,
                    password: false,
                  });
                }}
                style={[
                  styles.input,
                  isInputFocused.password && styles.focused,
                ]}
                placeholder="Пароль"
                secureTextEntry={isPasswordHidden}
                value={data.password}
                onChangeText={(value) =>
                  setData((prevState) => ({ ...prevState, password: value }))
                }
                textContentType="password"
              />
              <TouchableOpacity
                style={styles.showPassword}
                activeOpacity={1}
                onPress={() => {
                  setIsPasswordHidden((prevState) => !prevState);
                }}
              >
                {isPasswordHidden ? (
                  <Text style={styles.showPasswordText}>Показати</Text>
                ) : (
                  <Text style={styles.showPasswordText}>Сховати </Text>
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{ ...styles.submit, marginTop: isKeaboardShown ? 16 : 27 }}
              activeOpacity={0.7}
              onPress={onRegister}
            >
              <Text style={styles.btnText}>Зареєструватися</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.accountBtn}
              activeOpacity={1}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.accountBtnText}>Вже є акаунт? Увійти</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  inputBox: {
    position: "relative",
  },
  input: {
    height: 50,
    marginBottom: 16,
    padding: 16,
    paddingBottom: 15,
    marginHorizontal: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  placeholderColor: {
    color: "#BDBDBD",
  },
  focused: {
    borderColor: "#FF6C00",
    backgroundColor: "#fff",
  },
  avatarBox: {
    position: "absolute",
    left: "35%",
    // top: "-15%",
    zIndex: 10,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  avatar: {
    borderRadius: 16,
    width: "100%",
    height: "100%",
  },
  iconBtn: {
    position: "absolute",
    left: "90%",
    top: "65%",
  },
  formWrapper: {
    paddingTop: 92,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "center",
  },
  form: {
    paddingBottom: 45,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    letterSpacing: 0.01,
    color: "#212121",
    textAlign: "center",
    marginBottom: 33,
  },
  submit: {
    height: 50,
    marginBottom: 16,
    marginHorizontal: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#fff",
  },
  showPassword: {
    position: "absolute",
    right: 32,
    top: 14,
  },
  showPasswordText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
  },
  accountBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#1B4371",
  },
  btnContainer: {
    width: "100%",
    paddingBottom: 45,
    backgroundColor: "#fff",
    flex: 0,
  },
  emailInput: {
    position: "relative",
  },
  validation: {
    position: "absolute",
    right: 32,
    top: 14,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "red",
  },
});
