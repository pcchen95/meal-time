import BASE_URL from "../constants/apiurl";
import { getAuthToken } from "../utils";

export const getUserMessages = (queryParameters) => {
  const token = getAuthToken();
  let queryString = "?";
  if (queryParameters) {
    const { page, limit, sort, order } = queryParameters;
    if (page) queryString += `_page=${page}&`;
    if (limit) queryString += `_limit=${limit}&`;
    if (sort) queryString += `_sort=${sort}&`;
    if (order) queryString += `_order=${order}`;
  }
  return fetch(`${BASE_URL}/messages/user${queryString}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const getUserMessagesById = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/messages/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const getVendorMessages = (queryParameters) => {
  const token = getAuthToken();
  let queryString = "?";
  if (queryParameters) {
    const { page, limit, sort, order } = queryParameters;
    if (page) queryString += `_page=${page}&`;
    if (limit) queryString += `_limit=${limit}&`;
    if (sort) queryString += `_sort=${sort}&`;
    if (order) queryString += `_order=${order}`;
  }
  return fetch(`${BASE_URL}/messages/vendor${queryString}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const getVendorMessagesById = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/messages/vendor/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const sendMessageToVendor = (id, content) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/messages/user/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ content }),
  }).then((res) => res.json());
};

export const sendMessageToClient = (id, content) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/messages/vendor/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ content }),
  }).then((res) => res.json());
};

export const getMessageToAdmin = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/messages-to-admin`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const sendMessageToAdmin = (content) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/messages-to-admin`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ content }),
  }).then((res) => res.json());
};

export const getAllAdminMessages = ({ page, limit, sort, order }) => {
  const token = getAuthToken();
  let queryString = "?";
  if (page) queryString += `_page=${page}&`;
  if (limit) queryString += `_limit=${limit}&`;
  if (sort) queryString += `_sort=${sort}&`;
  if (order) queryString += `_order=${order}`;
  return fetch(`${BASE_URL}/messages-to-admin/admin${queryString}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const getAdminMessageById = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/messages-to-admin/admin/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const sendMessageToUser = (id, content) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/messages-to-admin/admin/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ content }),
  }).then((res) => res.json());
};

export const sendReportMessage = ({
  reportedVendorId,
  reportedProductId,
  content,
}) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/report-messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      reportedVendorId,
      reportedProductId,
      content,
    }),
  }).then((res) => res.json());
};

export const getAllReportMessages = ({ page, limit, sort, order }) => {
  const token = getAuthToken();
  let queryString = "?";
  if (page) queryString += `_page=${page}&`;
  if (limit) queryString += `_limit=${limit}&`;
  if (sort) queryString += `_sort=${sort}&`;
  if (order) queryString += `_order=${order}`;
  return fetch(`${BASE_URL}/report-messages/admin${queryString}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const getReportMessageById = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/report-messages/admin/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
