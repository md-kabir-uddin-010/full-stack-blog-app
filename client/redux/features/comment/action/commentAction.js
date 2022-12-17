import { createAsyncThunk } from "@reduxjs/toolkit";
import axios_interceptor, {
  instance,
} from "../../../../utils/axios/axios_interceptor";

//create new comment
export const createComment = createAsyncThunk(
  "/api/v1/create/new/comment",
  async (
    { post_id, post_title, post_slug, name, email, comment },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await instance.post(`/api/v1/create/new/comment`, {
        post_id,
        post_title,
        post_slug,
        name,
        email,
        comment,
      });
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
//get all comment
export const getAllComments = createAsyncThunk(
  "/api/v1/get/all/comments",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const { data } = await axios_interceptor.get(
        `/api/v1/get/all/comments?limit=${limit}&page=${page}`
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
//approve comment by id
export const approveComment = createAsyncThunk(
  "/api/v1/comment/approve",
  async ({ comment_id }, { rejectWithValue }) => {
    try {
      const { data } = await axios_interceptor.put(
        `/api/v1/comment/approve/${comment_id}`
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
//delete comment by id
export const deleteComment = createAsyncThunk(
  "/api/v1/comment/delete",
  async ({ comment_id }, { rejectWithValue }) => {
    try {
      const { data } = await axios_interceptor.delete(
        `/api/v1/comment/delete/${comment_id}`
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
