"use client";
//###############################################################
//============= TYPES ===================
import { ISignUpState } from "@/app/types/reduxTypes/auth";
//============= REDUX ===================
import { createSlice } from "@reduxjs/toolkit";
import {
  authorizationCheck,
  createUser,
  emailVerification,
  forgotPassword,
  logOut,
  resetPassword,
  sendAnotherEmailVerificationCode,
  signIn,
} from "./asyncThunks";
//###############################################################

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
    builder.addCase(logOut.fulfilled, (state) => {
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
    builder.addCase(forgotPassword.fulfilled, (state) => {
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
