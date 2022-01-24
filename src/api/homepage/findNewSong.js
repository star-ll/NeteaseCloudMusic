import request from "../../utils/request";

export const findRecommendSongSheet = (params) =>
	request("/api/personalized/", "get", params);

export const findNewSong = (params) =>
	request("/api/personalized/newsong/", "get", params);
