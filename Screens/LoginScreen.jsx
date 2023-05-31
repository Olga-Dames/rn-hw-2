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
} from "react-native";

export default LoginScreen = () => {
  const [isKeaboardShown, setIsKeyboardShown] = useState(false);
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
                marginTop: isKeaboardShown ? 195 : 219,
              },
              android: {
                marginTop: isKeaboardShown ? -123 : 0,
              },
            }),
          }}
        >
          <Text style={styles.title}>Увійти</Text>

          <View>
            <TextInput
            onFocus={() => {
              setIsKeyboardShown(true);
            }}
              style={styles.input}
              placeholder="Адреса електронної пошти"
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
            onFocus={() => {
              setIsKeyboardShown(true);
            }}
              style={styles.input}
              placeholder="Пароль"
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.showPassword} activeOpacity={1}>
              <Text style={styles.showPasswordText}>Показати</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.submit} activeOpacity={0.7}>
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
