import { createSlice } from "@reduxjs/toolkit";

const name = "common";

const initialState = {
  initializing: false,
  complete: false,
  fail: false,
  action: null,
};

const commonSlice = createSlice({
  name,
  initialState,
  reducers: {
    idle(state) {
      state.initialState = false;
    },
    init(state, action) {
      state.initializing = true;
      state.action = action.payload;
    },
    complete(state) {
      state.complete = true;
    },
    fail(state) {
      state.fail = true;
    },
    webAction(state, action) {
      state.action = action.payload;
    },
  },
});

export const commonState = (state) => state[name];
export const { idle, init, complete, fail, webAction } = commonSlice.actions;
export default commonSlice;
