import store from "store";
import {
  IS_AUTH_KEY,
  PROFILE,
  ROLE,
  ROLE_ID,
  TOKEN_KEY,
  USER_EMAIL_KEY,
  USER_ID_KEY,
  USER_NAME_KEY,
} from "../../constants/index";

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      store.set(USER_ID_KEY, action.payload.userId);
      store.set(USER_NAME_KEY, action.payload.userName);
      store.set(USER_EMAIL_KEY, action.payload.userEmail);
      store.set(PROFILE, action.payload.profile);
      store.set(TOKEN_KEY, action.payload.token);
      store.set(IS_AUTH_KEY, true);
      store.set(ROLE, action.payload.role);
      store.set(ROLE_ID, action.payload.roleId);
      return {
        ...state,
        userId: action.payload.userId,
        userName: action.payload.userName,
        userEmail: action.payload.userEmail,
        profile: action.payload.profile,
        token: action.payload.token,
        isLoggedIn: true,
        role: action.payload.role,
        roleId: action.payload.roleId,
      };
    case "PUBLIC_TOKEN":
      store.set(TOKEN_KEY, action.payload.token);
      return {
        ...state,
        token: action.payload.token,
      };
    case "LOGOUT":
      store.remove(USER_ID_KEY);
      store.remove(USER_NAME_KEY);
      store.remove(USER_EMAIL_KEY);
      store.remove(PROFILE);
      store.remove(TOKEN_KEY);
      store.set(IS_AUTH_KEY, false);
      store.remove(ROLE);
      store.remove(ROLE_ID);
      return {
        ...state,
        userId: null,
        userName: null,
        userEmail: null,
        profile: null,
        isLoggedIn: false,
        token: null,
        role: null,
        roleId: null,
      };
    case "SHOW_MESSAGE_EXPIRED_SESSION":
      return {
        ...state,
        notificationMessage: "La sesión ha expirado, por favor iniciar sesión nuevamente",
      };
    default:
      return state;
  }
};
