import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./Screens/router";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
} from "react-native";


export default function App() {
  const routing = useRoute(null)
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          {routing}
          <StatusBar style="auto" />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
