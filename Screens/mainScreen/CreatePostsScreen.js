import { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Keyboard } from "react-native";

export default CreatePostsScreen = ({ navigation }) => {
  const [isKeaboardShown, setIsKeyboardShown] = useState(false);
  const [photo, setPhoto] = useState("");
  const [cameraRef, setCameraRef] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        console.log("Camera permission denied");
      } else {
        console.log("Camera permission granted");
      }
    };

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    requestCameraPermission();
  }, []);

  const keaboardHide = () => {
    Keyboard.dismiss();
    setIsKeyboardShown(false);
  };

  const takePic = async () => {
    try {
      const photo = await cameraRef.takePictureAsync();
      setPhoto(photo.uri);
      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
      console.log("take", location);
    } catch (error) {
      console.log(error);
    }
  };

  const sendPic = () => {
    if (!photo) {
      Alert.alert("Завантажте фото");
      return;
    }
    console.log("send", location);
    clearData();
    navigation.navigate("DefaultScreen", {
      photo,
      location,
      comment,
      locationName,
    });
  };

  const clearData = () => {
    setComment("");
    setLocationName("");
    setPhoto("");
  };

  const deletePost = () => {
    clearData();
  };
  return (
    <View
      style={{ ...styles.container, paddingVertical: isKeaboardShown ? 5 : 32 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ marginTop: isKeaboardShown ? -100 : 0 }}>
          <ScrollView>
            <View style={styles.cameraBox}>
              <Camera style={styles.camera} ref={setCameraRef}>
                {photo && (
                  <View style={styles.previewPhotoBox}>
                    <Image
                      source={{ uri: photo }}
                      style={styles.previewPhoto}
                    />
                  </View>
                )}
                <TouchableOpacity
                  style={styles.photoicon}
                  activeOpacity={1}
                  onPress={takePic}
                >
                  {photo ? (
                    <FontAwesome name="camera" size={20} color={"#FFF"} />
                  ) : (
                    <FontAwesome name="camera" size={20} color={"#BDBDBD"} />
                  )}
                </TouchableOpacity>
              </Camera>
            </View>
            {photo ? (
              <Text
                style={{
                  ...styles.loadPic,
                }}
              >
                Редагувати фото
              </Text>
            ) : (
              <Text
                style={{
                  ...styles.loadPic,
                }}
              >
                Завантажте фото
              </Text>
            )}
            <View>
              <TextInput
                style={styles.input}
                placeholder="Назва..."
                placeholderTextColor="#BDBDBD"
                value={comment}
                onChangeText={(value) => setComment(value)}
                onFocus={() => {
                  setIsKeyboardShown(true);
                }}
                onBlur={keaboardHide}
              ></TextInput>
              <TextInput
                style={styles.locationInput}
                placeholder="Місцевість..."
                placeholderTextColor="#BDBDBD"
                value={locationName}
                onChangeText={(value) => {
                  setLocationName(value);
                }}
                onFocus={() => {
                  setIsKeyboardShown(true);
                }}
                onBlur={keaboardHide}
              ></TextInput>
              <TouchableOpacity
                style={{
                  ...styles.locationBtn,
                }}
                onPress={() =>
                  navigation.navigate("Map", {
                    location: location.coords,
                  })
                }
              >
                <Ionicons name="location-outline" size={24} color={"#BDBDBD"} />
              </TouchableOpacity>
              {photo ? (
                <TouchableOpacity
                  style={{
                    ...styles.publishBtn,
                    backgroundColor: "#FF6C00",
                    marginTop: isKeaboardShown ? 15 : 32,
                  }}
                  onPress={sendPic}
                >
                  <Text style={{ ...styles.publishText, color: "#FFF" }}>
                    Опублікувати
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    ...styles.publishBtn,
                    backgroundColor: "#f6f6f6",
                    marginTop: isKeaboardShown ? 15 : 32,
                  }}
                  onPress={sendPic}
                >
                  <Text
                    style={{
                      ...styles.publishText,
                      color: "#BDBDBD",
                    }}
                  >
                    Опублікувати
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={{
                ...styles.trashBtn,
                marginTop: isKeaboardShown ? 10 : 85,
              }}
              onPress={deletePost}
            >
              <Ionicons name="ios-trash-outline" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  cameraBox: {
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  previewPhotoBox: {
    position: "absolute",
    marginTop: 32,
    marginHorizontal: 16,
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  previewPhoto: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
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
    // borderWidth: 1,
    // borderColor: 'transparent',
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
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontFamily: "Roboto-Medium",
  },
  focused: {
    borderColor: "#FF6C00",
    backgroundColor: "#fff",
  },
  locationBtn: {
    position: "absolute",
    top: "40%",
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
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingLeft: 30,
  },
  publishBtn: {
    flex: 1,
    alignItems: "center",
    // marginTop: 32,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    // backgroundColor: "#f6f6f6",
  },
  publishText: {
    // color: "#BDBDBD",
    fontSize: 16,
  },
  trashBtn: {
    // marginTop: 85,
    alignSelf: "center",
    paddingHorizontal: 23,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f6f6f6",
  },
});
