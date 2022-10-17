import { createSlice } from "@reduxjs/toolkit";
import { audioControl } from "../utils/audio";

const initialState = {
	musicInfo: {
		id: null,
		singer: null,
		name: null,
	},
	progress: 0, // 播放进度，值范围 0-100
	currentTime: null,
	duration: null,
	playStatus: "paused", // playing | paused,
};

const playControlSlice = createSlice({
	name: "playControl",
	initialState,
	reducers: {
		changePlayStatus(state, action) {
			if (action.payload.playStatus) {
				const isNew =
					action.payload.musicInfo?.id &&
					action.payload.musicInfo.id !== state.musicInfo.id;
				state.playStatus = action.payload.playStatus;

				if (action.payload.playStatus === "playing") {
					audioControl.play(
						isNew ? action.payload.musicInfo.id : null
					);
				} else if (action.payload.playStatus === "paused") {
					audioControl.pause();
				}
			}

			if (action.payload.musicInfo) {
				state.musicInfo = {
					...state.musicInfo,
					...action.payload.musicInfo,
				};
			}
		},
		changePlayTime(state, action) {
			if (action.payload.progress != null) {
				state.progress = action.payload.progress;
			}
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
