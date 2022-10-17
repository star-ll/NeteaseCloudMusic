import { request } from "../../utils";

//获取歌单所有歌曲
export const fetchAllPlayList = ({ id, limit, offset = 0 }) =>
	request("/api/playlist/track/all", "get", {
		id,
		limit,
		offset,
	});

// 获取歌单详情
export const fetchPlayListDetail = (params) =>
	request("/api/playlist/detail", "get", params);
