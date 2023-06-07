import { useState } from "react";
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

export default LoginScreen = () => {
  const [isKeaboardShown, setIsKeyboardShown] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState({
    email: false,
    password: false,
  });
  const initialState = {
    email: "",
    password: "",
  };
  const [data, setData] = useState(initialState);

  const onLogin = () => {
    setIsKeyboardShown(false);
    setData(initialState);
    console.log(data);
    Keyboard.dismiss();
  };
  return (
    <ImageBackground
      style={styles.background}
      resizeMode="cover"
      source={require("../assets/BgPic.jpg")}
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

          <View>
            <TextInput
              onFocus={() => {
                setIsKeyboardShown(true);
                setIsInputFocused({ ...isInputFocused, email: true });
              }}
              onBlur={() => {
                setIsInputFocused({
                  ...isInputFocused,
                  email: false,
                });
              }}
              style={[styles.input, isInputFocused.email && styles.focused]}
              placeholder="Адреса електронної пошти"
              value={data.email}
              onChangeText={(value) =>
                setData((prevState) => ({ ...prevState, email: value }))
              }
            />
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
              secureTextEntry={true}
              value={data.password}
              onChangeText={(value) =>
                setData((prevState) => ({ ...prevState, password: value }))
              }
            />
            <TouchableOpacity style={styles.showPassword} activeOpacity={1}>
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
          <TouchableOpacity style={styles.accountBtn} activeOpacity={1}>
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
    lineHeight: 1.19,
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
});
