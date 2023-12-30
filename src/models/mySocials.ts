import { UserStateType } from "../providers/Auth";

let localUser = localStorage.getItem("user") || null;
let user: UserStateType = null;
if (localUser) {
  user = JSON.parse(localUser);
}

let formStructure = {
  website: {
    el: "input",
    config: {
      type: "url",
      placeholder: "Enter Your Website URL",
      name: "website",
      id: "website",
      value: user?.social?.website || "",
    },
    label: "Website Url",
    valid: true,
    touched: false,
  },
  github: {
    el: "input",
    config: {
      type: "url",
      placeholder: "Enter Your Github URL",
      name: "github",
      id: "github",
      value: user?.social?.github || "",
    },
    label: "Github Url",
    valid: true,
    touched: false,
  },
  facebook: {
    el: "input",
    config: {
      type: "url",
      placeholder: "Enter Your Facebook URL",
      name: "facebook",
      id: "facebook",
      value: user?.social?.facebook || "",
    },
    label: "Facebook Url",
    valid: true,
    touched: false,
  },
  instagram: {
    el: "input",
    config: {
      type: "url",
      placeholder: "Enter Your Instagram URL",
      name: "instagram",
      id: "instagram",
      value: user?.social?.instagram || "",
    },
    label: "Instagram Url",
    valid: true,
    touched: false,
  },
  youtube: {
    el: "input",
    config: {
      type: "url",
      placeholder: "Enter Your Youtube URL",
      name: "youtube",
      id: "youtube",
      value: user?.social?.youtube || "",
    },
    label: "Youtube Url",
    valid: true,
    touched: false,
  },
  linkedin: {
    el: "input",
    config: {
      type: "url",
      placeholder: "Enter Your Linkedin URL",
      name: "linkedin",
      id: "linkedin",
      value: user?.social?.linkedin || "",
    },
    label: "Linkedin Url",
    valid: true,
    touched: false,
  },
};

export default user ? formStructure : {};
