import { useState } from "react";
import ExitIcon from "../../assets/icons/exitIcon";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";

const Users = [
  {
    id: 1,
    name: "Polina Kuyanova",
    email: "fsdlfbdofvsed@gmail.com",
  },
];
export default PostsScreen = () => {
  const [users, setUsers] = useState(Users);
  return (
    <ImageBackground style={styles.background} resizeMode="cover">
      <View style={styles.posts}>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <View style={styles.userInfo}>
              <View style={styles.userAva}>
                <Image
                  source={require("../../assets/images.jpg")}
                  style={styles.image}
                />
              </View>
              <View style={styles.userText}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 44,
    paddingBottom: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  exitBtn: {
    paddingRight: 16,
  },
  posts: {
    paddingHorizontal: 16,
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  userInfo: {
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  userAva: {
    width: 60,
    height: 60,
    overflow: "hidden",
  },
  image: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "pink",
  },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33,33,33,0.8)",
  },
});
