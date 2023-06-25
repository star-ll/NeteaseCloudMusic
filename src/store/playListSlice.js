import { createSlice } from "@reduxjs/toolkit";

export const playListSlice = createSlice({
  name: "playList",
  initialState: {
    currentPlayList: JSON.parse(window.localStorage.getItem("currentPlayList") || "[]"),
  },
  reducers: {
    addCurrentPlayList(state, { payload }) {
      state.currentPlayList.push(...payload);
    },

    resetCurrentPlayList(state, { payload }) {
      state.currentPlayList = payload;
    },
  },
});

export const { addCurrentPlayList, resetCurrentPlayList } = playListSlice.actions;

export default playListSlice.reducer;
