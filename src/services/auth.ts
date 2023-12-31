import { AxiosResponse, isAxiosError } from "axios";
import { net } from "../helpers";
import { RegisterUserType } from "../models/onboard/registerForm";
import { User } from "../providers/Auth";
import { IRegisterFormInput } from "../pages/Register/Register";

export type SuccessResponse = {
  user: User;
  type: "success";
  status: string;
  message: string;
};

type LoginSuccessResponse = {
  token: string;
  user: User;
  type: "success";
  status: string;
  message: string;
};

export type FailedResponse = {
  type?: "error";
  error: true;
  status?: string;
  message: string;
};
export const login = async (email: string, password: string) => {
  //   loader.show();
  try {
    const response: AxiosResponse<LoginSuccessResponse | FailedResponse> =
      await net.post(
        "/api/login",
        {
          email: email.toLowerCase(),
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    return response.data as LoginSuccessResponse;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return { error: true, message: "Unexpected error occured" };
  }
};

export type LogoutOptionsType = {
  redirect?: boolean;
} | null;

export const logout = async (options?: LogoutOptionsType) => {
  try {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    if (options?.redirect) {
      window.location.href = "/login";
    }
    //   loader.show();
    //   setTimeout(() => {
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("user");
    //     window.location.href = `/login`;
    //     setAuth(false);
    //     loader.hide();
    //   }, 1000);
  } catch (error: unknown) {
    if (error instanceof Error) return { error: true, message: error.message };
    return { error: true, message: "Unexpected error occured" };
  }
};

export const register = async (
  user: IRegisterFormInput
): Promise<SuccessResponse | FailedResponse> => {
  try {
    const response: AxiosResponse<SuccessResponse | FailedResponse> =
      await net.post("/api/signup", user);
    return response.data as SuccessResponse;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return { error: true, message: "registration failed" };
  }
};

export const registerProfile = async (
  userProfileData: FormData
): Promise<SuccessResponse | FailedResponse> => {
  try {
    const response: AxiosResponse<SuccessResponse | FailedResponse> =
      await net.post("/api/register-profile", userProfileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    return response.data as SuccessResponse;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return { error: true, message: "registration failed" };
  }
};

export const forgotPassword = async (email: string) => {
  try {
    return await net.post(
      "/api/forgot-password",
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return { error: true, message: "Unexpected error has been occured" };
  }
};

export const resetPassword = async (password: string, token: string) => {
  try {
    return await net.post(
      "/api/reset-password",
      { password, token },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return { error: true, message: "Unexpected error has been occured" };
  }
};

export const socialLogin = async (user: RegisterUserType) => {
  try {
    return await net.post("/api/social-login", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return { error: true, message: "Unexpected error has been occured" };
  }
};

export const socialSignUp = async (user: RegisterUserType) => {
  try {
    return await net.post("/api/social-signup", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return { error: true, message: "Unexpected error has been occured" };
  }
};

export const unsubscribe = async () => {
  try {
    return await net.post(
      "/api/unsubscribe",
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return { error: true, message: "Unexpected error has been occured" };
  }
};

export const isValidResetToken = async (token: string) => {
  try {
    return await net.post(
      "/api/is-valid-reset-token",
      {
        token: token,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return { error: true, message: "Unexpected error has been occured" };
  }
};
