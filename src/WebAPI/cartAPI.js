import BASE_URL from "../constants/apiurl";
import { getAuthToken } from "../utils";

export const getCartData = ({ cart }) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/cart`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      cart,
    }),
  }).then((res) => res.json());
};
