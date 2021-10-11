import { createSlice } from '@reduxjs/toolkit'
import {
  getProducts as getProductsApi,
  getProduct as getProductApi,
  getProductsByVendor as getProductsByVendorApi,
  getProductsByCategory as getProductsByCategoryApi,
} from '../../WebAPI/productAPI'

const initialState = {
  page: 1,
  sort: 'id',
  products: null,
  product: null,
  vendorProducts: null,
  categoryProducts: null,
  errorMessage: null,
}

export const productReducer = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    setProducts: (state, action) => {
      state.products = action.payload
    },
    setProduct: (state, action) => {
      state.product = action.payload
    },
    setVendorProduct: (state, action) => {
      state.vendorProducts = action.payload
    },
    setCategoryProduct: (state, action) => {
      state.categoryProducts = action.payload
    },
    setErrMessage: (state, action) => {
      state.errorMessage = action.payload
    },
  },
})

export const {
  setSort,
  setPage,
  setProducts,
  setProduct,
  setErrMessage,
  setVendorProduct,
  setCategoryProduct,
} = productReducer.actions

export const getProducts = (queryParameters) => (dispatch) => {
  return getProductsApi(queryParameters)
    .then((res) => {
      if (!res.ok) {
        return dispatch(setErrMessage(res ? res.message : 'something wrong'))
      }
      return res.data
    })
    .then((products) => {
      dispatch(setProducts(products))
    })
    .catch((err) => {
      console.log(err)
    })
}
export const cleanProducts = () => (dispatch) => {
  dispatch(setProducts(null))
}

export const getProduct = (id) => (dispatch) => {
  return getProductApi(id)
    .then((res) => {
      if (!res.ok) {
        return dispatch(setErrMessage(res ? res.message : 'something wrong'))
      }
      return res.data
    })
    .then((product) => {
      dispatch(setProduct(product))
    })
    .catch((err) => {
      console.log(err)
    })
}

export const cleanProduct = () => (dispatch) => {
  dispatch(setProduct(null))
}

export const getVendorProducts = (id, queryParameters) => (dispatch) => {
  return getProductsByVendorApi(id, queryParameters)
    .then((res) => {
      if (!res.ok) {
        return dispatch(setErrMessage(res ? res.message : 'something wrong'))
      }
      return res.data
    })
    .then((products) => {
      dispatch(setVendorProduct(products))
    })
    .catch((err) => {
      console.log(err)
    })
}
export const cleanVendorProducts = () => (dispatch) => {
  dispatch(setVendorProduct(null))
}

export const getCategoryProducts = (id, queryParameters) => (dispatch) => {
  return getProductsByCategoryApi(id, queryParameters)
    .then((res) => {
      if (!res.ok) {
        return dispatch(setErrMessage(res ? res.message : 'something wrong'))
      }
      return res.data
    })
    .then((products) => {
      dispatch(setCategoryProduct(products))
    })
    .catch((err) => {
      console.log(err)
    })
}
export const cleanCategoryProducts = () => (dispatch) => {
  dispatch(setCategoryProduct(null))
}

export default productReducer.reducer
