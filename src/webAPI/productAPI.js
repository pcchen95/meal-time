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

const getProducts = (queryParameters) => {
  const queryString = getQueryString(queryParameters);
  return fetch(`${BASE_URL}/products?${queryString}`).then((res) => res.json());
};

const getProductsByCategory = (id, queryParameters) => {
  const queryString = getQueryString(queryParameters);
  return fetch(`${BASE_URL}/products/category/${id}?${queryString}`).then(
    (res) => res.json()
  );
};

const getProductsByVendor = (id, queryParameters) => {
  const queryString = getQueryString(queryParameters);
  return fetch(`${BASE_URL}/products/vendor/${id}?${queryString}`).then((res) =>
    res.json()
  );
};

const searchProduct = (keyword, queryParameters) => {
  const queryString = getQueryString(queryParameters);
  return fetch(
    `${BASE_URL}/products/search?_keyword=${keyword}${queryString}`
  ).then((res) => res.json());
};

const getProduct = (id) => {
  return fetch(`${BASE_URL}/products/${id}`).then((res) => res.json());
};

const postProduct = (data) => {
  const {
    name,
    categoryId,
    price,
    quantity,
    manufactureDate,
    expiryDate,
    description,
    isAvailable,
    picture,
  } = data;
  const token = getAuthToken();
  const formData = new FormData();
  formData.append("name", name);
  formData.append("categoryId", categoryId);
  formData.append("price", price);
  formData.append("quantity", quantity);
  formData.append("manufactureDate", manufactureDate);
  formData.append("expiryDate", expiryDate);
  formData.append("description", description);
  formData.append("isAvailable", isAvailable);
  formData.append("picture", picture);
  return fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "content-type": "multipart/form-data",
      authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then((res) => res.json());
};

const updateProduct = (id, updatedData) => {
  const {
    name,
    categoryId,
    price,
    quantity,
    manufactureDate,
    expiryDate,
    description,
    isAvailable,
    picture,
  } = updatedData;
  const token = getAuthToken();
  const formData = new FormData();
  formData.append("name", name);
  formData.append("categoryId", categoryId);
  formData.append("price", price);
  formData.append("quantity", quantity);
  formData.append("manufactureDate", manufactureDate);
  formData.append("expiryDate", expiryDate);
  formData.append("description", description);
  formData.append("isAvailable", isAvailable);
  formData.append("picture", picture);
  return fetch(`${BASE_URL}/products/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "multipart/form-data",
      authorization: `Bearer ${token}`,
    },
    body: formData,
  }).then((res) => res.json());
};

const deleteProduct = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

const getProductCategories = () => {
  return fetch(`${BASE_URL}/product-categories`).then((res) => res.json());
};

const addProductCategory = (name) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/product-categories`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  }).then((res) => res.json());
};

const updateProductCategory = (id, name) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/product-categories/${id}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  }).then((res) => res.json());
};

const deleteProductCategory = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/product-categories/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export {
  getProducts,
  getProductsByCategory,
  getProductsByVendor,
  searchProduct,
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
  getProductCategories,
  addProductCategory,
  updateProductCategory,
  deleteProductCategory,
};
