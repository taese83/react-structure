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
    init(state, action) {
      state.stack = action.payload;
    },
    push(state, action) {
      state.from = state.stack[state.stack.length - 1];
      state.stack = [...state.stack, action.payload];
    },
    replace(state, action) {
      const newStack = [...state.stack];
      newStack[newStack.length - 1] = action.payload;
      state.stack = [...newStack];
    },
    pop(state) {
      state.from = state.stack[state.stack.length - 1];
      const newStack = [...state.stack];
      newStack.pop();
      state.stack = [...newStack];
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
export const { init, push, replace, pop, save } = initSlice.actions;
export default initSlice;
