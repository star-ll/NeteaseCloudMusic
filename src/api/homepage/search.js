import request from "../../utils/request";

// 搜索
export const fetchSearchResult = (params) => request("/cloudsearch", "get", params);
