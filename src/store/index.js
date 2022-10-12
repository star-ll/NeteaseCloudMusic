import { configureStore } from "@reduxjs/toolkit";
import playControlReducer from "./playControlSlice";

export const store = configureStore({
	reducer: {
		playControl: playControlReducer,
	},
});
