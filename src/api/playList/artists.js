import { request } from "../../utils";

// 获取歌手详情
export const fetchArtistHotSong = (params) => request("/artists", "get", params);

// 获取歌手详情
export const fetchArtistDetail = (params) => request("/artist/detail", "get", params);
