import React, { useState, useEffect } from "react";
import "../Login/Login.css";
import { NavLink, Navigate, useParams, useNavigation } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import SiteLogo from "../../assets/icons/SiteLogo";
import Form, { onChangeHandler } from "../../components/Form/Form";
import resetPasswordForm from "../../models/onboard/resetFormModel";
import { isValidResetToken, resetPassword } from "../../utils/services";
import loginImg from "../../assets/images/3d-people-1.png";
import { toast, loader } from "../../utils";
import If from "../../components/If/If";

function ResetPassword(props) {
  let [success, setSuccess] = useState(false);
  let [showResetForm, setshowResetForm] = useState(false);
  let mainForgotFormStructure = JSON.parse(JSON.stringify(resetPasswordForm));
  let [formConfig, setFormConfig] = useState(
    JSON.parse(JSON.stringify(resetPasswordForm))
  );
  let { id } = useParams();
  let history = useNavigation();

  let resetForgotHandler = () => {
    setFormConfig({ ...mainForgotFormStructure });
  };

  useEffect(() => {
    let getTokenStatus = async () => {
      let isValidToken = await isValidResetToken(id);
      if (isValidToken.type === "success") {
        setshowResetForm(true);
      } else {
        toast.error("Your token has been expired");
        setshowResetForm(false);
        history.push("/");
      }
    };
    getTokenStatus();
  }, []);

  let onChangeHandle = (e, fieldName, state) => {
    let formState = onChangeHandler(e, fieldName, state);
    setFormConfig(formState);
  };
  let isFormInvalid = (data) => {
    return Object.keys(data).some((formInput) => {
      return data[formInput].valid === false;
    });
  };

  let onSubmitHandler = async (e) => {
    e.preventDefault();
    let isInvalid = isFormInvalid({ ...formConfig });
    if (isInvalid) {
      Object.keys(formConfig).forEach((formInput) => {
        let newForm = { ...formConfig };
        setFormConfig(newForm);
      });
    } else {
      let form = new FormData(e.target);
      let password = form.get("password");
      loader.show();
      let data = await resetPassword(password, id);
      if (data.type === "success") {
        toast.success(data.message);
        loader.hide();
        setSuccess(true);
        resetForgotHandler();
        return;
      }
      loader.hide();
      toast.error(data.message);
    }
  };

  return (
    <If cond={showResetForm} else={<Loading />}>
      <If cond={success}>
        <Navigate to="/" />
      </If>
      <div className="analytics-page main-content forgot-page login-page qr-wrap">
        <div className="login_section container-fluid">
          <div className="row">
            <div className="col-md-12" />
          </div>
          <div className="row">
            <div className="col-md-6 leftsidecolumn">
              <div className="leftLoginSide">
                <div className="loginLogo">
                  <SiteLogo />
                  <div className="welcomeback" style={{ marginTop: "20px" }}>
                    <div style={{ marginBottom: "0" }} className="welcomeback">
                      Reset Password
                    </div>
                    <p className="des-for">
                      All set now you can reset your password. please enter you
                      new password below
                    </p>
                  </div>
                </div>
                <div className="loginpart">
                  <Form
                    className="upload-img-form row"
                    onSubmit={onSubmitHandler}
                    config={formConfig}
                    action={"#"}
                    onChange={onChangeHandle}
                    externalSubmit={
                      <div className="row">
                        <div className="col-md-12">
                          <button
                            type="submit"
                            className="btn btn-primary forgot-btn"
                            style={{ width: "100%" }}
                          >
                            Reset Password
                          </button>
                        </div>
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
            <div
              className="col-md-6 rightsidecolumn"
              style={{ alignItems: "center", display: "flex" }}
            >
              <img src={loginImg} className="login-img" alt="login" />
            </div>
          </div>
        </div>
      </div>
    </If>
  );
}

export default ResetPassword;
