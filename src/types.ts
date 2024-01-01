export type SuccessResponse<Data> = {
  data: Data;
  type: "success";
  status: number;
  message: string;
};

export type FailedResponse = {
  type: "error";
  error: true;
  status?: number;
  message: string;
};
