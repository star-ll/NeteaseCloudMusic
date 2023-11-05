import request from "../../utils/request";

export const loginByPhone = (phone, password) =>
  request("/login/cellphone", "post", { phone, password });
