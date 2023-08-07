import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";
import MapScreen from "../nestedScreens/MapScreen";
import CommentScreen from "../nestedScreens/CommentScreen";

const NestedScreen = createStackNavigator();

export default PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
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
