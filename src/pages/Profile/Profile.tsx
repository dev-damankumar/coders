import React, { useState, Suspense, useEffect } from "react";
import "./Profile.css";
import coverImg from "../../assets/images/main-2.jpg";
import { NavLink } from "react-router-dom";
import IfAdmin from "../../components/IfAdmin/IfAdmin";
import Http from "../../hooks/http";
import UserProfileInfo from "../../components/UserProfileInfo/UserProfileInfo";
import SocialInfo from "../../components/SocialInfo/SocialInfo";
import SocialIcons from "../../components/SocialIcons/SocialIcons";
import CoverImage from "../../components/CoverImage/CoverImage";
import Heading from "../../components/Heading/Heading";
import Loading from "../../components/Loading/Loading";
import ImgIcon from "../../assets/icons/ImgIcon";
import LinkIcon from "../../assets/icons/LinkIcon";
import formStructure from "../../models/mySocials";
import Form, { onChangeHandler } from "../../components/Form/Form";
import If from "../../components/If/If";
import { useAuth } from "../../providers/Auth";

const Modal = React.lazy(() => import("../../components/Modal/Modal"));
const FileInput = React.lazy(
  () => import("../../components/FileInput/FileInput")
);
const MySettings = React.lazy(
  () => import("../../components/MySettings/MySettings")
);
const AddProject = React.lazy(
  () => import("../../pages/Admin/AddProject/AddProject")
);
const MyProfile = React.lazy(
  () => import("../../components/MyProfile/MyProfile")
);
const ManageProjects = React.lazy(
  () => import("../../pages/Admin/ManageProjects/ManageProjects")
);

