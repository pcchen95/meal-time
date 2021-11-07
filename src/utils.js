import Geocode from "react-geocode";
const TOKEN_NAME = "token";

export const setAuthToken = (token) => {
  return localStorage.setItem(TOKEN_NAME, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_NAME);
};

export const AddressToLatLng = (address) => {
  return Geocode.fromAddress(address).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      return { lat, lng };
    },
    (error) => {
      return error;
    }
  );
};

export const toLocaleDateString = (time) => {
  const pad = (n) => (n < 10 ? "0" + n : n);
  return (
    pad(new Date(time).getFullYear()) +
    "-" +
    pad(new Date(time).getUTCMonth() + 1) +
    "-" +
    pad(new Date(time).getUTCDate())
  );
};
