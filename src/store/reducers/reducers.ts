import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flag: false,
  sidebarOpen: false,
};

const reducers = createSlice({
  name: "reducers",
  initialState,
  reducers: {
    flagUpdate: (state, action) => {
      state.flag = action.payload;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const { flagUpdate, setSidebarOpen } = reducers.actions;
export default reducers;
