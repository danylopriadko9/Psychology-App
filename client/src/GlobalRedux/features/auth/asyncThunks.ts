//###############################################################
//============= AXIOS ===================
import { axiosInstance } from "@/app/utilities/axiosInstance";
import { AxiosError } from "axios";
//============= TYPES ===================
import {
  IEmailVerificationArguments,
  IResetPasswordArguments,
  IServerResponse,
  ISignInArguments,
  IUserDataSingUp,
} from "@/app/types/reduxTypes/auth";
import { IData } from "@/app/types/data";
//============= REDUX ===================
import { createAsyncThunk } from "@reduxjs/toolkit";
//###############################################################

export const createUser = createAsyncThunk(
  "authorization/sign-up",
  async (
    { email, name, password, passwordRepeated }: IUserDataSingUp,
    thunkAPI
  ) => {
    try {
      const { data } = await axiosInstance.post("/auth/sign-up", {
        email,
        name,
        password,
        passwordRepeated,
      });
      return data as IServerResponse;
    } catch (error) {
      if (error instanceof AxiosError) {
        const res = error.response?.data as IData;
        return thunkAPI.rejectWithValue(res.message.replace("Error: ", ""));
      }
      throw error;
    }
  }
);

export const emailVerification = createAsyncThunk(
  "authorization/email-verification",
  async ({ code, email }: IEmailVerificationArguments, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/auth/verify-email", {
        code,
        email,
      });
      return data as IServerResponse;
    } catch (error) {
      if (error instanceof AxiosError) {
        const res = error.response?.data as IData;
        return thunkAPI.rejectWithValue(res.message.replace("Error: ", ""));
      }
      throw error;
    }
  }
);

export const sendAnotherEmailVerificationCode = createAsyncThunk(
  "authorization/send-another-email-verification-code",
  async (email: string, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(
        "/auth/send-new-email-verification-code",
        { email }
      );
      return data as IServerResponse;
    } catch (error) {
      if (error instanceof AxiosError) {
        const res = error.response?.data as IData;
        return thunkAPI.rejectWithValue(res.message.replace("Error: ", ""));
      }
      throw error;
    }
  }
);

export const authorizationCheck = createAsyncThunk(
  "authorization/authorization-check",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/auth/auth-check");
      return data as IServerResponse;
    } catch (error) {
      if (error instanceof AxiosError) {
        const res = error.response?.data as IData;
        return thunkAPI.rejectWithValue(res.message.replace("Error: ", ""));
      }
      throw error;
    }
  }
);

export const logOut = createAsyncThunk(
  "authorization/log-out",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/auth/logout");
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const res = error.response?.data as IData;
        return thunkAPI.rejectWithValue(res.message.replace("Error: ", ""));
      }
      throw error;
    }
  }
);

export const signIn = createAsyncThunk(
  "authorization/sign-in",
  async ({ email, password }: ISignInArguments, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/auth/sign-in", {
        email,
        password,
      });
      return data as IServerResponse;
    } catch (error) {
      if (error instanceof AxiosError) {
        const res = error.response?.data as IData;
        return thunkAPI.rejectWithValue(res.message.replace("Error: ", ""));
      }
      throw error;
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "authorization/forgot-password",
  async (email: string, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/auth/forgot-password", {
        email,
      });
      return data as IServerResponse;
    } catch (error) {
      if (error instanceof AxiosError) {
        const res = error.response?.data as IData;
        return thunkAPI.rejectWithValue(res.message.replace("Error: ", ""));
      }
      throw error;
    }
  }
);

export const resetPassword = createAsyncThunk(
  "authorization/reset-password",
  async (
    { password, resetPasswordToken, passwordRepeated }: IResetPasswordArguments,
    thunkAPI
  ) => {
    try {
      const { data } = await axiosInstance.post("/auth/reset-password", {
        password,
        resetPasswordToken,
        passwordRepeated,
      });
      return data as IServerResponse;
    } catch (error) {
      if (error instanceof AxiosError) {
        const res = error.response?.data as IData;
        return thunkAPI.rejectWithValue(res.message.replace("Error: ", ""));
      }
      throw error;
    }
  }
);
