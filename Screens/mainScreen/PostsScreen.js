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
      {/* <View style={styles.header}> */}
        {/* <Text style={styles.title}>Публікації</Text> */}
        {/* <TouchableOpacity style={styles.exitBtn} activeOpacity={1}>
          <ExitIcon />
        </TouchableOpacity> */}
      {/* </View> */}
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
      {/* <View style={styles.footer}>
        <TouchableOpacity style={styles.grid} activeOpacity={1}>
        <AntDesign name="appstore-o" size={24} color={"#BDBDBD"}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addPost} activeOpacity={0.7}>
        <Feather name="plus" size={18} color={"#fff"}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.userIcon} activeOpacity={1}>
        <Feather name="user" size={24} color={"#BDBDBD"}/>
        </TouchableOpacity>
      </View> */}
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
  // title: {
  //   marginRight: '30%',
  //   textAlign: "center",
    
  // },
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
  // footer: {
  //   paddingBottom: 3,
  //   paddingTop: 9,
  //   flexDirection: "row",
  //   justifyContent: 'center',
  //   alignItems: "center",
  //   gap: 31,
  //   borderTopWidth: 1,
  //   borderTopColor: "#BDBDBD",
  // },
  // addPost: {
  //   height: 40,
  //   width: 70,
  //   backgroundColor: "#FF6C00",
  //   borderRadius: 20,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
});
