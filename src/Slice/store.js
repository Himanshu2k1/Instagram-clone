import { configureStore } from "@reduxjs/toolkit";

import userReducer from './userSlice'
import postsSlice from "./postsSlice";
import suggestionsSlice from "./suggestionsSlice";

const store = configureStore({
  reducer: {
    user:userReducer,
    posts:postsSlice,
    suggestions:suggestionsSlice
  },
});

export default store;