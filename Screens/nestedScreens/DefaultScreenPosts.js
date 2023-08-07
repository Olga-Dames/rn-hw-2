import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

export default DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  const [commentsCount, setCommentsCount] = useState({});
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  return (
    <ImageBackground style={styles.background} resizeMode="cover">
      <View style={styles.posts}>
        <View style={styles.userInfo}>
          <View style={styles.userAva}>
            <Image
              source={require("../../assets/images.jpg")}
              style={styles.image}
            />
          </View>
          <View style={styles.userText}>
            <Text style={styles.userName}>Polina</Text>
            <Text style={styles.userEmail}>polina@gmail.com</Text>
          </View>
        </View>
        {posts.length === 0 && (
          <View>
            <Text style={styles.noposts}>Нет публикаций</Text>
          </View>
        )}
        {posts && (
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <View style={styles.postsContainer}>
                <Image style={styles.postImg} source={{ uri: item.photo }} />
                <Text style={styles.descr}>{item.comment}</Text>
                <View style={styles.postDescrContainer}>
                  <View style={styles.commentBox}>
                    <TouchableOpacity
                      style={styles.commentBtn}
                      onPress={() => {
                        navigation.navigate("Comment");
                      }}
                    >
                      <Feather
                        name="message-circle"
                        size={24}
                        color={"#BDBDBD"}
                      />
                    </TouchableOpacity>
                    <Text style={styles.commentCount}>0</Text>
                  </View>
                  <View style={styles.locationBox}>
                    <TouchableOpacity
                      style={styles.locationBtn}
                      onPress={() => {
                        navigation.navigate("Map", {
                          location: item.location,
                        });
                      }}
                    >
                      <Ionicons
                        name="location-outline"
                        size={24}
                        color={"#BDBDBD"}
                      />
                    </TouchableOpacity>
                    <Text style={styles.locationText}>
                      {item.locationName}
                    </Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item, indx) => indx.toString()}
          />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#fff",
  },
  posts: {
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: "#fff",
  },
  userInfo: {
    marginVertical: 32,
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
  noposts: {
    marginTop: 150,
   textAlign: "center",
   fontSize: 16,
   color: "#212121"
  },
  postImg: {
    height: 240,
    width: 360,
    borderRadius: 8,
    marginBottom: 8,
  },
  postsContainer: {
    marginBottom: 32,
    width: 343,
  },
  descr: {
    marginBottom: 8,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    fontFamily: "Roboto-Medium",
  },
  postDescrContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 50
  },
  commentBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  commentBtn: {
    transform: [{ rotate: "270deg" }],
  },
  locationBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  locationBtn: {
    width: 25,
    heigth: 25,
  },
  commentCount: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  locationText: {
    color: "#212121",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
