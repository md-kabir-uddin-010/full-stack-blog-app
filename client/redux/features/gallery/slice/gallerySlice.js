import { createSlice } from "@reduxjs/toolkit";
import { getAllImages } from "../action/galleryAction";

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

const gallerySlice = createSlice({
  name: "gallery_slice",
  initialState,
  reducers: {
    removeImage: (state, { payload }) => {
      const findImage = state?.info?.images?.find(
        (item) => item.id === payload
      );
      if (!findImage) return;
      state.info = {
        ...state.info,
        total_images: state?.info?.total_images - 1,
        images: state?.info?.images?.filter((item) => item.id !== payload),
      };
    },
    addImage: (state, { payload }) => {
      state.info = {
        ...state.info,
        total_images: state?.info?.total_images + 1,
        images: [...state.info.images, payload],
      };
    },
  },
  extraReducers: {
    //get all image reducer
    [getAllImages.pending]: (state) => {
      state.info = {};
      state.error = null;
      state.loading = true;
      state.success = false;
      state.message = null;
    },
    [getAllImages.fulfilled]: (state, { payload }) => {
      state.info = payload.info ? payload.info : {};
      state.error = null;
      state.loading = false;
      state.success = true;
      state.message = payload.message ? payload.message : null;
    },
    [getAllImages.rejected]: (state, { payload }) => {
      state.info = {};
      state.error = payload;
      state.loading = false;
      state.success = false;
      state.message = null;
    },
  },
});

export const { removeImage, addImage } = gallerySlice.actions;
export default gallerySlice.reducer;
