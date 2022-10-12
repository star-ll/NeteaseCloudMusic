import { createSlice } from "@reduxjs/toolkit";
import { audioControl } from "../utils/audio";

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
			if (action.payload.playStatus) {
				state.playStatus = action.payload.playStatus;

				if (action.payload.playStatus === "playing") {
					audioControl.play(
						action.payload.musicInfo.id === state.musicInfo.id
							? null
							: action.payload.musicInfo.id
					);
					console.log(audioControl);
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
