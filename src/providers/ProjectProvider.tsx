import {
  Dispatch,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import { Project } from '../types';

export type ExtentedProject = Project & {
  loading?: boolean;
  error?: string | null;
};
type TypeProject = {
  error: string | null;
  projects: {
    loading: boolean;
    list: ExtentedProject[];
    count: number;
    total: number;
    set: (projects: Project[]) => void;
    setLoading: () => void;
    setTotal: (_: number) => void;
  };
  project: {
    loading: boolean;
    add: (project: Project) => Project | void;
    delete: (id: string) => Project | void;
    duplicate: (id: string) => Project | void;
    setLoading: (id: string) => void;
  };
};

let initialState: TypeProject = {
  error: null,
  projects: {
    loading: false,
    list: [],
    count: 0,
    total: 0,
    set: (_) => {},
    setLoading: () => {},
    setTotal: () => {},
  },
  project: {
    loading: false,
    add: (_) => {},
    setLoading: (id: string) => {},
    delete: (_) => {},
    duplicate: (_) => {},
  },
};

type SetProjects = {
  type: 'SET_PROJECTS';
  payload: ExtentedProject[];
};

type AppendProjects = {
  type: 'APPEND_PROJECTS';
  payload: Project[];
};

type AddProject = {
  type: 'ADD_PROJECTS';
  payload: Project;
};

type DeleteProject = {
  type: 'DELETE_PROJECT';
  payload: { id: string };
};

type LoadingProject = {
  type: 'SET_PROJECT_LOADING';
  payload: { id: string };
};

type LoadingProjects = {
  type: 'SET_PROJECTS_LOADING';
};

type SetTotalProjects = {
  type: 'SET_TOTAL_PROJECTS';
  payload: number;
};

type ActionType =
  | SetProjects
  | AppendProjects
  | AddProject
  | DeleteProject
  | LoadingProject
  | LoadingProjects
  | SetTotalProjects;

const ProjectContext = createContext(initialState);

export type ProjectContextType = TypeProject & {
  dispatch: Dispatch<ActionType>;
};

export const useProject = () => {
  return useContext(ProjectContext) as ProjectContextType;
};
const reducer = (
  state: TypeProject = initialState,
  action: ActionType
): TypeProject => {
  switch (action.type) {
    case 'SET_PROJECTS': {
      return {
        ...state,
        projects: {
          ...state.projects,
          loading: false,
          list: action.payload,
          count: action.payload.length,
        },
      };
    }
    case 'APPEND_PROJECTS': {
      return {
        ...state,
        projects: {
          ...state.projects,
          loading: false,
          list: [...state.projects.list, ...action.payload],
          count: state.projects.count + action.payload.length,
        },
      };
    }
    case 'ADD_PROJECTS': {
      return {
        ...state,
        projects: {
          ...state.projects,
          loading: false,
          list: [...state.projects.list, { ...action.payload }],
          count: state.projects.count + 1,
        },
      };
    }
    case 'DELETE_PROJECT': {
      const projects = [...state.projects.list];
      const index = projects.findIndex((p) => p._id === action.payload.id);
      const newList = projects.splice(index, 1);
      return {
        ...state,
        project: {
          ...state.project,
          loading: false,
        },
        projects: {
          ...state.projects,
          loading: false,
          list: newList,
          count: newList.length,
        },
      };
    }
    case 'SET_PROJECTS_LOADING': {
      return {
        ...state,
        projects: {
          ...state.projects,
          loading: true,
        },
      };
    }
    case 'SET_TOTAL_PROJECTS': {
      return {
        ...state,
        projects: {
          ...state.projects,
          total: action.payload,
        },
      };
    }
    case 'SET_PROJECT_LOADING': {
      const tempProjects = [...state.projects.list];
      const project = tempProjects.find((v) => v._id === action.payload.id);
      console.log('setiting', project);
      if (project) {
        project.loading = true;
      }
      return {
        ...state,
        projects: {
          ...state.projects,
          list: tempProjects,
        },
      };
    }
    default:
      return state;
  }
};

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setProjects = useCallback((projects: Project[]) => {
    dispatch({ type: 'SET_PROJECTS', payload: projects });
  }, []);

  const appendProjects = useCallback((projects: Project[]) => {
    dispatch({ type: 'APPEND_PROJECTS', payload: projects });
  }, []);

  const addProject = useCallback((project: Project) => {
    dispatch({ type: 'ADD_PROJECTS', payload: project });
  }, []);

  const deleteProject = useCallback((id: string) => {
    dispatch({ type: 'DELETE_PROJECT', payload: { id } });
  }, []);

  const loadingProjects = useCallback(() => {
    dispatch({ type: 'SET_PROJECTS_LOADING' });
  }, []);

  const loadingProject = useCallback((id: string) => {
    dispatch({ type: 'SET_PROJECT_LOADING', payload: { id } });
  }, []);

  const setTotalProjects = useCallback((totalCount: number) => {
    dispatch({ type: 'SET_TOTAL_PROJECTS', payload: totalCount });
  }, []);

  const context = {
    ...state,
    projects: {
      ...state.projects,
      set: setProjects,
      append: appendProjects,
      setLoading: loadingProjects,
      setTotal: setTotalProjects,
    },
    project: {
      ...state.project,
      add: addProject,
      delete: deleteProject,
      setLoading: loadingProject,
    },
  };
  return (
    <ProjectContext.Provider value={context}>
      {children}
    </ProjectContext.Provider>
  );
};
