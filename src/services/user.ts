import { isAxiosError } from "axios";
import { net } from "../helpers";

type SocialLinksType = {
  website: string;
  github: string;
  instagram: string;
  facebook: string;
  youtube: string;
  linkedin: string;
};

export const setSocials = async (social: SocialLinksType) => {
  try {
    return await net.post(
      "/api/set-socials",
      { social },
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

export const getPublicProfile = async (id: string) => {
  try {
    return await net.get(`/api/get-public-profile/${id}`, {
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

export const getUserByEmail = async (email: string) => {
  try {
    return await net.post("/api/get-user", {
      email,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return { error: true, ...error.response!.data };
    }
    return { error: true, message: "Unexpected error has been occured" };
  }
};
