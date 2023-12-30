import axios, {
  AxiosHeaderValue,
  AxiosHeaders,
  RawAxiosRequestHeaders,
} from "axios";
import { env } from "./utils";

type NetHeaders =
  | AxiosHeaders
  | Partial<
      RawAxiosRequestHeaders & {
        Authorization: AxiosHeaderValue;
        "Content-Length": AxiosHeaderValue;
        "Content-Encoding": AxiosHeaderValue;
        Accept: AxiosHeaderValue;
        "User-Agent": AxiosHeaderValue;
      } & {}
    >
  | undefined;
const token = localStorage.getItem("token");
const defaultHeaders: NetHeaders = {};
if (token) {
  defaultHeaders.Authorization = `Bearer ${token}`;
}

export const net = axios.create({
  baseURL: env["REACT_APP_BASE_URL"],
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
    ...defaultHeaders,
  },
});

net.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function splitPath(path: string) {
  return path.split("/");
}

export function goBackPaths(filepath: string) {
  const path = splitPath(filepath);
  path.pop();
  let newPath = path.length > 1 ? path[path.length - 1] : "";
  if (path.length > 1) path.pop();
  let newRootPath = path.join("/");
  return { prevPath: newRootPath || "/", name: newPath };
}

export function sortObjectByName(a: { name: string }, b: { name: string }) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}

export function copyToClipboard(text: string) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? true : false;
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
    throw err;
  }

  document.body.removeChild(textArea);
  return msg;
}

export const excludeFromPaths = (excudingPathArray: string[], path: string) => {
  return excudingPathArray.some((p) => {
    return path.includes(p);
  });
};
