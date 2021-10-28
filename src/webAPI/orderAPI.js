import BASE_URL from "../constants/apiurl";
import { getAuthToken } from "../utils";

const getQueryString = (queryParameters) => {
  const { page, sort, order, limit } = queryParameters;
  let queryString = "";
  if (page) queryString += `&page=${page}`;
  if (sort) queryString += `&sort=${sort}`;
  if (order) queryString += `&order=${order}`;
  if (limit) queryString += `&limit=${limit}`;
  return queryString;
};

const getOrders = (queryParameters) => {
  const token = getAuthToken();
  const queryString = getQueryString(queryParameters);
  return fetch(`${BASE_URL}/orders?${queryString}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

const getOrdersBought = (id, queryParameters) => {
  const token = getAuthToken();
  const queryString = getQueryString(queryParameters);
  let { clientId } = queryParameters;
  let getByClientId = "";
  if (clientId) getByClientId = `&clientId=${clientId}`;
  return fetch(`${BASE_URL}/orders/buy/${id}?${queryString}${getByClientId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

const getOrdersSold = (id, queryParameters) => {
  const token = getAuthToken();
  const queryString = getQueryString(queryParameters);
  let { vendorId } = queryParameters;
  let getByVendorId = "";
  if (vendorId) getByVendorId = `&vendorId=${vendorId}`;
  return fetch(`${BASE_URL}/orders/sell/${id}?${queryString}${getByVendorId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

const getOrder = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/orders/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

const postOrder = ({ orderProducts, vendorId, pickupTime, remarks }) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      orderProducts,
      vendorId,
      pickupTime,
      remarks,
    }),
  }).then((res) => res.json());
};

const completeOrder = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/orders/complete/${id}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

const cancelOrder = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/orders/cancel/${id}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

const deleteOrder = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/orders/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export {
  getOrders,
  getOrdersBought,
  getOrdersSold,
  getOrder,
  postOrder,
  completeOrder,
  cancelOrder,
  deleteOrder,
};
