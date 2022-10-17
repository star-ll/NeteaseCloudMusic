import { request } from "../../utils/index";

// 获取歌曲播放地址
export const fetchPlayUrl = (params) => request("/api/song/url", "get", params);
