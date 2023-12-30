import React, { createContext, useContext, useReducer } from "react";
import Message from "../components/Message";
import { v4 as uuidv4 } from "uuid";

export type NotificationTypes = "success" | "error" | "warning";
export type Notification = {
  id: string;
  message: string;
  type?: NotificationTypes;
  hold?: boolean;
};

type CustomNotification = {
  list: Notification[];
  add: (props: AddMessageToNotification) => void;
  remove: (id: string) => void;
};
const NotificationContext = createContext({});

export const useNotification = () => {
  return useContext(NotificationContext) as CustomNotification;
};
type AddActionType = {
  type: "ADD";
  payload: Notification;
};

type RemoveActionType = {
  type: "REMOVE";
  payload: { id: string };
};

type ActionType = AddActionType | RemoveActionType;

export type AddMessageToNotification = {
  message: string;
  type?: NotificationTypes;
  hold?: boolean;
};
const reducer = (state: Notification[] = [], action: ActionType) => {
  switch (action.type) {
    case "ADD": {
      return [...state, { ...action.payload }];
    }
    case "REMOVE": {
      const index = state.findIndex((v) => v.id === action.payload.id);
      const tempState = [...state];
      if (index > -1) {
        tempState.splice(index, 1);
      }
      return tempState;
    }
    default:
      return state;
  }
};
export const NotificationProvider = React.memo(
  ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, []);
    const addMessageToNotification = ({
      message,
      type,
      hold = false,
    }: AddMessageToNotification) => {
      const id = uuidv4();
      dispatch({
        type: "ADD",
        payload: { id, message, hold, type },
      });
      if (!hold) {
        setTimeout(() => {
          dispatch({
            type: "REMOVE",
            payload: { id },
          });
        }, 5000);
      }
    };

    const removeMessageToNotification = (id: string) => {
      dispatch({
        type: "REMOVE",
        payload: { id },
      });
    };
    const context = {
      list: state,
      add: addMessageToNotification,
      remove: removeMessageToNotification,
    };
    return (
      <NotificationContext.Provider value={context}>
        {children}
        <Message list={state} />
      </NotificationContext.Provider>
    );
  }
);
