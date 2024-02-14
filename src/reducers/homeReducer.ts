import { Project } from '../types';

type TypeSetProject = {
  type: 'SET_PROJECTS';
  data: Project[];
};

type TypeSetPageNo = {
  type: 'SET_PAGE_NO';
  data: number;
};

type TypeSetLimit = {
  type: 'SET_LIMIT';
  data: number;
};

type TypeSetFilterTag = {
  type: 'SET_FILTER_TAG';
  data: string;
};

type TypeSetFilterCount = {
  type: 'SET_FILTER_COUNT';
  data: number;
};

type TypeSetTotalProjects = {
  type: 'SET_TOTAL_PROJECTS';
  data: number;
};

type TypeSetNoData = {
  type: 'SET_NO_DATA';
  data: boolean;
};

type TypeSetLoading = {
  type: 'SET_LOADING';
  data: boolean;
};

type TypeSetDownload = {
  type: 'SET_DOWNLOAD';
  data: boolean;
};

type TypeSetProgress = {
  type: 'SET_PROGRESS';
  data: number;
};
export type HomeReducerActionType =
  | TypeSetProject
  | TypeSetPageNo
  | TypeSetLimit
  | TypeSetFilterTag
  | TypeSetFilterCount
  | TypeSetTotalProjects
  | TypeSetNoData
  | TypeSetLoading
  | TypeSetDownload
  | TypeSetProgress;

const homeReducer = <T>(state: T, action: HomeReducerActionType): T => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return { ...state, projects: action.data };
    case 'SET_PAGE_NO':
      return { ...state, pageNo: action.data };
    case 'SET_LIMIT':
      return { ...state, limit: action.data };
    case 'SET_FILTER_TAG':
      return { ...state, filterTags: action.data };
    case 'SET_FILTER_COUNT':
      return { ...state, filterCount: action.data };
    case 'SET_TOTAL_PROJECTS':
      return { ...state, totalProjects: action.data };
    case 'SET_NO_DATA':
      return { ...state, nodata: action.data };
    case 'SET_DOWNLOAD':
      return { ...state, showDownload: action.data };
    case 'SET_PROGRESS':
      return { ...state, progress: action.data };
    case 'SET_LOADING':
      return { ...state, loading: action.data };
    default:
      return { ...state };
  }
};

export default homeReducer;
