import { AxiosResponse, isAxiosError } from 'axios';
import http from '../utils/http';
import { RegisterUserType } from '../models/onboard/registerForm';
import { User } from '../providers/Auth';
import { IRegisterFormInput } from '../pages/Register/Register';

export type SuccessResponse = {
  type: 'success';
  status: string;
  message: string;
};

export type RegisterSuccessResponse = SuccessResponse & {
  user: User;
  type: 'success';
  status: string;
  message: string;
};

type LoginSuccessResponse = {
  token: string;
  user: User;
  type: 'success';
  status: string;
  message: string;
};

export type FailedResponse = {
  type: 'error';
  error: true;
  status?: string;
  message: string;
};
export const login = async (email: string, password: string) => {
  //   loader.show();
  try {
    const response: AxiosResponse<LoginSuccessResponse | FailedResponse> =
      await http.post(
        '/api/login',
        {
          email: email.toLowerCase(),
          password: password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    return response.data as LoginSuccessResponse;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return { error: true, type: 'error', ...error.response!.data };
    }
    return { error: true, message: 'Unexpected error occured' };
  }
};

export type LogoutOptionsType = {
  redirect?: boolean;
} | null;

export const logout = async (options?: LogoutOptionsType) => {
  try {
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    if (options?.redirect) {
      window.location.href = '/login';
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
    if (error instanceof Error)
      return { error: true, type: 'error', message: error.message };
    return { error: true, type: 'error', message: 'Unexpected error occured' };
  }
};

export const register = async (
  user: IRegisterFormInput
): Promise<RegisterSuccessResponse | FailedResponse> => {
  try {
    const response: AxiosResponse<RegisterSuccessResponse | FailedResponse> =
      await http.post('/api/signup', user);
    return response.data as RegisterSuccessResponse;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return { error: true, type: 'error', ...error.response!.data };
    }
    return { error: true, type: 'error', message: 'registration failed' };
  }
};

export const registerProfile = async (
  userProfileData: FormData
): Promise<RegisterSuccessResponse | FailedResponse> => {
  try {
    const response: AxiosResponse<RegisterSuccessResponse | FailedResponse> =
      await http.post('/api/register-profile', userProfileData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

    return response.data as RegisterSuccessResponse;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return { error: true, type: 'error', ...error.response!.data };
    }
    return { error: true, type: 'error', message: 'registration failed' };
  }
};

export const forgotPassword = async (
  email: string
): Promise<SuccessResponse | FailedResponse> => {
  try {
    const response = await http.post(
      '/api/forgot-password',
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data as SuccessResponse;
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, type: 'error', ...error.response!.data };
    }
    return {
      error: true,
      type: 'error',
      message: 'Unexpected error has been occured',
    };
  }
};

export const resetPassword = async (password: string, token: string) => {
  try {
    return await http.post(
      '/api/reset-password',
      { password, token },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, type: 'error', ...error.response!.data };
    }
    return {
      error: true,
      type: 'error',
      message: 'Unexpected error has been occured',
    };
  }
};

export const socialLogin = async (user: RegisterUserType) => {
  try {
    return await http.post('/api/social-login', user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, type: 'error', ...error.response!.data };
    }
    return {
      error: true,
      type: 'error',
      message: 'Unexpected error has been occured',
    };
  }
};

export const socialSignUp = async (user: RegisterUserType) => {
  try {
    return await http.post('/api/social-signup', user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, type: 'error', ...error.response!.data };
    }
    return {
      error: true,
      type: 'error',
      message: 'Unexpected error has been occured',
    };
  }
};

export const unsubscribe = async () => {
  try {
    return await http.post(
      '/api/unsubscribe',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, type: 'error', ...error.response!.data };
    }
    return {
      error: true,
      type: 'error',
      message: 'Unexpected error has been occured',
    };
  }
};

export const isValidResetToken = async (
  token: string
): Promise<SuccessResponse | FailedResponse> => {
  try {
    const response = await http.post(
      '/api/is-valid-reset-token',
      {
        token: token,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data as SuccessResponse;
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, type: 'error', ...error.response!.data };
    }
    return {
      error: true,
      type: 'error',
      message: 'Unexpected error has been occured',
    };
  }
};
