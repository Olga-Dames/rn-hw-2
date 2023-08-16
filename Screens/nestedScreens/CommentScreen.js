import { format } from "date-fns";
import { en } from "date-fns/locale";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
  Image,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  r,
} from "react-native";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import app from "../../firebase/config";
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

import { AntDesign } from "@expo/vector-icons";

const db = getFirestore(app);

const formatDate = (date) => {
  return format(Date.parse(date), "dd MMMM, yyyy | HH:mm:ss", {
    locale: en,
  });
};

const CommentsScreen = ({ route, navigation }) => {
  const { postId, photo, prevScreen } = route.params;
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);

  const { login } = useSelector((state) => state.auth);
  const avatar = useSelector((state) => state.auth.photo);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    navigation.setParams({ commentsCount: commentsCount });
  }, [commentsCount]);

  const createPost = async () => {
    if (!comment.trim()) {
      Alert.alert("Коментар не може бути порожнім");
      return;
    }
    const docRef = await doc(db, "posts", postId);

    await addDoc(collection(docRef, "comments"), {
      comment,
      login,
      postedDate: formatDate(new Date()),
    });

    setComment("");
    keyboardHide();
  };

  const getAllPosts = async () => {
    try {
      const docRef = await doc(db, "posts", postId);

      onSnapshot(collection(docRef, "comments"), (data) =>
        setAllComments(
          data.docs.map((doc) => ({
            ...doc.data(),
            postId: doc.id,
          }))
        )
      );

      setCommentsCount(Number(allComments.length));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            ...styles.postWrapper,

            ...Platform.select({
              ios: {
                marginBottom: isShowKeyboard ? 145 : 0,
              },
              android: {
                marginTop: isShowKeyboard ? -30 : 0,
              },
            }),
          }}
        >
          {/* <ScrollView> */}
          <Image source={{ uri: photo }} style={styles.post} />
          <View
            style={{ ...styles.wrapper, height: isShowKeyboard ? 10 : 220 }}
          >
            <FlatList
              data={allComments}
              renderItem={({ item }) => (
                <View style={styles.wrapperComment}>
                  <Image
                    style={styles.avatar}
                    // source={require("../../assets/image/avatar.png")}
                    source={{ uri: avatar }}
                  />
                  <View style={styles.commentContainer}>
                    <Text style={styles.userName}>{item.login}</Text>
                    <Text style={styles.userComment}>{item.comment}</Text>
                    <Text style={styles.userPostedDate}>{item.postedDate}</Text>
                  </View>
                </View>
              )}
              keyExtractor={(item) => item.postId}
            />
          </View>
          {/* </ScrollView> */}

          <View>
            <TextInput
              placeholderTextColor={"#BDBDBD"}
              placeholder="Коментувати..."
              style={styles.input}
              value={comment}
              onChangeText={(value) => setComment(value)}
              onBlur={keyboardHide}
              onFocus={() => setIsShowKeyboard(true)}
            ></TextInput>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={createPost}
            >
              <AntDesign name="arrowup" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    // justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 12,
  },
  wrapper: {
    // height: 220,
    alignItems: "flex-end",
  },
  wrapperComment: {
    display: "flex",
    flexDirection: "row",
  },
  commentContainer: {
    padding: 16,
    marginBottom: 24,
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderColor: "rgba(0, 0, 0, 0.03)",
    width: 299,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
    marginRight: 16,
  },

  post: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    marginBottom: 32,
    paddingTop: 32,
  },
  input: {
    position: "relative",
    padding: 16,
    height: 50,
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 18,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  button: {
    position: "absolute",
    left: "80%",
    top: 8,
    marginHorizontal: 25,
    backgroundColor: "#FF6C00",
    height: 35,
    width: 35,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  userName: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 13,
    lineHeight: 18,
    color: "#BDBDBD",
  },
  userComment: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  userPostedDate: {
    fontFamily: "Roboto-Regular",
    fontStyle: "normal",
    fontSize: 10,
    lineHeight: 11.72,
    color: "#BDBDBD",
    textAlign: "right",
  },
});
