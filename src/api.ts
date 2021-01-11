import axios, { Method } from "axios";

const instance = axios.create({
  baseURL: "http://192.168.10.235:3000/api/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000,
});

const request = (method: Method, url: string, value?: string) => {
  return instance(url, {
    method: method,
    data: { data: value },
  });
};

const api = {
  getValue: () => request("GET", "random"),
  getState: () => request("GET", "state"),
  putState: (state: "on" | "off") => request("PUT", "state", state),
};

export default api;
