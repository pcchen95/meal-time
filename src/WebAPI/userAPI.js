import BASE_URL from '../constants/apiurl';
import { getAuthToken } from '../utils';

export const register = ({
  avatar,
  nickname,
  username,
  password,
  email,
  phone,
}) => {
  const formData = new FormData();
  formData.append('avatar', avatar);
  formData.append('nickname', nickname);
  formData.append('username', username);
  formData.append('email', email);
  formData.append('phone', phone);
  formData.append('password', password);
  return fetch(`${BASE_URL}/users/register`, {
    method: 'POST',
    body: formData,
  }).then((res) => res.json());
};

export const login = (username, password) => {
  return fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const getProfile = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/users/profile/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const updateProfile = ({
  avatar,
  nickname,
  username,
  password,
  email,
  phone,
}) => {
  const formData = new FormData();
  formData.append('avatar', avatar);
  formData.append('nickname', nickname);
  formData.append('username', username);
  formData.append('email', email);
  formData.append('phone', phone);
  formData.append('password', password);
  const token = getAuthToken();
  return fetch(`${BASE_URL}/users/profile/me`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then((res) => res.json());
};

export const updatePassword = (oldPassword, newPassword, confirmPassword) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/users/password`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      oldPassword,
      newPassword,
      confirmPassword,
    }),
  }).then((res) => res.json());
};

export const getProfileById = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/users/profile/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const updateProfileById = (
  id,
  avatar,
  nickname,
  username,
  password,
  email,
  phone
) => {
  const formData = new FormData();
  formData.append('avatar', avatar);
  formData.append('nickname', nickname);
  formData.append('username', username);
  formData.append('email', email);
  formData.append('phone', phone);
  formData.append('password', password);
  const token = getAuthToken();
  return fetch(`${BASE_URL}/users/profile/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then((res) => res.json());
};

export const getAllProfiles = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const updateUserAuth = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/users/auth/${id}`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
