import request from "../../utils/request";

export const findRecommendSongSheet = (params) => request("/personalized/", "get", params);

export const findNewSong = (params) => request("/personalized/newsong/", "get", params);

export const findTopPlayList = (params) => request("/top/playlist/", "get", params);
