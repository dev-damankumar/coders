import downloadjs from "downloadjs";
import { Dispatch } from "react";
import { HomeReducerActionType } from "../reducers/homeReducer";
import { env } from "../utils";
import { Project } from "../components/Projects/Projects";
import { net } from "../helpers";
import { AxiosResponse, isAxiosError } from "axios";
import { FailedResponse, SuccessResponse } from "./auth";
import { XcodeReducerActionType } from "../reducers/xcodeReducer";

const token = localStorage.getItem("token");

type ProjectResponseType = {
  type: "error" | "success";
  message: string;
  data: any;
};

export const downloadProject = (
  id: string,
  dispatch: Dispatch<XcodeReducerActionType>
) => {
  let filename: string;
  dispatch({ type: "SET_PROGRESS", data: 0 });
  dispatch({ type: "SET_DOWNLOAD", data: true });
  return fetch(`${env["REACT_APP_BASE_URL"]}/api/download-project/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      var reader = res?.body?.getReader();
      if (!reader) return;
      const chunks: Uint8Array[] = [];
      const contentType = res.headers.get("Content-Type")!;
      filename = res.headers.get("Content-Disposition")!;
      filename = filename?.split(`=`)[1];
      const length = +res.headers.get("content-length")!;
      var receivedLength = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          dispatch({ type: "SET_PROGRESS", data: 100 });
          dispatch({ type: "SET_DOWNLOAD", data: false });
          break;
        }
        const payload = { detail: { receivedLength, length, done } };
        const onProgress = new CustomEvent("fetch-progress", payload);
        new CustomEvent("fetch-finished", payload);
        chunks.push(value);
        receivedLength += value.length;
        window.dispatchEvent(onProgress);
      }
      if (contentType.includes("application/json")) {
        const encoder = new TextDecoder();
        const u8arr = new Uint8Array(...chunks);
        const view = encoder.decode(u8arr);
        return JSON.parse(view);
      }
      return new Blob([...chunks], { type: "application/zip" });
    })
    .then((body) => {
      if (body.type === "error") {
        return body;
      }
      downloadjs(body, filename, "application/octet-stream");
    })
    .catch((error) => {
      if (error instanceof Error)
        return { error: true, message: error.message };
      return { error: true, message: "Unexpected error occured" };
    });
};

export const cloneProject = async (
  id: string,
  projects: Project[],
  dispatch: Dispatch<HomeReducerActionType>
) => {
  // loader.show();
  try {
    let project: ProjectResponseType = await net.post(`/api/project/${id}`, {
      method: "POST",
    });

    if (project.type === "error") {
      return { error: true, message: project.message };
    }
    if (project.type === "success") {
      let newProjects = [...projects];
      newProjects.push(project.data);
      dispatch({ type: "SET_PROJECTS", data: newProjects });
      return {
        project,
        success: true,
        message: "Successfully Cloned",
      };
    }
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return { error: true, message: "Unexpected error has been occured" };
  }
};

export const deleteProject = async (
  id: string,
  projects: Project[],
  dispatch: Dispatch<HomeReducerActionType>
) => {
  // loader.show();
  try {
    let project: ProjectResponseType = await net.delete(`/api/project/${id}`);

    if (project.type === "error") {
      return { error: true, message: project.message };
    }
    if (project.type === "success") {
      let newProjects = [...projects];
      newProjects = newProjects.filter((v) => {
        if (v._id !== id) return v;
      });
      dispatch({ type: "SET_PROJECTS", data: newProjects });
      return {
        project,
        success: true,
        message: "Successfully Deleted",
      };
    }
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return { error: true, message: "Unexpected error has been occured" };
  }
};

export const fetchProjectList = async () => {
  try {
    const response = await net.get("/api/project-list");
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return { error: true, message: "Unexpected error has been occured" };
  }
};

export const getProject = async (id: string) => {
  try {
    const response: AxiosResponse<SuccessResponse | FailedResponse> =
      await net.get(`/api/project/${id}`);
    return response.data as SuccessResponse;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return {
        error: true,
        ...(error?.response?.data || {
          message: "Unable to get project details",
        }),
      };
    }
    return { error: true, message: "registration failed" };
  }
};
