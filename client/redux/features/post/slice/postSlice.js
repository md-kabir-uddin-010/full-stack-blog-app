import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  editPost,
  getAllPopularPost,
  getAllPost,
  getAllPostBySearchQuery,
  getAllPublishPost,
  getPostById,
} from "../actions/postAction";

let info = {},
  error = null,
  loading = false,
  success = false,
  message = null;

const initialState = {
  info,
  error,
  loading,
  success,
  message,
};

const authSlice = createSlice({
  name: "post_slice",
  initialState,
  reducers: {
    removePopularPost: (state, { payload }) => {
      const findPost = state?.info?.posts?.find((item) => item.id === payload);
      if (!findPost) return;
      state.info = {
        ...state.info,
        total_post: state?.info?.total_post - 1,
        posts: state?.info?.posts?.filter((item) => item.id !== payload),
      };
    },
    addToPopularPost: (state, { payload }) => {
      state.info = {
        ...state.info,
        posts: state?.info?.posts?.map((item) => {
          if (item.id === payload) {
            return {
              ...item,
              popular: true,
            };
          }
          return item;
        }),
      };
    },
    removePost: (state, { payload }) => {
      const findPost = state?.info?.posts?.find((item) => item.id === payload);
      if (!findPost) return;
      state.info = {
        ...state.info,
        total_post: state?.info?.total_post - 1,
        posts: state?.info?.posts?.filter((item) => item.id !== payload),
      };
    },
  },
  extraReducers: {
    //get all post reducer
    [getAllPost.pending]: (state) => {
      state.info = {};
      state.error = null;
      state.loading = true;
      state.success = false;
      state.message = null;
    },
    [getAllPost.fulfilled]: (state, { payload }) => {
      state.info = payload.info ? payload.info : {};
      state.error = null;
      state.loading = false;
      state.success = true;
      state.message = payload.message ? payload.message : null;
    },
    [getAllPost.rejected]: (state, { payload }) => {
      state.info = {};
      state.error = payload;
      state.loading = false;
      state.success = false;
      state.message = null;
    },
    //get post by id reducer
    [getPostById.pending]: (state) => {
      state.info = {};
      state.error = null;
      state.loading = true;
      state.success = false;
      state.message = null;
    },
    [getPostById.fulfilled]: (state, { payload }) => {
      state.info = payload.info ? payload.info : {};
      state.error = null;
      state.loading = false;
      state.success = true;
      state.message = payload.message ? payload.message : null;
    },
    [getPostById.rejected]: (state, { payload }) => {
      state.info = {};
      state.error = payload;
      state.loading = false;
      state.success = false;
      state.message = null;
    },
    //get all popular post reducer
    [getAllPopularPost.pending]: (state) => {
      state.info = {};
      state.error = null;
      state.loading = true;
      state.success = false;
      state.message = null;
    },
    [getAllPopularPost.fulfilled]: (state, { payload }) => {
      state.info = payload.info ? payload.info : {};
      state.error = null;
      state.loading = false;
      state.success = true;
      state.message = payload.message ? payload.message : null;
    },
    [getAllPopularPost.rejected]: (state, { payload }) => {
      state.info = {};
      state.error = payload;
      state.loading = false;
      state.success = false;
      state.message = null;
    },
    //get all publish post reducer
    [getAllPublishPost.pending]: (state) => {
      state.info = {};
      state.error = null;
      state.loading = true;
      state.success = false;
      state.message = null;
    },
    [getAllPublishPost.fulfilled]: (state, { payload }) => {
      state.info = payload.info ? payload.info : {};
      state.error = null;
      state.loading = false;
      state.success = true;
      state.message = payload.message ? payload.message : null;
    },
    [getAllPublishPost.rejected]: (state, { payload }) => {
      state.info = {};
      state.error = payload;
      state.loading = false;
      state.success = false;
      state.message = null;
    },
    //create post reducer
    [createPost.pending]: (state) => {
      state.info = {};
      state.error = null;
      state.loading = true;
      state.success = false;
      state.message = null;
    },
    [createPost.fulfilled]: (state, { payload }) => {
      state.info = payload.info ? payload.info : {};
      state.error = null;
      state.loading = false;
      state.success = true;
      state.message = payload.message ? payload.message : null;
    },
    [createPost.rejected]: (state, { payload }) => {
      state.info = {};
      state.error = payload;
      state.loading = false;
      state.success = false;
      state.message = null;
    },
    //edit post reducer
    [editPost.pending]: (state) => {
      state.info = {};
      state.error = null;
      state.loading = true;
      state.success = false;
      state.message = null;
    },
    [editPost.fulfilled]: (state, { payload }) => {
      state.info = payload.info ? payload.info : {};
      state.error = null;
      state.loading = false;
      state.success = true;
      state.message = payload.message ? payload.message : null;
    },
    [editPost.rejected]: (state, { payload }) => {
      state.info = {};
      state.error = payload;
      state.loading = false;
      state.success = false;
      state.message = null;
    },
  },
});

export const { removePost, removePopularPost, addToPopularPost } =
  authSlice.actions;
export default authSlice.reducer;
