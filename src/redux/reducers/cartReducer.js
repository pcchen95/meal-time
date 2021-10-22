import { createSlice } from "@reduxjs/toolkit"
import { getCartData as getCartDataApi } from "../../WebAPI/cartAPI"
import { setErrorMessage } from "./notificationReducer"

const initialState = {
  cart: null,
}

export const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload
    },
  },
})

export const { setCart } = cartReducer.actions

export const getCartData = (userId) => (dispatch) => {
  const cart = localStorage.getItem(`cartId${userId}`)
  let cartArray
  if (cart) {
    cartArray = JSON.parse(cart)
  }
  return getCartDataApi({ cart: cartArray })
    .then((res) => {
      if (!res.ok) {
        return dispatch(setErrorMessage(res ? res.message : "something wrong"))
      }
      return res.data
    })
    .then((cartData) => {
      return dispatch(setCart(cartData))
    })
    .catch((err) => {
      console.log(err)
    })
}

export const cleanCartData = () => (dispatch) => {
  dispatch(setCart(null))
}

export default cartReducer.reducer
