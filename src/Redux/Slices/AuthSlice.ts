import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { localStorageKeys, UserModel } from 'src/Shared';

export type AuthStore = {
  isAuthenticated: boolean;
  user?: UserModel;
};

const initialState: AuthStore = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<UserModel>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem(
        localStorageKeys.authUserId,
        action.payload.id.toString()
      );
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.user = undefined;

      localStorage.setItem(localStorageKeys.authUserId, '');
    },
  },
});

export const { signIn, logOut } = authSlice.actions;
