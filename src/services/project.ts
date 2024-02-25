import downloadjs from 'downloadjs';
import { AxiosResponse, isAxiosError } from 'axios';
import {
  FailedResponse,
  Project,
  ProjectListData,
  ProjectResponseType,
  SuccessResponse,
} from '../types';
import { ProjectDetailType } from '../pages/ProjectDetail/ProjectDetail';
import { baseURL } from '../constants';
import http from '../utils/http';

const token = localStorage.getItem('token');

export const downloadProject = (id: string) => {
  let filename: string;
  // dispatch({ type: 'SET_PROGRESS', data: 0 });
  // dispatch({ type: 'SET_DOWNLOAD', data: true });
  return fetch(`${baseURL}/api/download-project/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (res) => {
      var reader = res?.body?.getReader();
      if (!reader) return;
      const chunks: Uint8Array[] = [];
      const contentType = res.headers.get('Content-Type')!;
      filename = res.headers.get('Content-Disposition')!;
      filename = filename?.split(`=`)[1];
      const length = +res.headers.get('content-length')!;
      var receivedLength = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          // dispatch({ type: 'SET_PROGRESS', data: 100 });
          // dispatch({ type: 'SET_DOWNLOAD', data: false });
          break;
        }
        const payload = { detail: { receivedLength, length, done } };
        const onProgress = new CustomEvent('fetch-progress', payload);
        new CustomEvent('fetch-finished', payload);
        chunks.push(value);
        receivedLength += value.length;
        window.dispatchEvent(onProgress);
      }
      if (contentType.includes('application/json')) {
        const encoder = new TextDecoder();
        const u8arr = new Uint8Array(...chunks);
        const view = encoder.decode(u8arr);
        return JSON.parse(view);
      }
      return new Blob([...chunks], { type: 'application/zip' });
    })
    .then((body) => {
      if (body.type === 'error') {
        return body;
      }
      downloadjs(body, filename, 'application/octet-stream');
    })
    .catch((error) => {
      if (error instanceof Error)
        return { type: 'error', error: true, message: error.message };
      return {
        type: 'error',
        error: true,
        message: 'Unexpected error occured',
      };
    });
};

export const cloneProject = async (
  id: string
): Promise<SuccessResponse<Project> | FailedResponse> => {
  try {
    const response: ProjectResponseType = await http.post(`/api/project/${id}`);
    return response.data as SuccessResponse<Project>;
  } catch (error) {
    if (isAxiosError(error)) {
      return { type: 'error', error: true, ...error.response!.data };
    }
    return {
      type: 'error',
      error: true,
      message: 'Unexpected error has been occured',
    };
  }
};

export const deleteProject = async (
  id: string
): Promise<SuccessResponse<{}> | FailedResponse> => {
  try {
    const response: ProjectResponseType = await http.delete(
      `/api/project/${id}`
    );
    return response.data as SuccessResponse<{}>;
  } catch (error) {
    if (isAxiosError(error)) {
      return { type: 'error', error: true, ...error.response!.data };
    }
    return {
      type: 'error',
      error: true,
      message: 'Unexpected error has been occured',
    };
  }
};

export const fetchProjectList = async (): Promise<
  SuccessResponse<ProjectListData[]> | FailedResponse
> => {
  try {
    const response: AxiosResponse<
      SuccessResponse<ProjectListData[]> | FailedResponse
    > = await http.get('/api/project-list');
    return response.data as SuccessResponse<ProjectListData[]>;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return {
        error: true,
        ...(error?.response?.data || {
          message: 'Unable to get projects list',
        }),
      };
    }
    return {
      type: 'error',
      error: true,
      message: 'Unexpected error has been occured',
    };
  }
};

export const getProject = async (id: string) => {
  try {
    const response: AxiosResponse<
      SuccessResponse<ProjectDetailType> | FailedResponse
    > = await http.get(`/api/project/${id}`);
    return response.data as SuccessResponse<ProjectDetailType>;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return {
        error: true,
        ...(error?.response?.data || {
          message: 'Unable to get project details',
        }),
      };
    }
    return {
      type: 'error',
      error: true,
      message: 'Unable to get project details',
    };
  }
};

export const getProjects = async ({
  pageNo,
  limit,
}: {
  pageNo: number;
  limit: number;
}): Promise<
  (SuccessResponse<Project[]> & { totalCount: number }) | FailedResponse
> => {
  try {
    const response: AxiosResponse<
      (SuccessResponse<Project[]> & { totalCount: number }) | FailedResponse
    > = await http.get(`/api/projects?pageNo=${pageNo}&limit=${limit}`);
    return response.data as SuccessResponse<Project[]> & { totalCount: number };
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return {
        error: true,
        ...(error?.response?.data || {
          message: 'Unable to get projects',
        }),
      };
    }
    return {
      type: 'error',
      error: true,
      message: 'Unable to get projects',
    };
  }
};

export const addProject = async (
  data: FormData
): Promise<SuccessResponse<Project & { code: string }> | FailedResponse> => {
  try {
    const response: AxiosResponse<SuccessResponse<Project> | FailedResponse> =
      await http.post(`/api/add-project`, {
        data,
      });
    return response.data as SuccessResponse<Project & { code: string }>;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return {
        error: true,
        ...(error?.response?.data || {
          message: 'Unable to get project details',
        }),
      };
    }
    return {
      type: 'error',
      error: true,
      message: 'Unable to get project details',
    };
  }
};

export const addExe = async (
  data: FormData
): Promise<SuccessResponse<Project & { code: string }> | FailedResponse> => {
  try {
    const response: AxiosResponse<SuccessResponse<Project> | FailedResponse> =
      await http.post(`/api/add-exe`, {
        data,
      });
    return response.data as SuccessResponse<Project & { code: string }>;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return {
        error: true,
        ...(error?.response?.data || {
          message: 'Unable to get project details',
        }),
      };
    }
    return {
      type: 'error',
      error: true,
      message: 'Unable to get project details',
    };
  }
};

export const changeProjectVisibility = async (
  id: string,
  visibility: boolean
): Promise<SuccessResponse<Project> | FailedResponse> => {
  try {
    const response: AxiosResponse<SuccessResponse<Project> | FailedResponse> =
      await http.post(`/api/set-privacy/${id}`, {
        visibility,
      });
    return response.data as SuccessResponse<Project>;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return {
        error: true,
        ...(error?.response?.data || {
          message: 'Unable to update project visibility',
        }),
      };
    }
    return {
      type: 'error',
      error: true,
      message: 'Unexpected error has been occured',
    };
  }
};
