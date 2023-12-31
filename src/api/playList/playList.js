import { request } from "../../utils";

//获取歌单所有歌曲
export const fetchAllPlayList = ({ id, limit, offset = 0 }) =>
  request("/playlist/track/all", "get", {
    id,
    limit,
    offset,
  });

// 获取歌单详情
export const fetchPlayListDetail = (params) => request("/playlist/detail", "get", params);
