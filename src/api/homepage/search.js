import request from "../../utils/request";

// 热门歌单分类
export const fetchSearchResult = (params) =>
	request("/api/cloudsearch", "get", params);
