import { createSlice } from "@reduxjs/toolkit";
import {
  register as registerApi,
  login as loginApi,
  getMe as getMeApi,
  updateProfile as updateProfileApi,
  updatePassword as updatePasswordApi,
  getAllProfiles as getAllProfilesApi,
} from "../../WebAPI/userAPI";
import { setAuthToken } from "../../utils";
import {
  setErrorMessage,
  setShowSuccessNotification,
  setShowWarningNotification,
} from "./notificationReducer";

const initialState = {
  user: null,
  users: null,
  isLoading: false,
  position: null,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
  },
});

export const { setUser, setUsers, setIsLoading, setPosition } =
  userReducer.actions;

export const register =
  ({ avatar, nickname, username, password, email, phone }) =>
  (dispatch) => {
    dispatch(setIsLoading(true));
    return registerApi({
      avatar,
      nickname,
      username,
      password,
      email,
      phone,
    }).then((res) => {
      dispatch(setIsLoading(false));
      if (!res.ok) {
        setAuthToken("");
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      setAuthToken(res.token);
      dispatch(setShowSuccessNotification(true, "註冊、登入成功！"));
      return getMeApi().then((res) => {
        if (!res.ok) {
          setAuthToken("");
          dispatch(setErrorMessage(res.message));
          dispatch(setShowWarningNotification(true));
          return;
        }
        dispatch(setUser(res.data));
        return res.data;
      });
    });
  };

export const login = (username, password) => (dispatch) => {
  dispatch(setIsLoading(true));
  return loginApi(username, password).then((res) => {
    dispatch(setIsLoading(false));
    if (!res.ok) {
      setAuthToken("");
      dispatch(setErrorMessage(res.message));
      dispatch(setShowWarningNotification(true));
      return;
    }
    setAuthToken(res.token);
    dispatch(setShowSuccessNotification(true, "登入成功！"));
    return getMeApi().then((res) => {
      if (!res.ok) {
        setAuthToken("");
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setUser(res.data));
      return res.data;
    });
  });
};

export const getMe = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return getMeApi().then((res) => {
    if (!res.ok) {
      dispatch(setErrorMessage(res.message));
      return;
    }
    dispatch(setIsLoading(false));
    dispatch(setUser(res.data));
  });
};

export const updateProfile =
  ({ avatar, nickname, email, phone, isDeleteAvatar }) =>
  (dispatch) => {
    dispatch(setIsLoading(true));
    return updateProfileApi({
      avatar,
      nickname,
      email,
      phone,
      isDeleteAvatar,
    }).then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setShowSuccessNotification(true));
      getMeApi().then((res) => {
        if (!res.ok) {
          dispatch(setErrorMessage(res.message));
          dispatch(setShowWarningNotification(true));
          return;
        }
        dispatch(setIsLoading(false));
        dispatch(setUser(res.data));
        return res;
      });
    });
  };

export const updatePassword =
  (oldPassword, newPassword, confirmPassword) => (dispatch) => {
    return updatePasswordApi(oldPassword, newPassword, confirmPassword).then(
      (res) => {
        if (!res.ok) {
          dispatch(setErrorMessage(res.message));
          dispatch(setShowWarningNotification(true));
          return res;
        }
        dispatch(setShowSuccessNotification(true));
        return res;
      }
    );
  };

export const getAllProfiles =
  ({ page, limit, sort, order, role }) =>
  (dispatch) => {
    return getAllProfilesApi({ page, limit, sort, order, role }).then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setUsers(res.data));
    });
  };

export const setCurrentPosition = (latlng) => (dispatch) => {
  dispatch(setPosition(latlng));
};

export default userReducer.reducer;
