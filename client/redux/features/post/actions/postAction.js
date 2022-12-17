import { createAsyncThunk } from "@reduxjs/toolkit";
import axios_interceptor, {
  instance,
} from "../../../../utils/axios/axios_interceptor";

//get all post
export const getAllPost = createAsyncThunk(
  "/api/v1/get/all/posts",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const { data } = await axios_interceptor.get(
        `/api/v1/get/all/posts?page=${page}&limit=${limit}`
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
//get all popular post
export const getAllPopularPost = createAsyncThunk(
  "/api/v1/get/all/popular/posts",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const { data } = await axios_interceptor.get(
        `/api/v1/get/all/popular/posts?page=${page}&limit=${limit}`
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

//get all publish post
export const getAllPublishPost = createAsyncThunk(
  "/api/v1/get/all/publish/posts",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        `/api/v1/get/all/publish/posts?page=${page}&limit=${limit}`
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
//create post
export const createPost = createAsyncThunk(
  "/api/v1/create/post",
  async (
    {
      title,
      slug,
      keyword,
      description,
      thumbnail,
      category,
      schema,
      post,
      post_description,
      open_graph,
      twitter_card,
      publish,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios_interceptor.post("/api/v1/create/post", {
        title,
        slug,
        keyword,
        description,
        thumbnail,
        category,
        schema,
        post,
        post_description,
        open_graph,
        twitter_card,
        publish,
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
//edit post
export const editPost = createAsyncThunk(
  "/api/v1/edit/post",
  async (
    {
      post_id,
      title,
      slug,
      keyword,
      description,
      thumbnail,
      category,
      schema,
      post,
      post_description,
      open_graph,
      twitter_card,
      publish,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios_interceptor.put(
        `/api/v1/edit/post/${post_id}`,
        {
          title,
          slug,
          keyword,
          description,
          thumbnail,
          category,
          schema,
          post,
          post_description,
          open_graph,
          twitter_card,
          publish,
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
      } else if (error?.response?.status === 404) {
        return rejectWithValue(error.response.data.errors.message);
      } else {
        return rejectWithValue("Internal server error");
      }
    }
  }
);

//get post by id
export const getPostById = createAsyncThunk(
  "/api/v1/get/post",
  async ({ post_id }, { rejectWithValue }) => {
    try {
      const { data } = await axios_interceptor.get(
        `/api/v1/get/post/${post_id}`
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
