import {
  Dispatch,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { useJwt } from "react-jwt";
import { LogoutOptionsType } from "../services/auth";
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
  social: Social;
  errorStep?: number;
};

export type UserStateType = User | null;

type TypeAuth = {
  token: string | null;
  user: UserStateType;
  login: ({ user, token }: { user: User; token: string }) => void;
  logout: (options?: LogoutOptionsType) => void;
};

type UserPayload = {
  type: "LOGIN" | "REGISTER";
  payload: { user: User; token: string };
};

type LogoutPayload = {
  type: "LOGOUT";
};
let initialState: TypeAuth = {
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
};

type ActionType = UserPayload | LogoutPayload;
const localUser = localStorage.getItem("user");
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
    case "LOGIN": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "REGISTER": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "LOGOUT": {
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
  const token = localStorage.getItem("token");
  const [state, dispatch] = useReducer(reducer, initialState);
  const { decodedToken, isExpired } = useJwt(token || "");
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    location.href = "/";
  }, []);

  const login = useCallback(
    ({ user, token }: { user: User; token: string }) => {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: "LOGIN",
        payload: {
          user,
          token,
        },
      });
    },
    []
  );

  useEffect(() => {
    if (decodedToken && isExpired) {
      logout();
    }
  }, [decodedToken, isExpired]);
  const context = {
    ...state,
    login,
    logout,
    dispatch,
  };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
