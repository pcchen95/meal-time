import { createSlice } from "@reduxjs/toolkit"
import { getProduct as getProductApi } from "../../WebAPI/productAPI"
import { setErrorMessage } from "./notificationReducer"

const initialState = {
  cart: null,
  cartData: null,
}

export const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload
    },
    setCartData: (state, action) => {
      state.cartData = action.payload
    },
  },
})

export const { setCart, setCartData } = cartReducer.actions

export const getCartFromLocalStorage = (userId) => (dispatch) => {
  const cartArray = JSON.parse(localStorage.getItem(`cartId${userId}`))
  if (cartArray) dispatch(setCart(cartArray))
}

export const cleanCart = () => (dispatch) => {
  dispatch(setCart(null))
}

export const getCartData = (userId) => (dispatch) => {
  const cartArray = JSON.parse(localStorage.getItem(`cartId${userId}`))
  const newCartData = []

  try {
    cartArray.forEach((cartByVendor) =>
      cartByVendor.cartItems.forEach(async (product) => {
        const res = await getProductApi(product.productId)
        if (!res.ok) {
          return dispatch(
            setErrorMessage(res ? res.message : "something wrong")
          )
        }
        let productData = res.data
        productData = { ...productData, cartQuantity: product.quantity }
        newCartData.push(productData)
        // dispatch(setCartData(newCartData))
        console.log(newCartData)
      })
    )
  } catch (err) {
    console.log(err)
  }
  return newCartData
}

export default cartReducer.reducer
