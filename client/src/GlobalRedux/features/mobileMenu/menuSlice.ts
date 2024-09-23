'use client';
// slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// api call
// export const fetchUsers = createAsyncThunk(
//   "users/getAllUsers",
//   async (thunkApi) => {
//     const response = await fetch("https://jsonplaceholder.typicode.com/users");
//     const data = await response.json();
//     return data;
//   }
// );

export interface IMenuState {
  isMenuOpen: boolean;
}

const initialState = {
  isMenuOpen: false,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    changeMenuStatus: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(fetchUsers.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.users.push(...action.payload);
  //     });

  //     builder.addCase(fetchUsers.pending, (state, action) => {
  //       state.loading = true;
  //     });
  //   },
});

export const { changeMenuStatus } = menuSlice.actions;
export default menuSlice.reducer;
