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
    stack(state, { payload: { stack, from } }) {
      stack && (state.stack = [...stack]);
      from && (state.from = from);
    },
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
export const { stack } = initSlice.actions;
export default initSlice;
