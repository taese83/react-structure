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
    pop(state, action) {
      state.from = state.stack[state.stack.length - 1];

      let newStack = [...state.stack];
      if (!action.payload) {
        newStack.pop();
      } else {
        const index = state.stack.lastIndexOf(action.payload);
        if (index < 0) {
          newStack.pop();
        } else {
          newStack = state.stack.slice(0, index + 1);
        }
      }
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
