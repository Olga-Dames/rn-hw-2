import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegistrationScreen from "./auth/RegistrationScreen";
import LoginScreen from "./auth/LoginScreen";
import PostsScreen from "./mainScreen/PostsScreen";
import CreatePostsScreen from "./mainScreen/CreatePostsScreen";
import ProfileScreen from "./mainScreen/ProfileScreen";
import DefaultScreenPosts from "./nestedScreens/DefaultScreenPosts";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
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
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="DefaultScreenPosts"
          component={HomeTabs}
        />
      </AuthStack.Navigator>
    );
  }
//   return <Home />;
};

export function HomeTabs({navigation}) {
  return (
    <MainTab.Navigator
      screenOptions={{
        initialRouteName: "DefaultScreenPosts",
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
            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Login')}>
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
        name="HomePage"
        component={PostsScreen}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="plus" size={18} color={"#fff"} />
          ),
          headerLeft: () => (
            <TouchableOpacity activeOpacity={1}>
              <AntDesign name="arrowleft" size={24} color={"#BDBDBD"} onPress={() => {navigation.navigate('HomePage')}}/>
            </TouchableOpacity>
          ),
          tabBarStyle: {display: 'none'},
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
