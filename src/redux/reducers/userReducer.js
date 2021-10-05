import { createSlice } from '@reduxjs/toolkit';
import {
  register as registerApi,
  login as loginApi,
  getMe as getMeApi,
  updateProfile as updateProfileApi,
  updatePassword as updatePasswordApi,
} from '../../WebAPI/userAPI';
import { setAuthToken } from '../../utils';

const initialState = {
  errMessage: null,
  user: null,
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setErrMessage: (state, action) => {
      state.errMessage = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, setErrMessage } = userReducer.actions;

export const register =
  ({ avatar, nickname, username, password, email, phone }) =>
  (dispatch) => {
    return registerApi({
      avatar,
      nickname,
      username,
      password,
      email,
      phone,
    }).then((res) => {
      if (!res.ok) {
        setAuthToken(null);
        return dispatch(setErrMessage(res.message));
      }
      setAuthToken(res.token);

      return getMeApi().then((res) => {
        if (!res.ok) {
          setAuthToken(null);
          return dispatch(setErrMessage(res.message));
        }
        dispatch(setUser(res.data));
        return res.data;
      });
    });
  };

export const login = (username, password) => (dispatch) => {
  return loginApi(username, password).then((res) => {
    if (!res.ok) {
      setAuthToken(null);
      return dispatch(setErrMessage(res.message));
    }
    setAuthToken(res.token);

    return getMeApi().then((res) => {
      if (!res.ok) {
        setAuthToken(null);
        return dispatch(setErrMessage(res.message));
      }
      dispatch(setUser(res.data));
      return res.data;
    });
  });
};

export const getMe = () => (dispatch) => {
  return getMeApi().then((res) => {
    if (!res.ok) {
      return dispatch(setErrMessage(res.message));
    }
    dispatch(setUser(res.data));
  });
};

export const updateProfile =
  ({ avatar, nickname, username, password, email, phone }) =>
  (dispatch) => {
    return updateProfileApi({
      avatar,
      nickname,
      username,
      password,
      email,
      phone,
    }).then((res) => {
      if (!res.ok) {
        dispatch(setErrMessage(res.message));
      }
    });
  };

export const updatePassword =
  (oldPassword, newPassword, confirmPassword) => (dispatch) => {
    return updatePasswordApi(oldPassword, newPassword, confirmPassword).then(
      (res) => {
        if (!res.ok) {
          dispatch(setErrMessage(res.message));
        }
      }
    );
  };

export default userReducer.reducer;
