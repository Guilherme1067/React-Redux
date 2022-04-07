import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'contador',
  initialState: 0,
  reducers: {
    somar: {
      reducer: (state, action) => state + action.payload,
      prepare(payload) {
        return { payload, meta: 'local' };
      },
    },
  },
});

export const { incrementar, reduzir, somar } = slice.actions;

export default slice.reducer;
