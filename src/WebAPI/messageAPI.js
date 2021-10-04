import BASE_URL from '../constants/apiurl';
import { getAuthToken } from '../utils';

export const getUserMessages = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/messages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const getUserMessagesById = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/messages/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const getVendorMessages = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/messages/vendor`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const getVendorMessagesById = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/messages/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const sendMessageToVendor = (id, content) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/messages/${id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  }).then((res) => res.json());
};

export const sendMessageToClient = (id, content) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/messages/vendor/${id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
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
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  }).then((res) => res.json());
};

export const getAllAdminMessages = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/messages-to-admin/admin`, {
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
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
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
    method: 'POST',
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

export const getAllReportMessages = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/report-messages/admin`, {
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
