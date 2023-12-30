import React, { useState, useEffect } from "react";
import Form, { onChangeHandler } from "../Form/Form";
import Loader from "../../utils/loader";
import Toast from "../../utils/toast";
import formStructure from "../../models/settingsForm";
import Http from "../../hooks/http";
import { useAuth } from "../../providers/Auth";
import { env } from "../../utils";
let loader = Loader();
let toast = new Toast();
const MySettings = () => {
  let http = Http();
  let token = localStorage.getItem("token");
  let [formConfig, setFormConfig] = useState(formStructure);
  const context = useAuth();
  useEffect(() => {
    require("./MySettings.css");
  }, []);
  useEffect(() => {
    if (context.user) {
      let formData = { ...formConfig };
      if (context.user.image) {
        formData.image.preview = [
          `${env["REACT_APP_BASE_URL"]}${context.user.image}`,
        ];
      }
      if (context.user.cover) {
        formData.cover.preview = [
          `${env["REACT_APP_BASE_URL"]}${context.user.cover}`,
        ];
      }
      setFormConfig(formData);
    }
  }, [context]);

  let isFormInvalid = () => {
    return Object.keys({ ...formConfig }).some((formInput) => {
      return formConfig[formInput].touched === true;
    });
  };
  let onChangeHandle = (e, fieldName, state) => {
    let formState = onChangeHandler(e, fieldName, state);
    setFormConfig(formState);
  };

  let onSubmitHandler = async (e) => {
    e.preventDefault();
    let isInvalid = !isFormInvalid();
    if (isInvalid) {
      Object.keys(formConfig).forEach((formInput) => {
        let newForm = { ...formConfig };
        setFormConfig(newForm);
      });
    } else {
      let form = new FormData(e.target);
      loader.show();
      let data = await http.post(
        `${env["REACT_APP_BASE_URL"]}/api/update-profile`,
        form,
        {
          formData: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.type === `error`) {
        loader.hide();
        toast.error(data.message);
        return;
      }
      context.setUser({ ...context.user, ...data.data });
      localStorage.setItem(
        `user`,
        JSON.stringify({ ...context.user, ...data.data })
      );

      let formState = { ...formConfig };
      Object.keys(formState).forEach((formInput) => {
        if (formState[formInput].config.type === `file`) {
          formState[formInput].selected = false;
          formState[formInput].selectedName = null;
        }
        return (formState[formInput].touched = false);
      });
      setFormConfig(formState);
      loader.hide();
      toast.success(data.message);
    }
  };
  return (
    <div className="my-settings">
      <Form
        className="settings-form"
        style={{ padding: "10px" }}
        onSubmit={onSubmitHandler}
        config={formConfig}
        action={"#"}
        onChange={onChangeHandle}
      />
    </div>
  );
};

export default MySettings;
