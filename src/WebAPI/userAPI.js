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

export const getMe = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/users/profile/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const updateProfile = ({ avatar, nickname, email, phone }) => {
  const formData = new FormData();
  formData.append('avatar', avatar);
  formData.append('nickname', nickname);
  formData.append('email', email);
  formData.append('phone', phone);
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

export const getAllProfiles = ({ page, limit, sort, order, role }) => {
  const token = getAuthToken();
  let queryString = '?';
  if (page) queryString += `_page=${page}&`;
  if (limit) queryString += `_limit=${limit}&`;
  if (sort) queryString += `_sort=${sort}&`;
  if (order) queryString += `_order=${order}&`;
  if (role) queryString += `role=${role}`;
  return fetch(`${BASE_URL}/users/profile${queryString}`, {
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
