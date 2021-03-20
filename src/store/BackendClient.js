import axios from "axios";
import urls from "./urls.json";

export default class BackendClient {
  constructor(service) {
    const serviceInfo = urls[service];
    if (serviceInfo) {
      Object.entries(serviceInfo).forEach(([method, url]) => {
        this[method] = serviceCallFactory({ method, url });
      });
    } else {
      throw new Error(
        `Unable to find service info for "${service}" in urls.json`
      );
    }
  }
}

function serviceCallFactory({ method, url }) {
  method =
    { get: "get", create: "post", patch: "post", find: "post" }[method] ||
    method;
  return async ({ data, headers }) => {
    const response = await axios({
      url,
      method,
      [method !== "get" ? "data" : "params"]: data,
      headers,
    });
    return response;
  };
}
