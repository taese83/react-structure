import { createSlice, createDraftSafeSelector } from '@reduxjs/toolkit';

const name = 'history';

const initialState = {
  stack: ['/'],
  from: '',
};

const initSlice = createSlice({
  name,
  initialState,
  reducers: {
    init(state, { payload }) {
      state.stack = payload;
    },
    stack(state, { payload: { stack, from } }) {
      stack && (state.stack = [...stack]);
      from && (state.from = from);
    },
    save() {},
  },
});

export const initState = (state) => state[name];
export const stackSelector = createDraftSafeSelector(
  initState,
  (state) => state?.stack,
);
export const fromSelector = createDraftSafeSelector(
  initState,
  (state) => state?.from,
);
export const { init, stack, save } = initSlice.actions;
export default initSlice;
