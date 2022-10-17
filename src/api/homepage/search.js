import request from "../../utils/request";

// 搜索
export const fetchSearchResult = (params) =>
	request("/api/cloudsearch", "get", params);
