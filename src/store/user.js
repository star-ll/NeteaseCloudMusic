import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token"),
    userInfo: {},
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", state.token);
    },
    clearToken(state) {
      state.token = "";
      localStorage.removeItem("token");
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const { setToken, clearToken, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
