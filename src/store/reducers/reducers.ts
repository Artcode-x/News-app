import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flag: false,
};

const reducers = createSlice({
  name: "reducers",
  initialState,
  reducers: {
    flagUpdate: (state, action) => {
      state.flag = action.payload;
    },
  },
});

export const { flagUpdate } = reducers.actions;
export default reducers;
