import { createSlice } from "@reduxjs/toolkit";
import { getCartData as getCartDataApi } from "../../WebAPI/cartAPI";
import { setErrorMessage } from "./notificationReducer";

const initialState = {
  cart: null,
  isSelect: null,
  isLoading: false,
  vendorById: null,
};

export const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setIsSelect: (state, action) => {
      state.isSelect = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setVendorById: (state, action) => {
      state.vendorById = action.payload;
    },
  },
});

export const { setCart, setIsSelect, setIsLoading, setVendorById } =
  cartReducer.actions;

export const getCartData = (userId) => (dispatch) => {
  const cart = localStorage.getItem(`cartId${userId}`);
  let cartArray;
  if (cart) {
    cartArray = JSON.parse(cart);
  }
  return getCartDataApi({ cart: cartArray })
    .then((res) => {
      if (!res.ok) {
        return dispatch(setErrorMessage(res ? res.message : "something wrong"));
      }
      return res.data;
    })
    .then((cartData) => {
      return dispatch(setCart(cartData));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const cleanCartData = () => (dispatch) => {
  dispatch(setCart(null));
};

export const selectCart = (state) => state.cart.cart;
export const selectIsSelect = (state) => state.cart.isSelect;
export const selectIsLoading = (state) => state.cart.isLoading;
export const selectVendorById = (state) => state.cart.vendorById;

export default cartReducer.reducer;
