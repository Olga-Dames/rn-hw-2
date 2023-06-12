import { useState } from "react";
import { Camera } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default CreatePostsScreen = () => {
  const [isKeaboardShown, setIsKeyboardShown] = useState(false);
  const [photo, setPhoto] = useState("");
  const [cameraRef, setCameraRef] = useState(null);
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ marginBottom: isKeaboardShown ? 100 : 0 }}>
          <ScrollView>
            <Camera style={styles.camera} ref={setCameraRef}>
              <TouchableOpacity
                style={styles.photoicon}
                activeOpacity={1}
                onPress={() => {}}
              >
                <FontAwesome name="camera" size={20} color={"#BDBDBD"} />
              </TouchableOpacity>
            </Camera>
            <Text style={styles.loadPic}>Завантажити фото</Text>
            <View>
              <TextInput style={styles.input} placeholder="Назва..."></TextInput>
              <TextInput style={styles.locationInput} placeholder="Місцевість..."></TextInput>
              <TouchableOpacity style={styles.locationBtn}>
<Ionicons name="location-outline" size={24} color={'#BDBDBD'}/>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  camera: {
    flex: 1,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  // userInfo: {
  //   marginTop: 32,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   gap: 8,
  // },
  placeholderColor: {
    color: "#BDBDBD",
  },
  loadPic: {
    marginBottom: 32,
    marginTop: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  photoicon: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  input: {
    height: 50,
    marginBottom: 16,
    padding: 16,
    paddingTop: 16,
    paddingBottom: 15,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderRadius: 8,
    bordeBottomrWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  focused: {
    borderColor: "#FF6C00",
    backgroundColor: "#fff",
  },
  locationBtn: {
    position: 'absolute',
    top: '68%',
    left: 5,
    width: 25,
    heigth: 25,
  },
  locationInput: {
    height: 50,
    padding: 16,
    paddingTop: 16,
    paddingBottom: 15,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderRadius: 8,
    bordeBottomrWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingLeft: 30,
  }
});