const Profile = React.memo((props: { tab: string }) => {
  let tab = props.tab;
  let [formConfig, setFormConfig] = useState(
    JSON.parse(JSON.stringify(formStructure))
  );
  let [showModal, setshowModal] = useState(false);
  let [uploadType, setUploadType] = useState(`profile`);
  let [fileImg, setFileImg] = useState(null);
  let [isSelected, setSelected] = useState(false);
  let [showSocialModal, setshowSocialModal] = useState(false);
  let [previewImg, setpreviewImg] = useState(null);
  let http = Http();
  const auth = useAuth();
  let showModalHandler = (type) => {
    setUploadType(type);
    setshowModal(true);
  };

  useEffect(() => {
    if (tab !== "profile") {
      document
        .querySelector("#main-scroll")!
        .scrollIntoView({ behavior: "smooth" });
    }
  }, [tab]);

  let openSocialModal = () => {
    setshowSocialModal(true);
  };
  let onChangeHandle = (e, fieldName, state) => {
    let formState = onChangeHandler(e, fieldName, state);
    setFormConfig(formState);
  };

  let isFormInvalid = () => {
    return Object.keys(formConfig).some((formInput) => {
      return formConfig[formInput].touched === false;
    });
  };

  let onSubmitHandler = async (e) => {
    // e.preventDefault();
    // let isInvalid = isFormInvalid();
    // if (isInvalid) {
    //   Object.keys(formConfig).forEach((formInput) => {
    //     let newForm = { ...formConfig };
    //     newForm[formInput].touched = true;
    //     setFormConfig(newForm);
    //   });
    // } else {
    //   let formData = Object.keys({ ...formConfig });
    //   var object = {};
    //   formData.forEach(function (value, key) {
    //     object[value] = formConfig[value].config.value;
    //   });
    //   // loader.show();
    //   let res = await setSocials(object);
    //   loader.hide();
    //   if (res.type === "success") {
    //     toast.success(res.message);
    //     setshowSocialModal(false);
    //     let user = auth.user;
    //     localStorage.setItem(
    //       "user",
    //       JSON.stringify({
    //         ...user,
    //         social: { ...user?.social, ...object },
    //       })
    //     );
    //     auth.setUser({
    //       ...user,
    //       social: { ...user?.social, ...object },
    //     });
    //     return;
    //   }
    //   toast.error(res.message);
    // }
  };
  let uploadHandler = async () => {
    // let form = new FormData();
    // form.append("mobile", auth.user.mobile ? auth.user.mobile : "");
    // form.append("email", auth.user.email);
    // if (uploadType === "cover") {
    //   form.append("cover", fileImg);
    // } else {
    //   form.append("profileImage", fileImg);
    // }
    // loader.show();
    // let data = await http.post(
    //   `${env["REACT_APP_BASE_URL"]}/api/update-profile`,
    //   form,
    //   {
    //     formData: true,
    //   }
    // );
    // loader.hide();
    // auth.setUser({ ...auth.user, ...data.data });
    // localStorage.setItem(
    //   "user",
    //   JSON.stringify({ ...auth.user, ...data.data })
    // );
    // setSelected(false);
    // setpreviewImg(false);
    // setFileImg(null);
    // setshowModal(false);
    // toast.success("Image Set Successfully");
  };

  let upload = (
    <div
      className={`upload-wrap ${previewImg ? "upload-wrap-with-preview" : ""}`}
    >
      <Suspense fallback={<Loading />}>
        <FileInput
          onPreview={setpreviewImg}
          onUpload={setFileImg}
          selectedHandler={setSelected}
        />
      </Suspense>
    </div>
  );

  let uploadLinks = (
    <div className="">
      <Form
        style={{ padding: "10px 0" }}
        config={formConfig}
        action={"#"}
        onChange={onChangeHandle}
      />
    </div>
  );

  let footer = (
    <div className="d-modal-wrap">
      <If cond={previewImg}>
        <div className={`preview-img`}>
          <img src={previewImg ? previewImg : coverImg} />
          <div className={`preview-info`} data-table-tooltip="Copy">
            <h5 title={fileImg?.name}>{fileImg?.name}</h5>
            <div className="x-tooltip x-tooltip-dark x-tooltip-up">
              {fileImg?.name}
            </div>
            <span>{fileImg?.type}</span>
          </div>
        </div>
      </If>
      <div className="d-modal-button-div">
        <button
          className="btn btn-small btn-primary"
          type="button"
          onClick={uploadHandler}
        >
          Upload
        </button>
        <button
          className="btn btn-small btn-dark"
          onClick={() => setshowModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  let socialFooter = (
    <div className="d-modal-wrap">
      <div className="d-modal-button-div">
        <button
          className="btn btn-small btn-primary"
          type="submit"
          onClick={onSubmitHandler}
        >
          Submit
        </button>
        <button
          className="btn btn-small btn-dark"
          onClick={() => setshowSocialModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Modal
          heading={`Upload Profile Image`}
          headerIcon={<ImgIcon />}
          show={showModal}
          body={upload}
          size={`md`}
          onClose={() => setshowModal(false)}
          footer={footer}
        />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Modal
          heading={`Upload your social links`}
          headerIcon={<LinkIcon />}
          show={showSocialModal}
          body={uploadLinks}
          size={`md`}
          onClose={() => setshowSocialModal(false)}
          footer={socialFooter}
        />
      </Suspense>
      <section
        className="section form-creation-wrap profile-section-main"
        style={{ paddingTop: "10px" }}
      >
        <section className="discussion-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="profile-wrap">
                  <CoverImage showModalHandler={showModalHandler} />
                  <div className="profile-info">
                    <UserProfileInfo showModalHandler={showModalHandler} />
                    <SocialInfo />
                  </div>
                  <div
                    className="user-profile-main-div mb-hide"
                    id="main-scroll"
                  >
                    <div className="follow-user-div">
                      <button
                        onClick={openSocialModal}
                        className="btn btn-primary"
                      >
                        Edit Social Links
                      </button>
                    </div>
                    <SocialIcons />
                  </div>
                  <div className="profile-tabs">
                    <ul className="nav-tabs" role="tablist">
                      <li className="nav-item">
                        <NavLink
                          className={`nav-link ${
                            tab === "profile" ? "active" : ""
                          }`}
                          data-toggle="tab"
                          to="/profile"
                        >
                          <i className="bx bxs-user-circle" />
                          <span>My Profile</span>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className={`nav-link ${
                            tab === "my-settings" ? "active" : ""
                          }`}
                          data-toggle="tab"
                          to="/my-settings"
                        >
                          <i className="bx bxs-cog" />
                          <span>My Settings</span>
                        </NavLink>
                      </li>
                      <IfAdmin>
                        <li className="nav-item">
                          <NavLink
                            className={`nav-link ${
                              tab === "add-project" ? "active" : ""
                            }`}
                            data-toggle="tab"
                            to="/admin/add-project"
                          >
                            <i className="bx bxs-add-to-queue" />
                            <span>Add Project</span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            className={`nav-link ${
                              tab === "manage-project" ? "active" : ""
                            }`}
                            data-toggle="tab"
                            to="/admin/manage-project"
                          >
                            <i className="bx bx-customize" />
                            <span>Manage Project</span>
                          </NavLink>
                        </li>
                        {/*<IfStandardUser>
                                                <li className="nav-item">
                                                    <NavLink
                                                        className={`nav-link ${tab === "manage-subscription" ? "active" : ""}`}
                                                        data-toggle="tab" to="/admin/manage-subscription"
                                                    >
                                                        <i className='bx bx-dollar-circle'/>
                                                        <span>Manage Subscription</span>
                                                    </NavLink>
                                                </li>
                                            </IfStandardUser>*/}
                      </IfAdmin>
                    </ul>
                  </div>
                </div>
                <div className="tab-content profile-tab-content">
                  <If cond={tab === "profile"}>
                    <div
                      id="my-profile"
                      className={`container tab-pane ${
                        tab === "profile" ? "tab-open" : "fade"
                      }`}
                    >
                      <Heading>My Profile</Heading>
                      <Suspense fallback={<div></div>}>
                        <MyProfile />
                      </Suspense>
                    </div>
                  </If>
                  <If cond={tab === "my-settings"}>
                    <div
                      id="my-settings"
                      className={`container tab-pane ${
                        tab === "my-settings" ? "tab-open" : "fade"
                      }`}
                    >
                      <h3>
                        My <span className="highlight-span">Settings</span>
                      </h3>
                      <div className={"settings-wrap"}>
                        <Suspense fallback={<div></div>}>
                          <MySettings />
                        </Suspense>
                      </div>
                    </div>
                  </If>
                  <IfAdmin>
                    <If cond={tab === "add-project"}>
                      <div
                        id="add-project"
                        className={`container tab-pane ${
                          tab === "add-project" ? "tab-open" : "fade"
                        }`}
                      >
                        <Heading>Add Project</Heading>
                        <div className={"settings-wrap"}>
                          <Suspense fallback={<div></div>}>
                            <AddProject />
                          </Suspense>
                        </div>
                      </div>
                    </If>
                    <If cond={tab === "manage-project"}>
                      <div
                        id="manage-project"
                        className={`container tab-pane ${
                          tab === "manage-project" ? "tab-open" : "fade"
                        }`}
                      >
                        <Heading style={{ marginBottom: "30px" }}>
                          Manage Project
                        </Heading>
                        <Suspense fallback={<div></div>}>
                          <ManageProjects />
                        </Suspense>
                      </div>
                    </If>

                    {/* <IfStandardUser>
                                        <div id="manage-subscription"
                                             className={`container tab-pane ${tab === "manage-subscription" ? "tab-open" : "fade"}`}>
                                            <Heading style={{marginBottom: "30px"}}>Manage Subscription</Heading>
                                            <Suspense fallback={<div></div>}>
                                                <ManageSubscription/>
                                            </Suspense>
                                        </div>
                                    </IfStandardUser>*/}
                  </IfAdmin>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
});
export default Profile;
