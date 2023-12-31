import request from "../../utils/request";

// 所有榜单内容摘要
export const fetchAllTopList = (params) => request("/toplist", "get", params);

// 所有榜单内容摘要
export const fetchAllTopListDetail = (params) => request("/toplist/detail", "get", params);

// 歌手榜
export const fetchArtistTopList = (params) => request("/toplist/artist", "get", params);
