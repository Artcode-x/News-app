import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../interface/interface';

const initialState: AppState = {
  sidebarOpen: false,
  error: null,
};

const reducers = createSlice({
  name: 'reducers',
  initialState,
  reducers: {
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state, action) => {
      state.error = null;
    },
  },
});

export const { setSidebarOpen, setError, clearError } = reducers.actions;
export default reducers;
