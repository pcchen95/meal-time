import { createSlice } from "@reduxjs/toolkit";
import {
  register as registerApi,
  getVendorProfile as getVendorProfileApi,
  updateVendorProfile as updateVendorProfileApi,
  getAvailVendorProfileById as getAvailVendorProfileByIdApi,
  getAvailableVendorProfiles as getAvailableVendorProfilesApi,
  updateIsOpen as updateIsOpenApi,
  getVendorCategories as getVendorCategoriesApi,
  getDistance as getDistanceApi,
} from "../../WebAPI/vendorAPI";
import { setAuthToken } from "../../utils";
import {
  setErrorMessage,
  setShowSuccessNotification,
  setShowWarningNotification,
} from "./notificationReducer";

const initialState = {
  vendor: null,
  address: null,
  vendors: null,
  vendorById: null,
  categories: null,
  isLoading: false,
  vendorOfMap: null,
  distance: null,
};

export const vendorReducer = createSlice({
  name: "vendors",
  initialState,
  reducers: {
    setVendor: (state, action) => {
      state.vendor = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setVendors: (state, action) => {
      state.vendors = action.payload;
    },
    setVendorById: (state, action) => {
      state.vendorById = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setVendorOfMap: (state, action) => {
      state.vendorOfMap = action.payload;
    },
    setDistance: (state, action) => {
      state.distance = action.payload;
    },
  },
});

export const {
  setVendor,
  setAddress,
  setVendors,
  setCategories,
  setVendorById,
  setIsLoading,
  setDistanceList,
  setVendorOfMap,
  setDistance,
} = vendorReducer.actions;

export const register =
  ({
    avatar,
    banner,
    vendorName,
    phone,
    address,
    latlng,
    openingHour,
    description,
    categoryId,
  }) =>
  (dispatch) => {
    return registerApi({
      avatar,
      banner,
      vendorName,
      phone,
      address,
      latlng,
      openingHour,
      description,
      categoryId,
    }).then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setShowSuccessNotification(true));
      setAuthToken(res.token);

      return getVendorProfileApi().then((res) => {
        if (!res.ok) {
          dispatch(setErrorMessage(res.message));
          dispatch(setShowWarningNotification(true));
          return;
        }
        dispatch(setVendor(res.data));
        return res.data;
      });
    });
  };

export const getVendor = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return getVendorProfileApi().then((res) => {
    if (!res.ok) {
      dispatch(setErrorMessage(res.message));
      dispatch(setShowWarningNotification(true));
      return;
    }
    dispatch(setVendor(res.data));
    dispatch(setIsLoading(false));
  });
};

export const updateProfile =
  ({
    avatar,
    banner,
    vendorName,
    phone,
    address,
    latlng,
    openingHour,
    description,
    categoryId,
    isDeleteAvatar,
    isDeleteBanner,
  }) =>
  (dispatch) => {
    dispatch(setIsLoading(true));
    return updateVendorProfileApi({
      avatar,
      banner,
      vendorName,
      phone,
      address,
      latlng,
      openingHour,
      description,
      categoryId,
      isDeleteAvatar,
      isDeleteBanner,
    }).then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setShowSuccessNotification(true));
      getVendorProfileApi().then((res) => {
        if (!res.ok) {
          dispatch(setErrorMessage(res.message));
          dispatch(setShowWarningNotification(true));
          return;
        }
        dispatch(setIsLoading(false));
        dispatch(setVendor(res.data));
      });
      return res;
    });
  };

export const setToggleOpen = () => (dispatch) => {
  return updateIsOpenApi().then((res) => {
    if (!res.ok) {
      dispatch(setErrorMessage(res.message));
      dispatch(setShowWarningNotification(true));
      return;
    }
    dispatch(setShowSuccessNotification(true));
    getVendorProfileApi().then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setIsLoading(false));
      dispatch(setVendor(res.data));
    });
  });
};

export const getAllVendors =
  ({ page, limit, sort, order, role, categoryId }) =>
  (dispatch) => {
    return getAvailableVendorProfilesApi({
      page,
      limit,
      sort,
      order,
      role,
      categoryId,
    }).then((res) => {
      if (!res.ok) {
        dispatch(setErrorMessage(res.message));
        dispatch(setShowWarningNotification(true));
        return;
      }
      dispatch(setVendors(res.data));
    });
  };

export const getVendorById = (id) => (dispatch) => {
  return getAvailVendorProfileByIdApi(id).then((res) => {
    if (!res.ok) {
      dispatch(setErrorMessage(res.message));
      dispatch(setShowWarningNotification(true));
      return;
    }
    dispatch(setVendorById(res.data));
  });
};

export const getVendorOfMap = (id) => (dispatch) => {
  return getAvailVendorProfileByIdApi(id).then((res) => {
    if (!res.ok) {
      dispatch(setErrorMessage(res.message));
      dispatch(setShowWarningNotification(true));
      return;
    }
    return res.data;
  });
};

export const getCategories = () => (dispatch) => {
  return getVendorCategoriesApi({ order: "ASC" }).then((res) => {
    if (!res.ok) {
      dispatch(setErrorMessage(res.message));
      dispatch(setShowWarningNotification(true));
      return;
    }
    dispatch(setCategories(res.data));
  });
};

export const setCompleteAddress = (address) => (dispatch) => {
  dispatch(setAddress(address));
};

export const getDistance =
  ({ origin, destination }) =>
  (dispatch) => {
    return getDistanceApi({ origin, destination }).then((res) => {
      dispatch(setDistance(res));
    });
  };

export default vendorReducer.reducer;
