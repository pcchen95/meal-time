import BASE_URL from '../constants/apiurl';
import { getAuthToken } from '../utils';

export const register = ({
  vendorName,
  address,
  phone,
  categoryId,
  description,
  openingHour,
  avatar,
  banner,
}) => {
  const formData = new FormData();
  formData.append('vendorName', vendorName);
  formData.append('address', address);
  formData.append('phone', phone);
  formData.append('categoryId', categoryId);
  formData.append('description', description);
  formData.append('openingHour', openingHour);
  formData.append('avatar', avatar);
  formData.append('banner', banner);
  return fetch(`${BASE_URL}/vendors/register`, {
    method: 'POST',
    body: formData,
  }).then((res) => res.json());
};

export const getVendorProfile = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/vendors/profile/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const updateVendorProfile = ({
  vendorName,
  address,
  phone,
  categoryId,
  description,
  openingHour,
  avatar,
  banner,
}) => {
  const formData = new FormData();
  formData.append('vendorName', vendorName);
  formData.append('address', address);
  formData.append('phone', phone);
  formData.append('categoryId', categoryId);
  formData.append('description', description);
  formData.append('openingHour', openingHour);
  formData.append('avatar', avatar);
  formData.append('banner', banner);
  const token = getAuthToken();
  return fetch(`${BASE_URL}/vendors/profile/me`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then((res) => res.json());
};

export const getAvailVendorProfileById = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/vendors/profile/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const getVendorProfileById = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/vendors/admin/profile/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const getAvailableVendorProfiles = ({
  page,
  limit,
  sort,
  order,
  categoryId,
}) => {
  const token = getAuthToken();
  let queryString = '?';
  if (page) queryString += `_page=${page}&`;
  if (limit) queryString += `_limit=${limit}&`;
  if (sort) queryString += `_sort=${sort}&`;
  if (order) queryString += `_order=${order}&`;
  if (categoryId) queryString += `categoryId=${categoryId}`;
  return fetch(`${BASE_URL}/vendors/profile${queryString}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const getAllVendorProfiles = ({
  page,
  limit,
  sort,
  order,
  categoryId,
  isOpen,
  isSuspended,
}) => {
  const token = getAuthToken();
  let queryString = '?';
  if (page) queryString += `_page=${page}&`;
  if (limit) queryString += `_limit=${limit}&`;
  if (sort) queryString += `_sort=${sort}&`;
  if (order) queryString += `_order=${order}&`;
  if (categoryId) queryString += `categoryId=${categoryId}&`;
  if (isOpen) queryString += `isOpen=${isOpen}&`;
  if (isSuspended) queryString += `isSuspended=${isSuspended}`;
  return fetch(`${BASE_URL}/vendors/admin/profile${queryString}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const updateVendorProfileById = ({
  id,
  vendorName,
  address,
  phone,
  categoryId,
  description,
  openingHour,
  avatar,
  banner,
}) => {
  const formData = new FormData();
  formData.append('vendorName', vendorName);
  formData.append('address', address);
  formData.append('phone', phone);
  formData.append('categoryId', categoryId);
  formData.append('description', description);
  formData.append('openingHour', openingHour);
  formData.append('avatar', avatar);
  formData.append('banner', banner);
  const token = getAuthToken();
  return fetch(`${BASE_URL}/vendors/profile/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then((res) => res.json());
};

export const updateIsOpen = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/vendors/set-open`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const updateVendorAuth = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/vendors/auth/${id}`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const getVendorCategories = ({ page, limit, sort, order }) => {
  let queryString = '?';
  if (page) queryString += `_page=${page}&`;
  if (limit) queryString += `_limit=${limit}&`;
  if (sort) queryString += `_sort=${sort}&`;
  if (order) queryString += `_order=${order}`;
  return fetch(`${BASE_URL}/vendor-categories${queryString}`).then((res) =>
    res.json()
  );
};

export const getVendorCategoryById = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/vendor-categories/profile/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const addVendorCategory = (name) => {
  return fetch(`${BASE_URL}/vendor-categories`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ name }),
  }).then((res) => res.json());
};

export const updateVendorCategory = (id, name) => {
  return fetch(`${BASE_URL}/vendor-categories/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ name }),
  }).then((res) => res.json());
};

export const deleteVendorCategory = (id) => {
  return fetch(`${BASE_URL}/vendor-categories/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  }).then((res) => res.json());
};
