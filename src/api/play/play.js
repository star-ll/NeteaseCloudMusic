import { request } from "../../utils/index";

// 获取歌曲播放地址
export const fetchPlayUrl = (params) => request("/song/url", "get", params);

// 获取歌曲详情
export const fetchPlayDetail = (params) => request("/song/detail", "get", params);

// 获取歌词
export const fetchSongLyric = (id) => request("/lyric", "get", { id });
