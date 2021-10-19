import { createSlice } from "@reduxjs/toolkit"
import {
  getProducts as getProductsApi,
  getProduct as getProductApi,
  getProductsByVendor as getProductsByVendorApi,
  getProductsByCategory as getProductsByCategoryApi,
  getProductCategories as getProductCategoriesApi,
  searchProduct as searchProductApi,
  postProduct as postProductApi,
  updateProduct as updateProductApi,
} from "../../WebAPI/productAPI"
import {
  setErrorMessage,
  setShowSuccessNotification,
  setShowWarningNotification,
} from "./notificationReducer"
const initialState = {
  page: 1,
  sort: "id",
  products: null,
  product: null,
  vendorProducts: null,
  categoryProducts: null,
  searchedProducts: null,
  productCategories: null,
  errorMessage: null,
  isLoading: false,
}

export const productReducer = createSlice({
  name: "product",
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
    setSearchedProduct: (state, action) => {
      state.searchedProducts = action.payload
    },
    setProductCategories: (state, action) => {
      state.productCategories = action.payload
    },
    setErrMessage: (state, action) => {
      state.errorMessage = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
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
  setSearchedProduct,
  setProductCategories,
  setIsLoading,
} = productReducer.actions

export const getProducts = (queryParameters) => (dispatch) => {
  dispatch(setIsLoading(true))
  return getProductsApi(queryParameters)
    .then((res) => {
      if (!res.ok) {
        return dispatch(setErrMessage(res ? res.message : "something wrong"))
      }
      return res.data
    })
    .then((products) => {
      dispatch(setIsLoading(false))
      dispatch(setProducts(products.rows))
    })
    .catch((err) => {
      console.log(err)
    })
}
export const cleanProducts = () => (dispatch) => {
  dispatch(setProducts(null))
}

export const getProduct = (id) => (dispatch) => {
  dispatch(setIsLoading(true))

  return getProductApi(id)
    .then((res) => {
      if (!res.ok) {
        return dispatch(setErrMessage(res ? res.message : "something wrong"))
      }
      return res.data
    })
    .then((product) => {
      dispatch(setIsLoading(false))

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
  dispatch(setIsLoading(true))

  return getProductsByVendorApi(id, queryParameters)
    .then((res) => {
      if (!res.ok) {
        return dispatch(setErrMessage(res ? res.message : "something wrong"))
      }
      return res.data
    })
    .then((products) => {
      dispatch(setIsLoading(false))

      dispatch(setVendorProduct(products.rows))
    })
    .catch((err) => {
      console.log(err)
    })
}
export const cleanVendorProducts = () => (dispatch) => {
  dispatch(setVendorProduct(null))
}

export const getCategoryProducts = (id, queryParameters) => (dispatch) => {
  dispatch(setIsLoading(true))

  return getProductsByCategoryApi(id, queryParameters)
    .then((res) => {
      if (!res.ok) {
        return dispatch(setErrMessage(res ? res.message : "something wrong"))
      }
      return res.data
    })
    .then((products) => {
      dispatch(setIsLoading(false))

      dispatch(setCategoryProduct(products.rows))
    })
    .catch((err) => {
      console.log(err)
    })
}
export const cleanCategoryProducts = () => (dispatch) => {
  dispatch(setCategoryProduct(null))
}

export const searchProducts = (keyword, queryParameters) => (dispatch) => {
  return searchProductApi(keyword, queryParameters)
    .then((res) => {
      if (!res.ok) {
        return dispatch(setErrMessage(res ? res.message : "something wrong"))
      }
      return res.data
    })
    .then((products) => {
      dispatch(setSearchedProduct(products))
    })
    .catch((err) => console.log(err))
}

export const getProductCategories = () => (dispatch) => {
  return getProductCategoriesApi()
    .then((res) => {
      if (!res.ok) {
        return dispatch(setErrMessage(res ? res.message : "something wrong"))
      }
      return res.data
    })
    .then((categories) => {
      dispatch(setProductCategories(categories))
    })
    .catch((err) => {
      console.log(err)
    })
}

export const cleanProductCategories = () => (dispatch) => {
  dispatch(setProductCategories(null))
}

export const postProduct =
  ({
    picture,
    name,
    price,
    quantity,
    categoryId,
    manufactureDate,
    expiryDate,
    description,
    isAvailable,
    // isDeletePicture,
  }) =>
  (dispatch) => {
    dispatch(setIsLoading(true))
    return postProductApi({
      picture,
      name,
      price,
      quantity,
      categoryId,
      manufactureDate,
      expiryDate,
      description,
      isAvailable,
      // isDeletePicture,
    }).then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message))
        dispatch(setShowWarningNotification(true))
        return
      }
      dispatch(setShowSuccessNotification(true, "新增成功！"))
      return res.data
    })
  }

export const patchProduct =
  (
    id,
    {
      picture,
      name,
      price,
      quantity,
      categoryId,
      manufactureDate,
      expiryDate,
      description,
      isAvailable,
      // isDeletePicture,
    }
  ) =>
  (dispatch) => {
    dispatch(setIsLoading(true))
    return updateProductApi(id, {
      picture,
      name,
      price,
      quantity,
      categoryId,
      manufactureDate,
      expiryDate,
      description,
      isAvailable,
      // isDeletePicture,
    }).then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message))
        dispatch(setShowWarningNotification(true))
        return
      }
      dispatch(setShowSuccessNotification(true, "更新成功！"))
      return res.data
    })
  }

export default productReducer.reducer
