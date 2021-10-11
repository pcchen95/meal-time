import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import vendorReducer from './reducers/vendorReducer'
import notificationReducer from './reducers/notificationReducer'
import productReducer from './reducers/productReducer'

export default configureStore({
  reducer: {
    users: userReducer,
    vendors: vendorReducer,
    notifications: notificationReducer,
    products: productReducer,
  },
})
