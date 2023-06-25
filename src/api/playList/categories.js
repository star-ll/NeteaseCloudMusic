import request from "../../utils/request";

// 热门歌单分类
export const fetchHotPlayList = () => request("/playlist/hot", "get");

// 歌单分类
export const fetchCatlist = () => request("/playlist/catlist", "get");
