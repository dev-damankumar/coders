import {
  Dispatch,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { useJwt } from 'react-jwt';
import { LogoutOptionsType } from '../services/auth';
export type Social = {
  facebook: string;
  github: string;
  linkedin: string;
  instagram: string;
  website: string;
  youtube: string;
};
export type User = {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  active: boolean;
  address: string;
  city: string;
  country: string;
  type: 1 | 2 | 3;
  image: string;
  cover: string;
  mobile: number;
  profileCompletion: number;
  socials: Social;
  errorStep?: number;
};

export type PublicUser = {
  username: string;
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  country: string;
  mobile: number;
  socials: Social;
};

export type UserStateType = User | null;

type TypeAuth = {
  token: string | null;
  user: UserStateType;
  login: ({ user, token }: { user: User; token: string }) => void;
  logout: (options?: LogoutOptionsType) => void;
  setSocials: (_: Social) => void;
  setUser: (_: PublicUser) => void;
};

type UserPayload = {
  type: 'LOGIN' | 'REGISTER';
  payload: { user: User; token: string };
};

type SetUserPayload = {
  type: 'SET_USER';
  payload: PublicUser;
};

type SetUsersSocialLinkPayload = {
  type: 'SET_SOCIAL';
  payload: Social;
};

type LogoutPayload = {
  type: 'LOGOUT';
};
let initialState: TypeAuth = {
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  setSocials: (_: Social) => {},
  setUser: (_: PublicUser) => {},
};

type ActionType =
  | UserPayload
  | LogoutPayload
  | SetUserPayload
  | SetUsersSocialLinkPayload;
const localUser = localStorage.getItem('user');
if (localUser) {
  initialState = {
    ...initialState,
    user: JSON.parse(localUser),
  };
}

const AuthContext = createContext(initialState);

export type UserContextType = TypeAuth & { dispatch: Dispatch<ActionType> };

export const useAuth = () => {
  return useContext(AuthContext) as UserContextType;
};
const reducer = (
  state: TypeAuth = initialState,
  action: ActionType
): TypeAuth => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'SET_SOCIAL': {
      if (state.user)
        return {
          ...state,
          user: {
            ...state.user,
            socials: action.payload,
          },
        };
      return state;
    }
    case 'SET_USER': {
      if (state.user)
        return {
          ...state,
          user: {
            ...state.user,
            ...action.payload,
          },
        };
      return state;
    }
    case 'REGISTER': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        user: null,
        token: null,
      };
    }
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  const [state, dispatch] = useReducer(reducer, initialState);
  const { decodedToken, isExpired } = useJwt(token || '');
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    location.href = '/';
  }, []);

  const login = useCallback(
    ({ user, token }: { user: User; token: string }) => {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
          token,
        },
      });
    },
    []
  );
  const setSocials = useCallback((socials: Social) => {
    const user = structuredClone(state.user);
    if (user) {
      user.socials = {
        ...user?.socials,
        ...socials,
      };
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: 'SET_USER',
        payload: user,
      });
    }
  }, []);

  const setUser = useCallback((profile: PublicUser) => {
    const user = {
      ...structuredClone(state.user),
      ...profile,
    };
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({
      type: 'SET_USER',
      payload: user,
    });
  }, []);

  useEffect(() => {
    if (decodedToken && isExpired) {
      logout();
    }
  }, [decodedToken, isExpired]);
  const context = {
    ...state,
    login,
    logout,
    setSocials,
    dispatch,
    setUser,
  };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
