import { createSlice, createDraftSafeSelector } from '@reduxjs/toolkit';

const name = 'home';

const initialState = {
  data: null,
};

const homeSlice = createSlice({
  name,
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    getData() {},
  },
});

const dataState = (state) => state[name];
export const dataSelector = createDraftSafeSelector(
  dataState,
  (state) => state?.data,
);
export const { setData, getData } = homeSlice.actions;
export default homeSlice;
