import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../Screens/router";
import db from "../firebase/config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { authStateChange } from "../redux/auth/authOperations";

const auth = getAuth(db);

export const Main = () => {
  const [user, setUser] = useState(null);
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const routing = useRoute(stateChange);

  useEffect(() => {
    dispatch(authStateChange());
  }, []);

  onAuthStateChanged(auth, (user) => {
    setUser(user), console.log(user);
  });

  return <NavigationContainer>{routing}</NavigationContainer>;
};
