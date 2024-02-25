import { ExecutableFileType } from './pages/ProjectDetail/ProjectDetail';

export type SuccessResponse<Data> = {
  data: Data;
  type: 'success';
  status: number;
  message: string;
};

export type FailedResponse = {
  type: 'error';
  error: true;
  status?: number;
  message: string;
};

export type TypeAuthor = {
  _id: string;
  username: string;
  image: string;
};

export type ProjectResponseType = {
  type: 'error' | 'success';
  message: string;
  data: any;
};

export type ProjectListData = {
  image: string;
  title: string;
  _id: string;
};

export type Project = {
  description: string;
  destination: string;
  executableFile: string;
  image: string;
  tags: string[];
  imageGrid?: string[];
  title: string;
  url: string;
  author?: TypeAuthor;
  visibility: boolean;
  _id: string;
  executables?: ExecutableFileType[];
  project?: string;
  user?: { _id: string; name: string; image: string };
};
