import "react-native-gesture-handler";
import { Main } from "./components/Main";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <Main />
          <StatusBar style="auto" />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
