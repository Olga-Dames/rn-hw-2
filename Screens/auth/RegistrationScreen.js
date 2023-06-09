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
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default RegistrationScreen = ({navigation}) => {
  const [isKeaboardShown, setIsKeyboardShown] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState({
    login: false,
    email: false,
    password: false,
  });

  const [data, setData] = useState(initialState);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(true);

  const onRegister = () => {
    if (!checkValidEmail) {
      return;
    }
    if (data.login === "" || data.email === "" || data.password === "") {
      console.log("All fields must be filled");
      return;
    }
    setIsKeyboardShown(false);
    console.log(data);
    navigation.navigate('Home')
    setData(initialState);
    Keyboard.dismiss();
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
          <View
            style={{
              ...styles.avatarBox,
              top: isKeaboardShown ? "-12%" : "-15%",
            }}
          >
            <View style={styles.iconBtn}>
              <TouchableOpacity>
                <AntDesign name="pluscircleo" size={25} color={"#FF6C00"} />
              </TouchableOpacity>
            </View>
          </View>
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
            <TouchableOpacity style={styles.accountBtn} activeOpacity={1} onPress={() => navigation.navigate('Login')}>
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
