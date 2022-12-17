import { createSlice } from "@reduxjs/toolkit";
import { createComment, getAllComments } from "../action/commentAction";

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

const commentSlice = createSlice({
  name: "comment_slice",
  initialState,
  reducers: {
    removeComment: (state, { payload }) => {
      const findComment = state?.info?.comments?.find(
        (item) => item.id === payload
      );
      if (!findComment) return;
      state.info = {
        ...state.info,
        total_comment: state?.info?.total_comment - 1,
        comments: state?.info?.comments?.filter((item) => item.id !== payload),
      };
    },
    approveCommentAndUpdateSate: (state, { payload }) => {
      state.info = {
        ...state.info,
        comments: state?.info?.comments?.map((item) => {
          if (item.id === payload) {
            return {
              ...item,
              approve: true,
              seen: true,
            };
          }
          return item;
        }),
      };
    },
  },
  extraReducers: {
    //create post reducer
    [createComment.pending]: (state) => {
      state.info = {};
      state.error = null;
      state.loading = true;
      state.success = false;
      state.message = null;
    },
    [createComment.fulfilled]: (state, { payload }) => {
      state.info = payload.info ? payload.info : {};
      state.error = null;
      state.loading = false;
      state.success = true;
      state.message = payload.message ? payload.message : null;
    },
    [createComment.rejected]: (state, { payload }) => {
      state.info = {};
      state.error = payload;
      state.loading = false;
      state.success = false;
      state.message = null;
    },
    //get all comment reducer
    [getAllComments.pending]: (state) => {
      state.info = {};
      state.error = null;
      state.loading = true;
      state.success = false;
      state.message = null;
    },
    [getAllComments.fulfilled]: (state, { payload }) => {
      state.info = payload.info ? payload.info : {};
      state.error = null;
      state.loading = false;
      state.success = true;
      state.message = payload.message ? payload.message : null;
    },
    [getAllComments.rejected]: (state, { payload }) => {
      state.info = {};
      state.error = payload;
      state.loading = false;
      state.success = false;
      state.message = null;
    },
  },
});

export const { removeComment, approveCommentAndUpdateSate } =
  commentSlice.actions;
export default commentSlice.reducer;
