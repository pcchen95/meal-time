import { createSlice } from "@reduxjs/toolkit";
import { getCartData as getCartDataApi } from "../../WebAPI/cartAPI";
import { postOrder } from "../../WebAPI/orderAPI";
import { getMe as getMeApi } from "../../WebAPI/userAPI";
import {
  setErrorMessage,
  setShowSuccessNotification,
  setShowWarningNotification,
} from "./notificationReducer";

const initialState = {
  cart: null,
  cartData: null,
  userId: null,
  isShow: false,
  vendorId: null,
  orderProducts: [],
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
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setIsShow: (state, action) => {
      state.isShow = action.payload;
    },
    setVendorId: (state, action) => {
      state.vendorId = action.payload;
    },
    setOrderProducts: (state, action) => {
      state.orderProducts = action.payload;
    },
  },
});

export const {
  setCart,
  setCartData,
  setUserId,
  setVendorId,
  setIsShow,
  setOrderProducts,
} = cartReducer.actions;

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

export const getMe = () => (dispatch) => {
  return getMeApi().then((res) => {
    if (!res.ok) {
      dispatch(setErrorMessage(res.message));
      return;
    }
    dispatch(setUserId(res.data.id));
  });
};

export const newOrder =
  ({ orderProducts, vendorId, pickupTime, remarks, userId, cartData }) =>
  (dispatch) => {
    postOrder({
      orderProducts,
      vendorId,
      pickupTime,
      remarks,
    }).then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      let newData = [].concat(
        JSON.parse(cartData).filter((obj1) =>
          orderProducts.every((obj2) => obj1.id !== obj2.id)
        ),
        orderProducts.filter((obj2) =>
          JSON.parse(cartData).every((obj1) => obj2.id !== obj1.id)
        )
      );
      localStorage.setItem(`cartId${userId}`, JSON.stringify(newData));
      dispatch(setCartData(JSON.stringify(newData)));
      dispatch(setShowSuccessNotification(true, "訂單已成立"));
      return res;
    });
  };

export const cleanCartData = () => (dispatch) => {
  dispatch(setCart(null));
};

export const selectCart = (state) => state.cart.cart;
export const selectCartData = (state) => state.cart.cartData;
export const selectIsShow = (state) => state.cart.isShow;
export const selectVendorId = (state) => state.cart.vendorId;
export const selectUserId = (state) => state.cart.userId;
export const selectOrderProducts = (state) => state.cart.orderProducts;

export default cartReducer.reducer;
