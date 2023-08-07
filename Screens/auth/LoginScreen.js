import { useState } from "react";
import { debounce } from "lodash";
import {useNavigation} from '@react-navigation/native'
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

const initialState = {
  email: "",
  password: "",
};

export default LoginScreen = () => {
  const navigation = useNavigation();
  const [isKeaboardShown, setIsKeyboardShown] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState({
    email: false,
    password: false,
  });

  const [data, setData] = useState(initialState);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(true);

  const onLogin = () => {
    if (!checkValidEmail) {
      return;
    }
    if (data.email === "" || data.password === "") {
      console.log("All fields must be filled");
      return;
    }
    setIsKeyboardShown(false);
    setData(initialState);
    console.log(data);
    navigation.navigate('DefaultScreenPosts')
    Keyboard.dismiss();
  };
  const handleCheckEmail = (value) => {
    let redex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    setCheckValidEmail(redex.test(value));
  };

  const debouncedHandleEmailCheck = debounce(handleCheckEmail, 500);
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
            ...styles.form,
            ...Platform.select({
              ios: {
                marginTop: isKeaboardShown ? 456 : 0,
              },
              android: {
                marginTop: isKeaboardShown ? -150 : 0,
              },
            }),
          }}
        >
          <Text style={styles.title}>Увійти</Text>

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
                setIsKeyboardShown(true);
                setIsInputFocused({ ...isInputFocused, password: true });
              }}
              onBlur={() => {
                setIsInputFocused({
                  ...isInputFocused,
                  password: false,
                });
              }}
              style={[styles.input, isInputFocused.password && styles.focused]}
              placeholder="Пароль"
              secureTextEntry={isPasswordHidden}
              value={data.password}
              onChangeText={(value) =>
                setData((prevState) => ({ ...prevState, password: value }))
              }
            />
            <TouchableOpacity
              style={styles.showPassword}
              activeOpacity={1}
              onPress={() => {
                setIsPasswordHidden((prevState) => !prevState);
              }}
            >
              <Text style={styles.showPasswordText}>Показати</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.submit}
            activeOpacity={0.7}
            onPress={onLogin}
          >
            <Text style={styles.btnText}>Увійти</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountBtn} activeOpacity={1} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.accountBtnText}>Немає акаунту? </Text>
            <Text style={styles.register}>Зареєструватися</Text>
          </TouchableOpacity>
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
    paddingTop: 16,
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
  form: {
    width: "100%",
    paddingTop: 32,
    paddingBottom: 111,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    letterSpacing: 0.01,
    color: "#212121",
    textAlign: "center",
    marginBottom: 32,
  },
  submit: {
    height: 50,
    marginTop: 27,
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
  accountBtn: {
    flexDirection: "row",
    justifyContent: "center",
  },
  accountBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#1B4371",
  },
  register: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#1B4371",
    textDecorationLine: "underline",
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
