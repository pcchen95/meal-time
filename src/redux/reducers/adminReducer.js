import { createSlice } from "@reduxjs/toolkit";
import {
  getMe as getMeApi,
  getProfileById as getProfileByIdAPI,
  updateProfileById as updateProfileByIdAPI,
  getAllProfiles as getAllProfilesAPI,
  updateUserAuth as updateUserAuthAPI,
} from "../../WebAPI/userAPI";
import {
  getVendorProfileById as getVendorProfileByIdAPI,
  getAllVendorProfiles as getAllVendorProfilesAPI,
  updateVendorProfileById as updateVendorProfileByIdAPI,
  updateVendorAuth as updateVendorAuthAPI,
  getVendorCategoryById as getVendorCategoryByIdAPI,
  addVendorCategory as addVendorCategoryAPI,
  updateVendorCategory as updateVendorCategoryAPI,
  deleteVendorCategory as deleteVendorCategoryAPI,
} from "../../WebAPI/vendorAPI";
import {
  getProducts as getProductsAPI,
  addProductCategory as addProductCategoryAPI,
  updateProductCategory as updateProductCategoryAPI,
  deleteProductCategory as deleteProductCategoryAPI,
} from "../../WebAPI/productAPI";
import {
  getOrders as getOrdersAPI,
  deleteOrder as deleteOrderAPI,
} from "../../WebAPI/orderAPI";
import {
  getMessageToAdmin as getMessageToAdminAPI,
  sendMessageToAdmin as sendMessageToAdminAPI,
  getAllAdminMessages as getAllAdminMessagesAPI,
  getAdminMessageById as getAdminMessageByIdAPI,
  getAllReportMessages as getAllReportMessagesAPI,
  getReportMessageById as getReportMessageByIdAPI,
} from "../../WebAPI/messageAPI";
import {
  setErrorMessage,
  setShowSuccessNotification,
  setShowWarningNotification,
} from "./notificationReducer";

const initialState = {
  user: [],
  users: [],
  message: {},
  messages: [],
  vendor: [],
  vendors: [],
  orders: [],
  products: [],
};

export const adminReducer = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setVendor: (state, action) => {
      state.vendor = action.payload;
    },
    setVendors: (state, action) => {
      state.vendors = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const {
  setUser,
  setUsers,
  setMessage,
  setMessages,
  setVendor,
  setVendors,
  setOrders,
  setProducts,
} = adminReducer.actions;

export const getMe = () => (dispatch) => {
  return getMeApi().then((res) => {
    if (!res.ok) {
      if (res.message === "non-login") {
        dispatch(setUser("non-login"));
        return;
      }
      dispatch(setErrorMessage(res.message));
      return;
    }
    dispatch(setUser(res.data));
  });
};

export const getAllProfiles =
  ({ page, limit, sort, order, role }) =>
  (dispatch) => {
    getAllProfilesAPI({ page, limit, sort, order, role }).then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setUsers(res.data));
    });
  };

export const getProfileById =
  ({ id }) =>
  (dispatch) => {
    getProfileByIdAPI({ id }).then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setUsers(res.data));
    });
  };

export const updateProfileById =
  ({ id, avatar, nickname, username, password, email, phone }) =>
  (dispatch) => {
    return updateProfileByIdAPI({
      id,
      avatar,
      nickname,
      username,
      password,
      email,
      phone,
    }).then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setShowSuccessNotification(true));
      getMeApi().then((res) => {
        if (!res.ok) {
          dispatch(setErrorMessage(res.message));
          dispatch(setShowWarningNotification(true));
          return;
        }
        dispatch(setUser(res.data));
        return res;
      });
    });
  };

export const updateUserAuth =
  ({ id }) =>
  (dispatch) => {
    return updateUserAuthAPI({
      id,
    }).then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setShowSuccessNotification(true));
      getMeApi().then((res) => {
        if (!res.ok) {
          dispatch(setErrorMessage(res.message));
          dispatch(setShowWarningNotification(true));
          return;
        }
        dispatch(setUser(res.data));
        return res;
      });
    });
  };

export const getVendorProfileById =
  ({ id }) =>
  (dispatch) => {
    getVendorProfileByIdAPI({ id }).then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setVendors(res.data));
    });
  };

export const getAllVendorProfiles =
  ({ page, limit, sort, order, categoryId, isOpen, isSuspended }) =>
  (dispatch) => {
    getAllVendorProfilesAPI({
      page,
      limit,
      sort,
      order,
      categoryId,
      isOpen,
      isSuspended,
    }).then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setVendors(res.data));
    });
  };

export const updateVendorProfileById =
  ({
    id,
    vendorName,
    address,
    phone,
    categoryId,
    description,
    openingHour,
    avatar,
    banner,
  }) =>
  (dispatch) => {
    return updateVendorProfileByIdAPI({
      id,
      vendorName,
      address,
      phone,
      categoryId,
      description,
      openingHour,
      avatar,
      banner,
    }).then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setShowSuccessNotification(true));
      getMeApi().then((res) => {
        if (!res.ok) {
          dispatch(setErrorMessage(res.message));
          dispatch(setShowWarningNotification(true));
          return;
        }
        dispatch(setVendors(res.data));
        return res;
      });
    });
  };

