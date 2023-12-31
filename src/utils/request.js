class Request {
  constructor() {
    // 全局设置
    this.mode = "cors";
    this.baseUrl;
    this.credentials = "same-origin";
    // 拦截器
    this.interceptor = {
      request: null,
      response: null,
    };
  }
  create(globalConfig = {}) {
    this.baseUrl = globalConfig.baseUrl;
    this.mode = globalConfig.mode || "cors";
    this.credentials = globalConfig.credentials || "same-origin";

    return (url, method = "get", data = {}, extraConfig = {}) => {
      extraConfig.headers = extraConfig.headers || {};
      let config = { data, ...extraConfig };
      // 拼接url
      if (this.baseUrl) {
        /*  console.log(this.baseUrl,this.baseUrl.replace(/\/$/,""),
		url,url.replace(/^\//,"").replace(/\/$/,"").replace(/^api/, "")); */
        url =
          this.baseUrl.replace(/\/$/, "") +
          "/" +
          url
            .replace(/^\//, "")
            .replace(/\/$/, "")
            .replace(/^api\//, "");
      }
      return new Promise(async (resolve, reject) => {
        try {
          // 请求拦截器
          const requestCallback = this.interceptor.request;
          if (requestCallback) {
            if (typeof requestCallback !== "function") {
              throw new Error("interceptor.request必须接收一个函数");
            }
            config = await requestCallback.call(this, config);
            if (!config) {
              throw new Error("interceptor.request函数必须返回config");
            }
          }
        } catch (err) {
          reject(err);
        }

        try {
          // get请求构建参数
          if (["get", "GET".includes(method)]) {
            for (let key in data) {
              if (data[key] == null) continue;
              url += url.includes("?")
                ? `&${key}=${data[key]}`
                : `?${key}=${data[key]}`;
            }
          } else if (method.toLowerCase() === "post") {
            config.body = new FormData();
            for (const key of Object.keys(config.data)) {
              config.body.append(key, config.data[key]);
            }

            delete config.data;
          }

          let response = await fetch(url, {
            method: method,
            mode: this.mode,
            credentials: this.credentials,
            ...config,
          });

          // 响应拦截器
          const responseCallback = this.interceptor.response;
          if (responseCallback) {
            if (typeof responseCallback !== "function") {
              throw new Error("interceptor.response必须接收一个函数");
            }
            const responseResult = await responseCallback.call(this, response);
            if (responseResult) response = responseResult;
          }

          resolve(response);
        } catch (err) {
          reject(err);
        }
      });
    };
  }
}

const RequestAPi = new Request();
RequestAPi.interceptor.request = (config) => {
  // config.headers["token"] = "123";
  return config;
};
RequestAPi.interceptor.response = (response) => {
  if (response.ok) {
    return response.json();
  }
};

const request = RequestAPi.create({
  baseUrl: "https://music123-chi.vercel.app/",
  // baseUrl: import.meta.env.DEV ? "/api" : "https://music123-chi.vercel.app",
  credentials: "include",
});
export default request;
