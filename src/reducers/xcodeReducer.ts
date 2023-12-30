type TypeSetDownload = {
  type: "SET_DOWNLOAD";
  data: boolean;
};

type TypeSetProgress = {
  type: "SET_PROGRESS";
  data: number;
};

export type XcodeReducerActionType = TypeSetDownload | TypeSetProgress;

const xcodeReducer = <T>(state: T, action: XcodeReducerActionType) => {
  switch (action.type) {
    case "SET_DOWNLOAD":
      return { ...state, showDownload: action.data };
    case "SET_PROGRESS":
      return { ...state, progress: action.data };
    default:
      return { ...state };
  }
};

export default xcodeReducer;
