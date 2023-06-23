import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { localStorageKeys, UserModel } from 'src/Shared';

export type UsersStore = {
  users: UserModel[];
};

const usersString = localStorage.getItem(localStorageKeys.users);

const initialState: UsersStore = {
  users: UserModel.parseFromJSON(usersString),
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loadUsers: (state, action: PayloadAction<UserModel[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<UserModel>) => {
      state.users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
  },
});

export const { addUser, loadUsers } = usersSlice.actions;
