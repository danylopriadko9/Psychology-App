"use client";
//###############################################################
//============= TYPES ===================
import {
  IEmailVerificationArguments,
  IResetPasswordArguments,
  IServerResponse,
  ISignInArguments,
  ISignUpState,
  IUserDataSingUp,
} from "@/app/types/reduxTypes/auth";
//============= AXIOS ===================
import { axiosInstance } from "@/app/utilities/axiosInstance";
import { AxiosError } from "axios";
//============= REDUX ===================
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IData } from "@/app/types/data";
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

const initialState = {
  user: null,
  isAuthenticated: false,
  errorMessage: null,
  isLoading: false,
  isCheckingAuth: true,
} satisfies ISignUpState as ISignUpState;

const authSlice = createSlice({
  name: "auth",
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
        (action.payload as string) || "Unknown error occupied";
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
        (action.payload as string) || "Unknown error occupied";
    });
    //###############################################################
    //            Send Another Email Verification Code             //
    //###############################################################
    builder.addCase(sendAnotherEmailVerificationCode.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    });
    builder.addCase(sendAnotherEmailVerificationCode.fulfilled, (state) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(
      sendAnotherEmailVerificationCode.rejected,
      (state, action) => {
        state.isLoading = false;
        state.errorMessage =
          (action.payload as string) || "Unknown error occupied";
      }
    );
    //###############################################################
    //                      Authorization Check                    //
    //###############################################################
    builder.addCase(authorizationCheck.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    });
    builder.addCase(authorizationCheck.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(authorizationCheck.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage =
        (action.payload as string) || "Unknown error occupied";
    });
    //###############################################################
    //                         LOG-OUT                             //
    //###############################################################
    builder.addCase(logOut.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    });
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(logOut.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage =
        (action.payload as string) || "Unknown error occupied";
    });
    //###############################################################
    //                      SIGN IN CASES                          //
    //###############################################################
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.errorMessage =
        (action.payload as string) || "Unknown error occupied";
    });
    //###############################################################
    //                      FORGOT PASSWORD                        //
    //###############################################################
    builder.addCase(forgotPassword.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.errorMessage =
        (action.payload as string) || "Unknown error occupied";
    });
    //###############################################################
    //                       RESET PASSWORD                        //
    //###############################################################
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.isLoading = false;
      state.errorMessage = null;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.errorMessage =
        (action.payload as string) || "Unknown error occupied";
    });
  },
});

export default authSlice.reducer;
