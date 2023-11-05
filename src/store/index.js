import { configureStore } from "@reduxjs/toolkit";
import playControlReducer from "./playControlSlice";
import playListReducer from "./playListSlice";
import userReducer from "./user";

export const store = configureStore({
  reducer: {
    playControl: playControlReducer,
    playList: playListReducer,
    user: userReducer,
  },
});
