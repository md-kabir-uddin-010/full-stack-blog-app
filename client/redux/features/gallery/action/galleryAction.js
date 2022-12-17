import { createAsyncThunk } from "@reduxjs/toolkit";
import axios_interceptor from "../../../../utils/axios/axios_interceptor";

//get all image
export const getAllImages = createAsyncThunk(
  "/api/v1/get/all/images",
  async ({ limit, page }, { rejectWithValue }) => {
    try {
      const { data } = await axios_interceptor.get(
        `/api/v1/get/all/images?limit=${limit}&page=${page}`
      );
      return data;
    } catch (error) {
      if (error?.response?.status === 422) {
        return rejectWithValue(error.response.data.errors.message);
      } else if (error?.response?.status === 409) {
        return rejectWithValue(error.response.data.errors.message);
      } else if (error?.response?.status === 401) {
        return rejectWithValue(error.response.data.errors.message);
      } else if (error?.response?.status === 404) {
        return rejectWithValue(error.response.data.errors.message);
      } else {
        return rejectWithValue("Internal server error");
      }
    }
  }
);
