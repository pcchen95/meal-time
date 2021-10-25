import { createSlice } from "@reduxjs/toolkit";
import {
  getOrdersBought as getOrdersBoughtAPI,
  getOrdersSold as getOrdersSoldAPI,
  getOrder as getOrderAPI,
  postOrder,
  completeOrder as completeOrderAPI,
  cancelOrder as cancelOrderAPI,
} from "../../WebAPI/orderAPI";
import {
  setErrorMessage,
  setShowSuccessNotification,
  setShowWarningNotification,
} from "./notificationReducer";

const initialState = {
  order: [],
  orders: [],
  status: null,
  totalPages: 1,
  isLoading: false,
  isDisabled: false,
};

export const orderReducer = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsDisabled: (state, action) => {
      state.isDisabled = action.payload;
    },
  },
});

export const {
  setOrder,
  setOrders,
  setStatus,
  setTotalPages,
  setIsLoading,
  setIsDisabled,
} = orderReducer.actions;

export const getOrder = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  getOrderAPI(id).then((res) => {
    if (!res.ok) {
      dispatch(setIsLoading(false));
      dispatch(setErrorMessage(res.message));
      dispatch(setShowWarningNotification(true));
      return;
    }
    dispatch(setOrder(res.data));
    dispatch(setIsLoading(false));
  });
};

export const getOrdersBought = (userId) => (dispatch) => {
  dispatch(setIsLoading(true));
  getOrdersBoughtAPI(userId).then((res) => {
    if (!res.ok) {
      dispatch(setIsLoading(false));
      dispatch(setErrorMessage(res.message));
      dispatch(setShowWarningNotification(true));
      return;
    }
    if (res.data.count === 0) {
      dispatch(setTotalPages(1));
    } else {
      dispatch(setTotalPages(Math.ceil(res.data.count / 5)));
    }
    dispatch(setOrders(res.data.rows));
    dispatch(setIsLoading(false));
  });
};

export const getOrdersSold = (vendorId) => (dispatch) => {
  dispatch(setIsLoading(true));
  getOrdersSoldAPI(vendorId).then((res) => {
    if (!res.ok) {
      dispatch(setErrorMessage(res.message));
      dispatch(setIsLoading(false));
      dispatch(setShowWarningNotification(true));
      return;
    }
    if (res.data.count === 0) {
      dispatch(setTotalPages(1));
    } else {
      dispatch(setTotalPages(Math.ceil(res.data.count / 5)));
    }
    dispatch(setOrders(res.data.rows));
    dispatch(setIsLoading(false));
  });
};

export const newOrder = (data) => (dispatch) => {
  dispatch(setIsLoading(true));
  postOrder(data).then((res) => {
    if (!res.ok) {
      dispatch(setErrorMessage(res.message));
      dispatch(setIsLoading(false));
      dispatch(setShowWarningNotification(true));
      return;
    }
    dispatch(setIsLoading(false));
    dispatch(setShowSuccessNotification(true, "訂單已成立"));
    return res;
  });
};

export const completeOrder = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return completeOrderAPI(id).then((res) => {
    dispatch(setIsLoading(false));
    dispatch(setShowSuccessNotification(true));
    dispatch(setIsDisabled(true));
    return res.data;
  });
};

export const cancelOrder = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return cancelOrderAPI(id).then((res) => {
    dispatch(setIsLoading(false));
    dispatch(setShowSuccessNotification(true));
    dispatch(setIsDisabled(true));
    return res.data;
  });
};

export const cleanOrderDetails = () => (dispatch) => {
  dispatch(setOrder([]));
  dispatch(setIsDisabled(false));
};

export const cleanOrders = () => (dispatch) => {
  dispatch(setOrders([]));
};

export const selectAllOrders = (state) => state.orders.orders;
export const selectSingleOrder = (state) => state.orders.order;
export const selectStatus = (state) => state.orders.status;
export const selectPage = (state) => state.orders.page;
export const selectTotalPages = (state) => state.orders.totalPages;
export const selectIsLoading = (state) => state.orders.isLoading;
export const selectIsDisabled = (state) => state.orders.isDisabled;

export default orderReducer.reducer;
