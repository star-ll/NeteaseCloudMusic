import request from "../../utils/request";

export const loginByPhone = (url, data) => request(url, "post", data);
