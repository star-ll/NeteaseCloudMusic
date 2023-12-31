import { createSlice } from "@reduxjs/toolkit";
// import { audioControl } from "../utils/audio";

const initialState = {
  musicInfo: {
    id: null,
    singer: null,
    name: null,
    cover: "",
    rawInfo: {},
  },
  progress: 0, // 播放进度，值范围 0-100
  duration: null,
  playStatus: "paused", // playing | paused,
  playType: "order", // order loop random
};

const playControlSlice = createSlice({
  name: "playControl",
  initialState,
  reducers: {
    changePlayStatus(state, action) {
      if (action.payload.playStatus) {
        state.playStatus = action.payload.playStatus;
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
      if (action.payload.duration) {
        state.duration = action.payload.duration;
      }
    },
  },
});

export const { changePlayStatus, changePlayTime, playAll, addPlayList } = playControlSlice.actions;

export default playControlSlice.reducer;
