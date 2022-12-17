import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/slice/authSlice";
import commentSlice from "../features/comment/slice/commentSlice";
import gallerySlice from "../features/gallery/slice/gallerySlice";
import postSlice from "../features/post/slice/postSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    comment: commentSlice,
    gallery: gallerySlice,
  },
});

export default store;
