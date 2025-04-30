import store from "store";
import { createContext, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
import {
  IS_AUTH_KEY,
  PROFILE,
  ROLE,
  ROLE_ID,
  TOKEN_KEY,
  USER_EMAIL_KEY,
  USER_ID_KEY,
  USER_NAME_KEY,
} from "../../constants";

export const AuthContext = createContext();

const initialState = {
  isLoggedIn: store.get(IS_AUTH_KEY),
  userId: store.get(USER_ID_KEY),
  userName: store.get(USER_NAME_KEY),
  userEmail: store.get(USER_EMAIL_KEY),
  profile: store.get(PROFILE),
  token: store.get(TOKEN_KEY),
  role: store.get(ROLE),
  roleId: store.get(ROLE_ID),
};

export const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const value = { state, dispatch };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
