import { configureStore } from "@reduxjs/toolkit";
import playControlReducer from "./playControlSlice";
import playListReducer from "./playListSlice";

export const store = configureStore({
  reducer: {
    playControl: playControlReducer,
    playList: playListReducer,
  },
});
