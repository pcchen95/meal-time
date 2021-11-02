import { createSlice } from "@reduxjs/toolkit";
import {
  getUserMessages as getUserMessagesApi,
  getUserMessagesById as getUserMessagesByIdApi,
  sendMessageToVendor as sendMessageToVendorApi,
  getVendorMessages as getVendorMessagesApi,
  getVendorMessagesById as getVendorMessagesByIdApi,
  sendMessageToClient as sendMessageToClientApi,
} from "../../WebAPI/messageAPI";
import { getAvailVendorProfileById } from "../../WebAPI/vendorAPI";

const initialState = {
  role: "user",
  messages: null,
  messagesById: null,
  id: null,
  roleInfo: null,
  isLoading: null,
};

export const messageReducer = createSlice({
  name: "message",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setMessagesById: (state, action) => {
      state.messagesById = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setRoleInfo: (state, action) => {
      state.roleInfo = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setRole,
  setMessages,
  setMessagesById,
  setId,
  setRoleInfo,
  setIsLoading,
} = messageReducer.actions;

export const setCurrentRole = (role) => (dispatch) => {
  dispatch(setRole(role));
};

export const getUserMessages = (queryParameters) => (dispatch) => {
  return getUserMessagesApi(queryParameters).then((res) => {
    if (!res.ok) {
      console.log("Error: ", res.message);
      return;
    }
    dispatch(setMessages(res.data));
  });
};

export const getUserMessagesById = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return getUserMessagesByIdApi(id).then((res) => {
    if (!res.ok) {
      dispatch(setIsLoading(false));
      console.log("Error: ", res.message);
      return;
    }
    if (res.data === null) {
      getAvailVendorProfileById(id).then((res) => {
        if (!res.ok) {
          console.log("Error: ", res.message);
          return;
        }
        dispatch(setRoleInfo(res.data));
      });
      dispatch(setIsLoading(false));
      dispatch(setMessagesById([]));
      return;
    }
    dispatch(setMessagesById(JSON.parse(res.data.content)));
    dispatch(
      setRoleInfo({
        id: res.data.vendorId,
        ...res.data.Vendor,
      })
    );
    dispatch(setIsLoading(false));
  });
};

export const sendMessageToVendor = (id, content) => (dispatch) => {
  return sendMessageToVendorApi(id, content).then((res) => {
    if (!res.ok) {
      console.log("Error: ", res.message);
      return;
    }
    dispatch(setMessagesById(JSON.parse(res.data.content)));
  });
};

export const getVendorMessages = (queryParameters) => (dispatch) => {
  return getVendorMessagesApi(queryParameters).then((res) => {
    if (!res.ok) {
      console.log("Error: ", res.message);
      return;
    }
    dispatch(setMessages(res.data));
  });
};

export const getVendorMessagesById = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  return getVendorMessagesByIdApi(id).then((res) => {
    if (!res.ok) {
      dispatch(setIsLoading(false));
      console.log("Error: ", res.message);
      return;
    }
    if (res.data === null) {
      dispatch(setIsLoading(false));
      return;
    }
    dispatch(setMessagesById(JSON.parse(res.data.content)));
    dispatch(
      setRoleInfo({
        id: res.data.clientId,
        ...res.data.User,
      })
    );
    dispatch(setIsLoading(false));
  });
};

export const sendMessageToClient = (id, content) => (dispatch) => {
  return sendMessageToClientApi(id, content).then((res) => {
    if (!res.ok) {
      console.log("Error: ", res.message);
      return;
    }
    dispatch(setMessagesById(JSON.parse(res.data.content)));
  });
};

export const cleanMessagesById = () => (dispatch) => {
  dispatch(setMessagesById(null));
};

export const cleanMessages = () => (dispatch) => {
  dispatch(setMessages(null));
};

export const cleanRoleInfo = () => (dispatch) => {
  dispatch(setRoleInfo(null));
};

export const setSelectedId = (id) => (dispatch) => {
  dispatch(setId(id));
};

export default messageReducer.reducer;
