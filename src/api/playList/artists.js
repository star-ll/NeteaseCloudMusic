import { request } from "../../utils";

// 获取歌手详情
export const fetchArtistDetail = (params) =>
	request("/api/artists", "get", params);
