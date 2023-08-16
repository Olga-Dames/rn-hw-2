import React from "react";

import { TouchableOpacity } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

import RegistrationScreen from "./auth/RegistrationScreen";
import LoginScreen from "./auth/LoginScreen";
import PostsScreen from "./mainScreen/PostsScreen";
import CreatePostsScreen from "./mainScreen/CreatePostsScreen";
import ProfileScreen from "./mainScreen/ProfileScreen";
import DefaultScreenPosts from "./nestedScreens/DefaultScreenPosts";

import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";

import { useDispatch } from "react-redux";
import { authSignOutUser } from "../redux/auth/authOperations";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

function MyBackButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <AntDesign name="arrowleft" size={24} color={"#BDBDBD"} />
    </TouchableOpacity>
  );
}
export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return <HomeTabs />;
};

export function HomeTabs() {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <MainTab.Navigator
      screenOptions={{
        // initialRouteName: "Home",
        tabBarShowLabel: false,
        tabBarShowIcon: true,
        tabBarStyle: {
          height: 50,
          paddingBottom: 3,
          paddingTop: 9,
          borderTopWidth: 1,
          borderTopColor: "#BDBDBD",
          paddingLeft: 80,
          paddingRight: 80,
        },
      }}
    >
      <MainTab.Screen
        name="Home"
        // component={DefaultScreenPosts}
        component={PostsScreen}
        options={{
          title: "Публікації",
          titleStyle: {
            height: 40,
            textAlign: "center",
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            lineHeight: 22,
            color: "#212121",
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity activeOpacity={1} onPress={signOut}>
              <Ionicons name="exit-outline" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "#BDBDBD",
          },
          headerRightContainerStyle: {
            paddingRight: 16,
          },
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign name="appstore-o" size={24} color={"#BDBDBD"} />
          ),
        }}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="plus" size={18} color={"#fff"} />
          ),
          headerLeft: () => MyBackButton(),
          tabBarStyle: { display: "none" },
          headerLeftContainerStyle: {
            paddingLeft: 16,
          },
          title: "Створити публікацію",
          titleStyle: {
            height: 40,
            textAlign: "center",
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            lineHeight: 22,
            color: "#212121",
          },
          headerTitleAlign: "center",
          tabBarItemStyle: {
            width: 70,
            backgroundColor: "#FF6C00",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          },
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "#BDBDBD",
          },
          headerRightContainerStyle: {
            paddingRight: 16,
          },
        }}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          headerRight: () => (
            <TouchableOpacity activeOpacity={1} onPress={signOut}>
              <Ionicons name="exit-outline" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color={"#BDBDBD"} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
}
