import { createAsyncThunk } from "@reduxjs/toolkit";
import axios_interceptor, {
  instance,
} from "../../../../utils/axios/axios_interceptor";

//sign up user
export const signup = createAsyncThunk(
  "/api/v1/user/signup",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/api/v1/user/signup", {
        name,
        email,
        password,
      });
      return data;
    } catch (error) {
      if (error?.response?.status === 422) {
        return rejectWithValue(error.response.data.errors.message);
      } else if (error?.response?.status === 409) {
        return rejectWithValue(error.response.data.errors.message);
      } else if (error?.response?.status === 401) {
        return rejectWithValue(error.response.data.errors.message);
      } else {
        return rejectWithValue("Internal server error");
      }
    }
  }
);

//login user
export const login = createAsyncThunk(
  "/api/v1/user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/api/v1/user/login", {
        email,
        password,
      });
      return data;
    } catch (error) {
      if (error?.response?.status === 422) {
        return rejectWithValue(error.response.data.errors.message);
      } else if (error?.response?.status === 409) {
        return rejectWithValue(error.response.data.errors.message);
      } else if (error?.response?.status === 401) {
        return rejectWithValue(error.response.data.errors.message);
      } else {
        return rejectWithValue("Internal server error");
      }
    }
  }
);

//resend OTP
export const resendOTP = createAsyncThunk(
  "/api/v1/user/resend/otp",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/api/v1/user/resend/otp", {
        email,
        password,
      });
      return data;
    } catch (error) {
      if (error?.response?.status === 422) {
        return rejectWithValue(error.response.data.errors.message);
      } else if (error?.response?.status === 409) {
        return rejectWithValue(error.response.data.errors.message);
      } else if (error?.response?.status === 401) {
        return rejectWithValue(error.response.data.errors.message);
      } else {
        return rejectWithValue("Internal server error");
      }
    }
  }
);
//user account verification
export const signupVerify = createAsyncThunk(
  "/api/v1/user/account/verify/otp",
  async ({ user_id, token }, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/api/v1/user/account/verify/otp", {
        user_id,
        token,
      });
      return data;
    } catch (error) {
      if (error?.response?.status === 422) {
        return rejectWithValue(error.response.data.errors.message);
      } else if (error?.response?.status === 409) {
        return rejectWithValue(error.response.data.errors.message);
      } else if (error?.response?.status === 401) {
        return rejectWithValue(error.response.data.errors.message);
      } else {
        return rejectWithValue("Internal server error");
      }
    }
  }
);
//login verification
export const loginVerify = createAsyncThunk(
  "/api/v1/user/login/verify/otp",
  async ({ user_id, token }, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/api/v1/user/login/verify/otp", {
        user_id,
        token,
      });
      return data;
    } catch (error) {
      if (error?.response?.status === 422) {
        return rejectWithValue(error.response.data.errors.message);
      } else if (error?.response?.status === 409) {
        return rejectWithValue(error.response.data.errors.message);
      } else if (error?.response?.status === 401) {
        return rejectWithValue(error.response.data.errors.message);
      } else {
        return rejectWithValue("Internal server error");
      }
    }
  }
);
//logout user
export const logout = createAsyncThunk(
  "/api/v1/user/logout",
  async ({ refresh_token }, { rejectWithValue }) => {
    try {
      const { data } = await axios_interceptor.post("/api/v1/user/logout", {
        refresh_token,
      });
      return data;
    } catch (error) {
      if (error?.response?.status === 422) {
        return rejectWithValue(error.response.data.errors.message);
      } else if (error?.response?.status === 409) {
        return rejectWithValue(error.response.data.errors.message);
      } else if (error?.response?.status === 401) {
        return rejectWithValue(error.response.data.errors.message);
      } else {
        return rejectWithValue("Internal server error");
      }
    }
  }
);

//forget password
export const forgetPassword = createAsyncThunk(
  "/api/v1/user/forget/password",
  async ({ email }, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/api/v1/user/forget/password", {
        email,
      });
      return data;
    } catch (error) {
      if (error?.response?.status === 422) {
        return rejectWithValue(error.response.data.errors.message);
      } else if (error?.response?.status === 409) {
        return rejectWithValue(error.response.data.errors.message);
      } else if (error?.response?.status === 401) {
        return rejectWithValue(error.response.data.errors.message);
      } else {
        return rejectWithValue("Internal server error");
      }
    }
  }
);
// set forget password
export const setForgetPassword = createAsyncThunk(
  "/api/v1/user/set/forgeted/password",
  async ({ user_id, token, new_password }, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(
        "/api/v1/user/set/forgeted/password",
        {
          user_id,
          token,
          new_password,
        }
      );
      return data;
    } catch (error) {
      if (error?.response?.status === 422) {
        return rejectWithValue(error.response.data.errors.message);
      } else if (error?.response?.status === 409) {
        return rejectWithValue(error.response.data.errors.message);
      } else if (error?.response?.status === 401) {
        return rejectWithValue(error.response.data.errors.message);
      } else {
        return rejectWithValue("Internal server error");
      }
    }
  }
);
