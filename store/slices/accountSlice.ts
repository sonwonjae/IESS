import { createSlice } from '@reduxjs/toolkit';

import { User } from 'firebase/auth';

export interface Account {
  user: User;
  isLoading: boolean;
}

const initialState = {
  user: null,
  isLoading: true,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (_, action) => {
      return { user: action.payload, isLoading: false };
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export const { setAccount, startLoading } = accountSlice.actions;

export default accountSlice.reducer;
