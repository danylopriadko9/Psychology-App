'use client';
// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import menuSlice from './features/mobileMenu/menuSlice';
import authorizationSlice from './features/auth/authorizationSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      menu: menuSlice,
      authorization: authorizationSlice,
    },
    devTools: process.env.NODE_ENV !== 'production',
  });
}

export const store = makeStore();
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
