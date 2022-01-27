import request from "../../utils/request";

// 热门歌单分类
export const fetchHotPlayList = () => request("/api/playlist/hot", "get");

// 歌单分类
export const fetchCatlist = () => request("/api/playlist/catlist", "get");
