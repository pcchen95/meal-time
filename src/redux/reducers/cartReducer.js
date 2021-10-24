import { createSlice } from "@reduxjs/toolkit";
import { getCartData as getCartDataApi } from "../../WebAPI/cartAPI";
import { getMe as getMeApi } from "../../WebAPI/userAPI";

import { setErrorMessage } from "./notificationReducer";

const initialState = {
  cart: null,
  cartData: null,
  isShow: false,
  isSelect: null,
  isLoading: false,
  vendorById: null,
  userId: null,
};

export const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setCartData: (state, action) => {
      state.cartData = action.payload;
    },
    setIsShow: (state, action) => {
      state.isShow = action.payload;
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
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const {
  setCart,
  setCartData,
  setIsSelect,
  setIsShow,
  setIsLoading,
  setVendorById,
  setUserId,
} = cartReducer.actions;

export const getMe = () => (dispatch) => {
  return getMeApi().then((res) => {
    if (!res.ok) {
      dispatch(setErrorMessage(res.message));
      return;
    }
    dispatch(setUserId(res.data.id));
  });
};

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
export const selectCartData = (state) => state.cart.cartData;
export const selectIsShow = (state) => state.cart.isShow;
export const selectIsLoading = (state) => state.cart.isLoading;
export const selectVendorById = (state) => state.cart.vendorById;
export const selectIsSelect = (state) => state.cart.isSelect;
export const selectUserId = (state) => state.cart.userId;

export default cartReducer.reducer;
