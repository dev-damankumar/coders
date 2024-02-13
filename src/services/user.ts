import { isAxiosError } from 'axios';
import { net } from '../helpers';
import { User } from '../providers/Auth';
import { FailedResponse } from './auth';
import { SuccessResponse } from '../types';
import { TProfileInputs } from '../components/profile/SettingsForm';

export type SocialLinksType = {
  website: string;
  github: string;
  instagram: string;
  facebook: string;
  youtube: string;
  linkedin: string;
};

export const setSocials = async ({
  facebook = '',
  github = '',
  instagram = '',
  linkedin = '',
  website = '',
  youtube = '',
}: SocialLinksType): Promise<
  SuccessResponse<SocialLinksType> | FailedResponse
> => {
  try {
    const response = await net.post(
      '/api/set-socials',
      {
        socials: {
          facebook,
          github,
          instagram,
          linkedin,
          website,
          youtube,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data as SuccessResponse<SocialLinksType>;
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return {
      type: 'error',
      error: true,
      message: 'Unexpected error has been occured',
    };
  }
};

export const updateProfile = async (
  profile: FormData | TProfileInputs
): Promise<SuccessResponse<User> | FailedResponse> => {
  try {
    const response = await net.post('/api/update-profile', profile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data as SuccessResponse<User>;
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return {
      type: 'error',
      error: true,
      message: 'Unexpected error has been occured',
    };
  }
};

export const getPublicProfile = async (
  id: string
): Promise<SuccessResponse<User> | FailedResponse> => {
  try {
    const response = await net.get(`/api/get-public-profile/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data as SuccessResponse<User>;
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return {
      type: 'error',
      error: true,
      message: 'Unexpected error has been occured',
    };
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return await net.post('/api/get-user', {
      email,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return { error: true, message: 'Unexpected error has been occured' };
  }
};
