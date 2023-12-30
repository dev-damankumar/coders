import React, { useState } from "react";
import "../Login/Login.css";
import { NavLink } from "react-router-dom";
import SiteLogo from "../../assets/icons/SiteLogo";
import Form, { onChangeHandler } from "../../components/Form/Form";
import forgotPasswordForm from "../../models/onboard/forgotPasswordFormModel";
import { forgotPassword } from "../../utils/services";
import SaveRowIcon from "../../assets/icons/SaveRowIcon";
import loginImg from "../../assets/images/3d-people-1.png";
import { toast, loader } from "../../utils";
import If from "../../components/If/If";

function ForgotPassword() {
  let [success, setSuccess] = useState(false);
  let mainForgotFormStructure = JSON.parse(JSON.stringify(forgotPasswordForm));
  let [formConfig, setFormConfig] = useState(
    JSON.parse(JSON.stringify(forgotPasswordForm))
  );

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  let resetForgotHandler = () => {
    setFormConfig({ ...mainForgotFormStructure });
  };

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
      let email = form.get("email");
      let isEmailValid = validateEmail(email);
      if (!isEmailValid) {
        let temp = { ...mainForgotFormStructure };
        temp["email"].valid = false;
        temp["email"].touched = true;
        temp["email"].config = {
          ...temp["email"].config,
          value: email,
        };
        setFormConfig({ ...temp });
        toast.error("Invalid email");
      } else {
        loader.show();
        let data = await forgotPassword(form.get("email"));
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
    }
  };

  return (
    <>
      <div className="analytics-page main-content forgot-page login-page qr-wrap">
        <div className="login_section container-fluid">
          <div className="row">
            <div className="col-md-12" />
          </div>
          <div className="row">
            <div className="col-md-6 leftsidecolumn">
              <div className="leftLoginSide">
                <div className="loginLogo">
                  <NavLink to="/">
                    <SiteLogo />
                  </NavLink>
                  <div className="welcomeback" style={{ marginTop: "20px" }}>
                    <div style={{ marginBottom: "0" }} className="welcomeback">
                      Forgot Password ??
                    </div>
                    <p className="des-for">
                      In case your forgot your password you can always reset it
                      by entering the email below
                    </p>
                  </div>
                </div>
                <If
                  cond={!success}
                  else={
                    <div className="success-payment">
                      <SaveRowIcon />
                      <h2>Mail has been sent successfully!</h2>
                      <p>Now you can open your email inbox to reset it</p>
                      <a href="/">
                        <button type="button" className="btn btn-success">
                          Go to Home
                        </button>
                      </a>
                    </div>
                  }
                >
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
                              Send Email
                            </button>
                          </div>
                          <div className="col-md-12">
                            <div className="or">
                              <span>Or</span>
                            </div>
                            <div className="register-btn-div">
                              <NavLink to="/login">
                                <button
                                  type="submit"
                                  className="btn"
                                  style={{
                                    background: "var(--info)",
                                    color: "white",
                                  }}
                                >
                                  Login
                                </button>
                              </NavLink>
                              <NavLink to="/register">
                                <button type="submit" className="btn btn-dark">
                                  Register
                                </button>
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      }
                    />
                  </div>
                </If>
              </div>
            </div>
            <div
              className="col-md-6 rightsidecolumn"
              style={{ alignItems: "center", display: "flex" }}
            >
              <img src={loginImg} className="login-img" alt="hdsf" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
