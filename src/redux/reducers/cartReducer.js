import { createSlice } from "@reduxjs/toolkit";
import { getProduct as getProductApi } from "../../WebAPI/productAPI";
import { setErrorMessage } from "./notificationReducer";

const initialState = {
  cart: null,
  cartData: null,
  isChecked: false,
  isShow: false,
  isSelect: null,
  isLoading: false,
  vendorId: null,
  productId: null,
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
    setIsChecked: (state, action) => {
      state.isChecked = action.payload;
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
    setVendorId: (state) => {
      state.vendorId = localStorage.getItem("vendorId");
    },
    setProductId: (state) => {
      state.productId = localStorage.getItem("productId");
    },
  },
});

export const {
  setCart,
  setCartData,
  setIsChecked,
  setIsShow,
  setIsSelect,
  setIsLoading,
  setVendorId,
  setProductId,
} = cartReducer.actions;

export const getCartFromLocalStorage = (userId) => (dispatch) => {
  const cartArray = JSON.parse(localStorage.getItem(`cartId${userId}`));
  if (cartArray) dispatch(setCart(cartArray));
};

export const cleanCart = () => (dispatch) => {
  dispatch(setCart(null));
};

export const getCartData = (userId) => (dispatch) => {
  const cartArray = JSON.parse(localStorage.getItem(`cartId${userId}`));
  const newCartData = [];

  try {
    cartArray.forEach((cartByVendor) =>
      cartByVendor.cartItems.forEach(async (product) => {
        const res = await getProductApi(product.productId);
        if (!res.ok) {
          return dispatch(
            setErrorMessage(res ? res.message : "something wrong")
          );
        }
        let productData = res.data;
        productData = { ...productData, cartQuantity: product.quantity };
        newCartData.push(productData);
        // dispatch(setCartData(newCartData))
        console.log(newCartData);
      })
    );
  } catch (err) {
    console.log(err);
  }
  return newCartData;
};

export const selectIsChecked = (state) => state.cart.isChecked;
export const selectIsShow = (state) => state.cart.isShow;
export const selectIsSelect = (state) => state.cart.isSelect;
export const selectIsLoading = (state) => state.cart.isLoading;
export const selectVendorId = (state) => state.cart.vendorId;
export const selectProductId = (state) => state.cart.productId;

export default cartReducer.reducer;
