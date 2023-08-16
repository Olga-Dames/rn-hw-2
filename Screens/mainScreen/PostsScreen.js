import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";
import MapScreen from "../nestedScreens/MapScreen";
import CommentScreen from "../nestedScreens/CommentScreen";

import { useNavigation } from "@react-navigation/native";

// import { HomeTabs } from "../router";
import { useRoute } from "@react-navigation/native";

import { Feather, Ionicons } from "@expo/vector-icons";

const NestedScreen = createStackNavigator();

export default PostsScreen = () => {
  function MyBackButton() {
    const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#212121" />
      </TouchableOpacity>
    );
  }
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="HomePage"
        // component={HomeTabs}
        component={DefaultScreenPosts}
        options={{ headerShown: false }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{ headerBackTitleVisible: false, headerTintColor: "#212121" }}
      />
      <NestedScreen.Screen
        name="Comment"
        component={CommentScreen}
        options={{ headerBackTitleVisible: false, headerTintColor: "#212121" }}
      />
    </NestedScreen.Navigator>
  );
};
