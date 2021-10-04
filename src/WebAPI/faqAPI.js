import BASE_URL from '../constants/apiurl';
import { getAuthToken } from '../utils';

export const getFaq = (id) => {
  return fetch(`${BASE_URL}/faqs`).then((res) => res.json());
};

export const getFaqById = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/faqs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const addFaq = ({ question, categoryId, answer }) => {
  return fetch(`${BASE_URL}/faqs`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ question, categoryId, answer }),
  }).then((res) => res.json());
};

export const updateFaq = ({ id, question, categoryId, answer }) => {
  return fetch(`${BASE_URL}/faqs/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ question, categoryId, answer }),
  }).then((res) => res.json());
};

export const deleteFaq = (id) => {
  return fetch(`${BASE_URL}/faqs/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  }).then((res) => res.json());
};

export const getFaqCategory = (id) => {
  return fetch(`${BASE_URL}/faq-categories`).then((res) => res.json());
};

export const getFaqCategoryById = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/faq-categories/profile/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const addFaqCategory = (name) => {
  return fetch(`${BASE_URL}/faq-categories`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ name }),
  }).then((res) => res.json());
};

export const updateFaqCategory = (id, name) => {
  return fetch(`${BASE_URL}/faq-categories/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ name }),
  }).then((res) => res.json());
};

export const deleteFaqCategory = (id) => {
  return fetch(`${BASE_URL}/faq-categories/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  }).then((res) => res.json());
};
