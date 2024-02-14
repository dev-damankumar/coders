import sign from 'jwt-encode';
import { env } from '../utils';
import { http } from '../utils';
import { AxiosResponse, isAxiosError } from 'axios';
import { ProjectDetailType } from '../pages/ProjectDetail/ProjectDetail';
import { FailedResponse } from './auth';

export const fetchAllFile = async (
  name: string,
  projectId: string,
  prevPath: string
) => {
  try {
    return await http.post(
      '/api/fetch-all-files',
      {
        id: projectId,
        name,
        prevPath,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return { error: true, message: 'Unexpected error has been occured' };
  }
};

export type FileDetailsType<T> = {
  data: T;
  lastModified: string;
  mimeType: 'folder' | 'file' | 'image';
  prevPath: string;
  projectDetail: ProjectDetailType;
  title: string;
  type: 'success';
  name: string;
  extension: string;
  size: string;
};
export const fetchFileContent = async <T>(
  name: string,
  projectId: string,
  prevPath: string
): Promise<FileDetailsType<T> | FailedResponse> => {
  const payload = { name, prevPath };
  const jwt = sign(payload, env.REACT_APP_JWT_SECRET);
  try {
    const response: AxiosResponse<FileDetailsType<T> | FailedResponse> =
      await http.post(
        '/api/fetch-files-details',
        {
          id: projectId,
          payload: jwt,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    return response.data as FileDetailsType<T>;
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, type: 'error', ...error.response!.data };
    }
    return {
      error: true,
      type: 'error',
      message: 'Unexpected error has been occured',
    };
  }
};

export const createFile = async (
  fileName: string,
  projectId: string,
  prevPath: string,
  isFolder: boolean = false
) => {
  const payload = {
    type: 'create',
    prevPath,
    fileName,
    isFolder,
  };
  const jwt = sign(payload, env.REACT_APP_JWT_SECRET);
  //   loader.show();
  try {
    const response = await http.post(
      `/api/new-file/?id=${projectId}`,
      { payload: jwt },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return { error: true, message: 'Unexpected error has been occured' };
  }
};

export const saveFile = async (
  file: string,
  projectId: string,
  prevPath: string,
  data: string
) => {
  const payload = {
    data: data,
    prevPath: prevPath,
    fileName: file,
  };
  const jwt = sign(payload, env.REACT_APP_JWT_SECRET);
  //   loader.show();
  try {
    return await http.post(
      '/api/save-file',
      {
        id: projectId,
        payload: jwt,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return { error: true, message: 'Unexpected error has been occured' };
  }
};

export const uploadFile = async (
  file: File,
  projectId: string,
  prevPath: string
) => {
  const formData = new FormData();
  formData.append('id', projectId);
  formData.append('type', 'upload');
  formData.append('prevPath', prevPath);
  formData.append('file', file);

  try {
    const response = await http.post('/api/new-file/', formData, {
      params: {
        id: projectId,
        prevPath,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return { error: true, message: 'Unexpected error has been occured' };
  }
};

export const copyFile = async (
  source: string,
  destination: string,
  projectId: string,
  isFolder: boolean,
  method: 'cut' | 'copy'
) => {
  const payload = {
    type: 'create',
    source,
    destination,
    isFolder,
    method,
  };
  const jwt = sign(payload, env.REACT_APP_JWT_SECRET);
  // loader.show();
  try {
    return await http.post(
      '/api/copy-file/',
      {
        id: projectId,
        payload: jwt,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return { error: true, message: 'Unexpected error has been occured' };
  }
};

export const renameFile = async (
  path: string,
  projectId: string,
  oldfileName: string,
  newfileName: string
) => {
  const payload = {
    pathArray: path,
    oldfileName,
    newfileName,
  };
  const jwt = sign(payload, env.REACT_APP_JWT_SECRET);
  try {
    return await http.post(
      '/api/rename-file/',
      {
        id: projectId,
        payload: jwt,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return { error: true, message: 'Unexpected error has been occured' };
  }
};

export const deleteSingleFile = async (
  name: string,
  projectId: string,
  prevPath: string
) => {
  const payload = { name, prevPath: prevPath };
  const jwt = sign(payload, env.REACT_APP_JWT_SECRET);
  try {
    return await http.post(
      '/api/delete-file/',
      {
        id: projectId,
        payload: jwt,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return { error: true, message: 'Unexpected error has been occured' };
  }
};

export const deleteMultiFiles = async (
  deletefiles: { name: string; type: 'file' | 'folder' }[],
  projectId: string,
  prevPath: string
) => {
  const payload = {
    files: deletefiles,
    prevPath: prevPath,
  };
  const jwt = sign(payload, env.REACT_APP_JWT_SECRET);
  try {
    // loader.show();
    const response = await http.post(
      '/api/delete-files/',
      {
        id: projectId,
        payload: jwt,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return { error: true, message: 'Unexpected error has been occured' };
  }
};
