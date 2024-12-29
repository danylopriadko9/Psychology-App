'use client';
//###############################################################
//============= TYPES ===================
import {
  IEmailVerificationArguments,
  IServerResponse,
  ISignUpState,
  IUserDataSingUp,
} from '@/app/types/reduxTypes/auth';
//============= AXIOS ===================
import { axiosInstance } from '@/app/utilities/axiosInstance';
import { AxiosError } from 'axios';
//============= REDUX ===================
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IData } from '@/app/types/data';
//###############################################################

export const createUser = createAsyncThunk(
  'authorization/sign-up',
  async (
    { email, name, password, passwordRepeated }: IUserDataSingUp,
    thunkAPI
  ) => {
    try {
      const { data } = await axiosInstance.post('/auth/sign-up', {
        email,
        name,
        password,
        passwordRepeated,
      });
      return data as IServerResponse;
    } catch (error) {
      if (error instanceof AxiosError) {
        const res = error.response?.data as IData;
        return thunkAPI.rejectWithValue(res.message.replace('Error: ', ''));
      }
      throw error;
    }
  }
);

export const emailVerification = createAsyncThunk(
  'authorization/email-verification',
  async ({ code, email }: IEmailVerificationArguments, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post('/auth/verify-email', {
        code,
        email,
      });
      return data as IServerResponse;
    } catch (error) {
      if (error instanceof AxiosError) {
        const res = error.response?.data as IData;
        return thunkAPI.rejectWithValue(res.message.replace('Error: ', ''));
      }
      throw error;
    }
  }
);

export const SendAnotherEmailVerificationCode = createAsyncThunk(
  'authorization/send-another-email-verification-code',
  async (email: string, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(
        '/auth/send-new-email-verification-code',
        { email }
      );
      return data as IServerResponse;
    } catch (error) {
      if (error instanceof AxiosError) {
        const res = error.response?.data as IData;
        return thunkAPI.rejectWithValue(res.message.replace('Error: ', ''));
      }
      throw error;
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  errorMessage: null,
  isLoading: false,
  isCheckingAuth: true,
} satisfies ISignUpState as ISignUpState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //###############################################################
    //                      SIGN-UP CASES                          //
    //###############################################################
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.errorMessage = null;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage =
        (action.payload as string) || 'Unknown error occupied';
      state.user = null;
    });
    //###############################################################
    //                   EMAIL VERIFICATION CASES                  //
    //###############################################################
    builder.addCase(emailVerification.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    });
    builder.addCase(emailVerification.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.errorMessage = null;
    });
    builder.addCase(emailVerification.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage =
        (action.payload as string) || 'Unknown error occupied';
    });
    //###############################################################
    //            Send Another Email Verification Code             //
    //###############################################################
    builder.addCase(SendAnotherEmailVerificationCode.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    });
    builder.addCase(SendAnotherEmailVerificationCode.fulfilled, (state) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(
      SendAnotherEmailVerificationCode.rejected,
      (state, action) => {
        state.isLoading = false;
        state.errorMessage =
          (action.payload as string) || 'Unknown error occupied';
      }
    );
  },
});

export default authSlice.reducer;
