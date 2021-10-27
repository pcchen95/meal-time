import { createSlice } from "@reduxjs/toolkit";
import {
  getFaq as getFaqApi,
  getFaqCategory as getFaqCategoryApi,
} from "../../WebAPI/faqAPI";

const initialState = {
  faqs: null,
  faqCategories: null,
};

export const systemReducer = createSlice({
  name: "system",
  initialState,
  reducers: {
    setFaqs: (state, action) => {
      state.faqs = action.payload;
    },
    setFaqCategories: (state, action) => {
      state.faqCategories = action.payload;
    },
  },
});

export const { setFaqs, setFaqCategories } = systemReducer.actions;

export const getFaqs = (queryParameters) => (dispatch) => {
  return getFaqApi(queryParameters).then((res) => {
    if (!res.ok) {
      console.log("Error: ", res.message);
      return;
    }
    dispatch(setFaqs(res.data));
  });
};

export const cleanFaqs = () => (dispatch) => {
  dispatch(setFaqs(null));
};

export const getFaqCategories = (queryParameters) => (dispatch) => {
  return getFaqCategoryApi(queryParameters).then((res) => {
    if (!res.ok) {
      console.log("Error: ", res.message);
      return;
    }
    dispatch(setFaqCategories(res.data));
  });
};

export default systemReducer.reducer;
