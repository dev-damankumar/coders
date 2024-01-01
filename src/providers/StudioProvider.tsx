import {
  Dispatch,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";

type SideViewType = "left" | "right";
type TypeStudio = {
  sidebar: {
    isOpen?: boolean;
    view?: SideViewType;
    toggle: () => void;
    open: () => void;
    close: () => void;
    changeView: (direction: SideViewType) => void;
  };
};

type SideBarPayload = {
  type: "SIDEBAR_OPEN" | "SIDEBAR_CLOSE";
};

type SideBarViewPayload = {
  type: "SIDEBAR_VIEW";
  payload: SideViewType;
};

let initialState: TypeStudio = {
  sidebar: {
    isOpen: false,
    view: "left",
    toggle: () => {},
    open: () => {},
    close: () => {},
    changeView: () => {},
  },
};

type ActionType = SideBarPayload | SideBarViewPayload;

const localSidebar = localStorage.getItem("sidebar");
if (localSidebar) {
  initialState = {
    ...initialState,
    sidebar: JSON.parse(localSidebar),
  };
}
console.log("initialState", initialState);
const StudioContext = createContext(initialState);

export type UserContextType = TypeStudio & { dispatch: Dispatch<ActionType> };

export const useStudio = () => {
  return useContext(StudioContext) as UserContextType;
};
const reducer = (
  state: TypeStudio = initialState,
  action: ActionType
): TypeStudio => {
  switch (action.type) {
    case "SIDEBAR_OPEN": {
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          isOpen: true,
        },
      };
    }
    case "SIDEBAR_CLOSE": {
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          isOpen: false,
        },
      };
    }
    case "SIDEBAR_VIEW": {
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          view: action.payload,
        },
      };
    }
    default:
      return state;
  }
};

export const StudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleSidebar = useCallback(() => {
    if (state.sidebar.isOpen) {
      dispatch({ type: "SIDEBAR_CLOSE" });
    } else {
      dispatch({ type: "SIDEBAR_OPEN" });
    }
  }, [state.sidebar.isOpen]);

  const openSidebar = useCallback(() => {
    dispatch({ type: "SIDEBAR_OPEN" });
  }, []);

  const closeSidebar = useCallback(() => {
    dispatch({ type: "SIDEBAR_CLOSE" });
  }, []);

  const changeView = (direction: SideViewType) => {
    dispatch({ type: "SIDEBAR_VIEW", payload: direction });
    localStorage.setItem(
      "sidebar",
      JSON.stringify({
        ...state,
        ...state.sidebar,
        view: direction,
      })
    );
  };

  const context = {
    ...state,
    sidebar: {
      ...state.sidebar,
      toggle: toggleSidebar,
      open: openSidebar,
      close: closeSidebar,
      changeView,
    },
    dispatch,
  };
  return (
    <StudioContext.Provider value={context}>{children}</StudioContext.Provider>
  );
};
