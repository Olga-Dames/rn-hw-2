import { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AddAvatarIcon from "./icons/addAvatarIcon";

export default RegistrationScreen = () => {
  const [isKeaboardShown, setIsKeyboardShown] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState({
    login: false,
    email: false,
    password: false,
  });
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
            ...styles.formWrapper,
            ...Platform.select({
              ios: {
                marginTop: isKeaboardShown ? 195 : 219,
              },
              android: {
                marginTop: isKeaboardShown ? -130 : 0,
              },
            }),
          }}
        >
          <View style={{...styles.avatarBox, top: isKeaboardShown ? "-20%": '-15%'}}>
            <View style={styles.iconBtn}>
              <TouchableOpacity>
                <AddAvatarIcon />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{ ...styles.form, paddingBottom: isKeaboardShown ? 32 : 45 }}
          >
            <Text style={styles.title}>Реєстрація</Text>
            <View>
              <TextInput
                onFocus={() => {
                  setIsKeyboardShown(true);
                  setIsInputFocused({ ...isInputFocused, login: true });
                }}
                onBlur={() => {
                  setIsKeyboardShown(false);
                  setIsInputFocused({
                    ...isInputFocused,
                    login: false,
                  });
                }}
                style={[styles.input, isInputFocused.login && styles.focused]}
                placeholder="Логін"
                placeholderTextColor={styles.placeholderColor}
              />
            </View>
            <View>
              <TextInput
                onFocus={() => {
                  setIsKeyboardShown(true);
                  setIsInputFocused({ ...isInputFocused, email: true });
                }}
                onBlur={() => {
                  setIsKeyboardShown(false);
                  setIsInputFocused({
                    ...isInputFocused,
                    email: false,
                  });
                }}
                style={[styles.input, isInputFocused.email && styles.focused]}
                placeholder="Адреса електронної пошти"
              />
            </View>
            <View style={styles.inputBox}>
              <TextInput
                onFocus={() => {
                  setIsKeyboardShown(true);
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
                secureTextEntry={true}
              />
              <TouchableOpacity style={styles.showPassword} activeOpacity={1}>
                <Text style={styles.showPasswordText}>Показати</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={{ ...styles.submit, marginTop: isKeaboardShown ? 16 : 27 }}
              activeOpacity={0.7}
            >
              <Text style={styles.btnText}>Зареєструватися</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accountBtn} activeOpacity={1}>
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
  form: {},
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
});
