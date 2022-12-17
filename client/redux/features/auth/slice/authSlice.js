import { createSlice } from "@reduxjs/toolkit";
import {
  signup,
  signupVerify,
  login,
  loginVerify,
  resendOTP,
  logout,
  forgetPassword,
  setForgetPassword,
} from "../actions/authAction";

let info = {},
  error = null,
  loading = false,
  success = false,
  message = null,
  access_token = null,
  refresh_token = null;

//localstorage to data get when user refresh page
if (typeof window !== "undefined") {
  info = localStorage.getItem("info")
    ? JSON.parse(localStorage.getItem("info"))
    : null;
  access_token = localStorage.getItem("access_token")
    ? JSON.parse(localStorage.getItem("access_token"))
    : null;
  refresh_token = localStorage.getItem("refresh_token")
    ? JSON.parse(localStorage.getItem("refresh_token"))
    : null;
}

const initialState = {
  info,
  error,
  loading,
  success,
  message,
  access_token,
  refresh_token,
};

const authSlice = createSlice({
  name: "auth_slice",
  initialState,
  reducers: {
    updateInfo: (state, { payload }) => {
      state.info = payload;
      localStorage.setItem("info", JSON.stringify(payload));
    },
  },
  extraReducers: {
    //sign up reducer
    [signup.pending]: (state) => {
      state.info = {};
      state.error = null;
      state.loading = true;
      state.success = false;
      state.message = null;
      state.access_token = null;
      state.refresh_token = null;
    },
    [signup.fulfilled]: (state, { payload }) => {
      state.info = payload.info ? payload.info : {};
      state.error = null;
      state.loading = false;
      state.success = true;
      state.message = payload.message ? payload.message : null;
      state.access_token = payload.access_token ? payload.access_token : null;
      state.refresh_token = payload.refresh_token
        ? payload.refresh_token
        : null;

      payload.info &&
        localStorage.setItem("info", JSON.stringify(payload.info));
      payload.access_token &&
        localStorage.setItem(
          "access_token",
          JSON.stringify(payload.access_token)
        );
      payload.refresh_token &&
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(payload.refresh_token)
        );
    },
    [signup.rejected]: (state, { payload }) => {
      state.info = {};
      state.error = payload;
      state.loading = false;
      state.success = false;
      state.message = null;
      state.access_token = null;
      state.refresh_token = null;
    },
    //sign verify reducer
    [signupVerify.pending]: (state) => {
      state.info = {};
      state.error = null;
      state.loading = true;
      state.success = false;
      state.message = null;
      state.access_token = null;
      state.refresh_token = null;
    },
    [signupVerify.fulfilled]: (state, { payload }) => {
      state.info = payload.info ? payload.info : {};
      state.error = null;
      state.loading = false;
      state.success = true;
      state.message = payload.message ? payload.message : null;
      state.access_token = payload.access_token ? payload.access_token : null;
      state.refresh_token = payload.refresh_token
        ? payload.refresh_token
        : null;

      payload.info &&
        localStorage.setItem("info", JSON.stringify(payload.info));
      payload.access_token &&
        localStorage.setItem(
          "access_token",
          JSON.stringify(payload.access_token)
        );
      payload.refresh_token &&
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(payload.refresh_token)
        );
    },
    [signupVerify.rejected]: (state, { payload }) => {
      state.info = {};
      state.error = payload;
      state.loading = false;
      state.success = false;
      state.message = null;
      state.access_token = null;
      state.refresh_token = null;
    },
    //login reducer
    [login.pending]: (state) => {
      state.info = {};
      state.error = null;
      state.loading = true;
      state.success = false;
      state.message = null;
      state.access_token = null;
      state.refresh_token = null;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.info = payload.info ? payload.info : {};
      state.error = null;
      state.loading = false;
      state.success = true;
      state.message = payload.message ? payload.message : null;
      state.access_token = payload.access_token ? payload.access_token : null;
      state.refresh_token = payload.refresh_token
        ? payload.refresh_token
        : null;

      payload.info &&
        localStorage.setItem("info", JSON.stringify(payload.info));
      payload.access_token &&
        localStorage.setItem(
          "access_token",
          JSON.stringify(payload.access_token)
        );
      payload.refresh_token &&
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(payload.refresh_token)
        );
    },
    [login.rejected]: (state, { payload }) => {
      state.info = {};
      state.error = payload;
      state.loading = false;
      state.success = false;
      state.message = null;
      state.access_token = null;
      state.refresh_token = null;
    },
    //login verify reducer
    [loginVerify.pending]: (state) => {
      state.info = {};
      state.error = null;
      state.loading = true;
      state.success = false;
      state.message = null;
      state.access_token = null;
      state.refresh_token = null;
    },
    [loginVerify.fulfilled]: (state, { payload }) => {
      state.info = payload.info ? payload.info : {};
      state.error = null;
      state.loading = false;
      state.success = true;
      state.message = payload.message ? payload.message : null;
      state.access_token = payload.access_token ? payload.access_token : null;
      state.refresh_token = payload.refresh_token
        ? payload.refresh_token
        : null;

      payload.info &&
        localStorage.setItem("info", JSON.stringify(payload.info));
      payload.access_token &&
        localStorage.setItem(
          "access_token",
          JSON.stringify(payload.access_token)
        );
      payload.refresh_token &&
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(payload.refresh_token)
        );
    },
    [loginVerify.rejected]: (state, { payload }) => {
      state.info = {};
      state.error = payload;
      state.loading = false;
      state.success = false;
      state.message = null;
      state.access_token = null;
      state.refresh_token = null;
    },
    //resend OTP
    [resendOTP.pending]: (state) => {
      state.info = {};
      state.error = null;
      state.loading = true;
      state.success = false;
      state.message = null;
      state.access_token = null;
      state.refresh_token = null;
    },
    [resendOTP.fulfilled]: (state, { payload }) => {
      state.info = payload.info ? payload.info : {};
      state.error = null;
      state.loading = false;
      state.success = true;
      state.message = payload.message ? payload.message : null;
      state.access_token = payload.access_token ? payload.access_token : null;
      state.refresh_token = payload.refresh_token
        ? payload.refresh_token
        : null;

      payload.info &&
        localStorage.setItem("info", JSON.stringify(payload.info));
      payload.access_token &&
        localStorage.setItem(
          "access_token",
          JSON.stringify(payload.access_token)
        );
      payload.refresh_token &&
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(payload.refresh_token)
        );
    },
    [resendOTP.rejected]: (state, { payload }) => {
      state.info = {};
      state.error = payload;
      state.loading = false;
      state.success = false;
      state.message = null;
      state.access_token = null;
      state.refresh_token = null;
    },
    //logout reducer
    [logout.pending]: (state) => {
      state.info = {};
      state.error = null;
      state.loading = true;
      state.success = false;
      state.message = null;
      state.access_token = null;
      state.refresh_token = null;
    },
    [logout.fulfilled]: (state, { payload }) => {
      state.info = payload.info ? payload.info : {};
      state.error = null;
      state.loading = false;
      state.success = true;
      state.message = payload.message ? payload.message : null;
      state.access_token = payload.access_token ? payload.access_token : null;
      state.refresh_token = payload.refresh_token
        ? payload.refresh_token
        : null;

      payload.info &&
        localStorage.setItem("info", JSON.stringify(payload.info));
      payload.access_token &&
        localStorage.setItem(
          "access_token",
          JSON.stringify(payload.access_token)
        );
      payload.refresh_token &&
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(payload.refresh_token)
        );
    },
    [logout.rejected]: (state, { payload }) => {
      state.info = {};
      state.error = payload;
      state.loading = false;
      state.success = false;
      state.message = null;
      state.access_token = null;
      state.refresh_token = null;
    },

    //forget password reducer
    [forgetPassword.pending]: (state) => {
      state.info = {};
      state.error = null;
      state.loading = true;
      state.success = false;
      state.message = null;
      state.access_token = null;
      state.refresh_token = null;
    },
    [forgetPassword.fulfilled]: (state, { payload }) => {
      state.info = payload.info ? payload.info : {};
      state.error = null;
      state.loading = false;
      state.success = true;
      state.message = payload.message ? payload.message : null;
      state.access_token = payload.access_token ? payload.access_token : null;
      state.refresh_token = payload.refresh_token
        ? payload.refresh_token
        : null;

      payload.info &&
        localStorage.setItem("info", JSON.stringify(payload.info));
      payload.access_token &&
        localStorage.setItem(
          "access_token",
          JSON.stringify(payload.access_token)
        );
      payload.refresh_token &&
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(payload.refresh_token)
        );
    },
    [forgetPassword.rejected]: (state, { payload }) => {
      state.info = {};
      state.error = payload;
      state.loading = false;
      state.success = false;
      state.message = null;
      state.access_token = null;
      state.refresh_token = null;
    },
    //set forget passeword reducer
    [setForgetPassword.pending]: (state) => {
      state.info = {};
      state.error = null;
      state.loading = true;
      state.success = false;
      state.message = null;
      state.access_token = null;
      state.refresh_token = null;
    },
    [setForgetPassword.fulfilled]: (state, { payload }) => {
      state.info = payload.info ? payload.info : {};
      state.error = null;
      state.loading = false;
      state.success = true;
      state.message = payload.message ? payload.message : null;
      state.access_token = payload.access_token ? payload.access_token : null;
      state.refresh_token = payload.refresh_token
        ? payload.refresh_token
        : null;

      payload.info &&
        localStorage.setItem("info", JSON.stringify(payload.info));
      payload.access_token &&
        localStorage.setItem(
          "access_token",
          JSON.stringify(payload.access_token)
        );
      payload.refresh_token &&
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(payload.refresh_token)
        );
    },
    [setForgetPassword.rejected]: (state, { payload }) => {
      state.info = {};
      state.error = payload;
      state.loading = false;
      state.success = false;
      state.message = null;
      state.access_token = null;
      state.refresh_token = null;
    },
  },
});

export const { updateInfo } = authSlice.actions;
export default authSlice.reducer;
