import { createSlice } from '@reduxjs/toolkit';

const name = 'init';

const initialState = {
  loading: false,
  complete: false,
  fail: false,
  data: null,
};

const initSlice = createSlice({
  name,
  initialState,
  reducers: {
    idle(state) {
      state.loading = false;
    },
    init(state) {
      state.loading = true;
    },
    complete(state) {
      state.loading = false;
      state.complete = true;
    },
    fail(state) {
      state.loading = false;
      state.fail = true;
    },
  },
});

export const initState = (state) => state[name];
export const { idle, init, complete, fail } = initSlice.actions;
export default initSlice;
