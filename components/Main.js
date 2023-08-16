import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../Screens/router";
import db from "../firebase/config";
import { getAuth } from "firebase/auth";

import { authStateChangeUser } from "../redux/auth/authOperations";

const auth = getAuth(db);

export const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
