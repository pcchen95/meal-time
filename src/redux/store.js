import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./reducers/userReducer"
import orderReducer from "./reducers/orderReducer"
import vendorReducer from "./reducers/vendorReducer"
import notificationReducer from "./reducers/notificationReducer"
import cartReducer from "./reducers/cartReducer"
import productReducer from "./reducers/productReducer"

export default configureStore({
  reducer: {
    users: userReducer,
    orders: orderReducer,
    vendors: vendorReducer,
    notifications: notificationReducer,
    cart: cartReducer,
    products: productReducer,
  },
})
