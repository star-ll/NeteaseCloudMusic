import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	musicInfo: {
		id: null,
		singer: null,
		name: null,
	},
	currentTime: null,
	duration: null,
	playStatus: "paused", // playing | paused,
};

const playControlSlice = createSlice({
	name: "playControl",
	initialState,
	reducers: {
		changePlayStatus(state, action) {
			if (action.payload.musicInfo) {
				state.musicInfo = action.payload.musicInfo;
			}
			if (action.payload.playStatus) {
				state.playStatus = action.payload.playStatus;
			}
		},
		changePlayTime(state, action) {
			if (action.payload.currentTime) {
				state.currentTime = action.payload.currentTime;
			}
			if (action.payload.duration) {
				state.duration = action.payload.duration;
			}
		},
	},
});

export const { changePlayStatus, changePlayTime } = playControlSlice.actions;

export default playControlSlice.reducer;
