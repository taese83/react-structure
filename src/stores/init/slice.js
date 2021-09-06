import { createSlice } from '@reduxjs/toolkit';

const name = 'init';

const initialState = {
  loading: false,
  complete: false,
  fail: false,
};

const initSlice = createSlice({
  name,
  initialState,
  reducers: {
    idle(state) {
      state.loading = false;
    },
    init(state, action) {
      state.loading = true;
      state.action = action.payload;
    },
    complete(state) {
      state.complete = true;
    },
    fail(state) {
      state.fail = true;
    },
  },
});

export const initState = (state) => state[name];
export const { idle, init, complete, fail, webAction } = initSlice.actions;
export default initSlice;
