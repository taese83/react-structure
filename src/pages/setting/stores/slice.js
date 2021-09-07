import { createSlice, createDraftSafeSelector } from '@reduxjs/toolkit';

const name = 'setting';

const initialState = {
  data: null,
};

const settingSlice = createSlice({
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
export const { setData, getData } = settingSlice.actions;
export default settingSlice;
