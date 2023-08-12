import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { authSlice } from "./authReducer";
import db from "../../firebase/config";

const auth = getAuth(db);

export const authSignUp =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = await auth.currentUser;
      const { displayName, uid } = await auth.currentUser;

      await updateProfile(user, {
        displayName: login,
      });

      const userUpdateProfile = {
        login: displayName,
        userId: uid,
      };

      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
      console.log("user", user);
    } catch (error) {
      console.log(error.message);
    }
  };

export const authSignIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };

export const authSignOut = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSlice.actions.authSignOut());
};

export const authStateChange = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUpdateProfile = {
          login: user.displayName,
          // userEmail: user.email,
          userId: user.uid,
          // userEmail: user.email,
          // photo: user.photoURL,
        };
        dispatch(authSlice.actions.authStateChange({ stateChange: true }));
        dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
