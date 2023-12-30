function queryParams(obj: any) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

function setDefaults(obj: object) {
  if (typeof obj !== "object") {
    return {};
  }
  return obj;
}

function sendReq(url: string, body: any, options) {
  let token = localStorage.getItem("token");
  let methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
  let { headers, params, method, formData } = options;
  if (!methods.includes(method)) method = "GET";

  headers = setDefaults(headers);
  params = queryParams(setDefaults(params));
  body = setDefaults(body);
  url = `${url}${params ? `?${params}` : ""}`;

  let headerData = { ...headers };
  if (token) {
    headerData.Authorization = `Bearer ${token}`;
  }

  let payload = {
    method: method,
  };
  if (Object.keys(headerData).length > 0) {
    payload["headers"] = headerData;
  }
  if (
    method === "POST" ||
    method === "PUT" ||
    method === "PATCH" ||
    method === "DELETE"
  ) {
    if (formData) {
      payload["body"] = body;
    } else {
      payload["body"] = JSON.stringify(body);
    }
  }
  return fetch(url, payload)
    .then(async (res) => {
      let contentType = res.headers.get("Content-Type");
      let status = res.status;
      let data;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await res.json();
        return data;
      } else if (
        (contentType && contentType.indexOf("image") !== -1) ||
        (contentType && contentType.indexOf("audio") !== -1) ||
        (contentType && contentType.indexOf("video") !== -1)
      ) {
        data = await res.blob();
        return data;
      } else {
        data = await res.text();
        return data;
      }
    })
    .catch((err) => {
      console.log("hxvkdshg");
      return err;
    });
}

const Http = () => {
  let http = {
    get: async (url: string, options = {}) => {
      if (!options) options = {};
      options["method"] = "GET";
      return sendReq(url, {}, options);
    },
    post: async (url, body, options) => {
      if (!options) options = {};
      options["method"] = "POST";
      return sendReq(url, body, options);
    },
    put: async (url, body, options) => {
      if (!options) options = {};
      options["method"] = "PUT";
      return sendReq(url, body, options);
    },
    patch: async (url, body, options) => {
      if (!options) options = {};
      options["method"] = "PATCH";
      return sendReq(url, body, options);
    },
    delete: async (url, body, options) => {
      if (!options) options = {};
      options["method"] = "DELETE";
      return sendReq(url, body, options);
    },
    intersepters: (options) => {},
  };
  return http;
};

export default Http;
