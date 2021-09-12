import { createSlice } from '@reduxjs/toolkit';

const name = 'i18n';

const initialState = {
  lang: undefined,
};

const i18nSlice = createSlice({
  name,
  initialState,
  reducers: {
    init() {},
    change(state, actions) {
      state.lang = actions.payload;
    },
  },
});

export const i18nState = (state) => state[name];
export const { init, change } = i18nSlice.actions;
export default i18nSlice;