export const updateVendorAuth =
  ({ id }) =>
  (dispatch) => {
    return updateVendorAuthAPI({
      id,
    }).then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setShowSuccessNotification(true));
      getMeApi().then((res) => {
        if (!res.ok) {
          dispatch(setErrorMessage(res.message));
          dispatch(setShowWarningNotification(true));
          return;
        }
        dispatch(setVendors(res.data));
        return res;
      });
    });
  };

export const getVendorCategoryById =
  ({ id }) =>
  (dispatch) => {
    getVendorCategoryByIdAPI({ id }).then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setVendors(res.data));
    });
  };

export const addVendorCategory =
  ({ name }) =>
  (dispatch) => {
    return addVendorCategoryAPI({
      name,
    }).then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setShowSuccessNotification(true));
      getMeApi().then((res) => {
        if (!res.ok) {
          dispatch(setErrorMessage(res.message));
          dispatch(setShowWarningNotification(true));
          return;
        }
        dispatch(setVendors(res.data));
        return res;
      });
    });
  };

export const updateVendorCategory =
  ({ id, name }) =>
  (dispatch) => {
    return updateVendorCategoryAPI({
      id,
      name,
    }).then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setShowSuccessNotification(true));
      getMeApi().then((res) => {
        if (!res.ok) {
          dispatch(setErrorMessage(res.message));
          dispatch(setShowWarningNotification(true));
          return;
        }
        dispatch(setVendors(res.data));
        return res;
      });
    });
  };

export const deleteVendorCategory =
  ({ id }) =>
  (dispatch) => {
    return deleteVendorCategoryAPI({
      id,
    }).then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setShowSuccessNotification(true));
      getMeApi().then((res) => {
        if (!res.ok) {
          dispatch(setErrorMessage(res.message));
          dispatch(setShowWarningNotification(true));
          return;
        }
        dispatch(setVendors(res.data));
        return res;
      });
    });
  };

export const getProducts = (queryParameters) => (dispatch) => {
  getProductsAPI(queryParameters).then((res) => {
    if (!res.ok) {
      dispatch(setErrorMessage(res.message));
      dispatch(setShowWarningNotification(true));
      return;
    }
    dispatch(setProducts(res.data));
  });
};

export const addProductCategory =
  ({ name }) =>
  (dispatch) => {
    return addProductCategoryAPI({
      name,
    }).then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setShowSuccessNotification(true));
      getMeApi().then((res) => {
        if (!res.ok) {
          dispatch(setErrorMessage(res.message));
          dispatch(setShowWarningNotification(true));
          return;
        }
        dispatch(setProducts(res.data));
        return res;
      });
    });
  };

export const updateProductCategory =
  ({ id, name }) =>
  (dispatch) => {
    return updateProductCategoryAPI({
      id,
      name,
    }).then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setShowSuccessNotification(true));
      getMeApi().then((res) => {
        if (!res.ok) {
          dispatch(setErrorMessage(res.message));
          dispatch(setShowWarningNotification(true));
          return;
        }
        dispatch(setProducts(res.data));
        return res;
      });
    });
  };

export const deleteProductCategory =
  ({ id }) =>
  (dispatch) => {
    return deleteProductCategoryAPI({
      id,
    }).then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setShowSuccessNotification(true));
      getMeApi().then((res) => {
        if (!res.ok) {
          dispatch(setErrorMessage(res.message));
          dispatch(setShowWarningNotification(true));
          return;
        }
        dispatch(setProducts(res.data));
        return res;
      });
    });
  };

export const getOrders = (queryParameters) => (dispatch) => {
  getOrdersAPI(queryParameters).then((res) => {
    if (!res.ok) {
      dispatch(setErrorMessage(res.message));
      dispatch(setShowWarningNotification(true));
      return;
    }
    dispatch(setOrders(res.data));
  });
};

export const deleteOrder =
  ({ id }) =>
  (dispatch) => {
    return deleteOrderAPI({
      id,
    }).then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setShowSuccessNotification(true));
      getMeApi().then((res) => {
        if (!res.ok) {
          dispatch(setErrorMessage(res.message));
          dispatch(setShowWarningNotification(true));
          return;
        }
        dispatch(setOrders(res.data));
        return res;
      });
    });
  };

export const selectAllUsers = (state) => state.users.users;
export const selectUser = (state) => state.users.user;
export const selectAllMessages = (state) => state.messages.messages;
export const selectMessage = (state) => state.messages.message;
export const selectAllVendors = (state) => state.vendors.vendors;
export const selectVendor = (state) => state.vendors.vendor;
export const selectAllOrders = (state) => state.orders.orders;
export const selectAllProducts = (state) => state.products.products;

export default adminReducer.reducer;
