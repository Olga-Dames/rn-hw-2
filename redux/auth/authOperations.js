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

const { updateUserProfile, authSignOut, authStateChange } = authSlice.actions;

const auth = getAuth(db);

export const authSignUp =
  ({ login, email, password, photo }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = await auth.currentUser;
      const { displayName, uid, photoURL } = await auth.currentUser;

      await updateProfile(user, {
        displayName: login,
        photoURL: photo,
      });

      const userUpdateProfile = {
        login: displayName,
        userId: uid,
        photo: photoURL,
        userEmail: email,
      };

      dispatch(updateUserProfile(userUpdateProfile));
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

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUpdateProfile = {
          login: user.displayName,
          userId: user.uid,
          userEmail: user.email,
          photo: user.photoURL,
        };
        dispatch(authStateChange({ stateChange: true }));
        dispatch(updateUserProfile(userUpdateProfile));
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};
