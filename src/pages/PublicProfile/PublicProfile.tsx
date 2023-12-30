import React, { useState, Suspense, useEffect } from "react";
import "../Profile/Profile.css";
import { NavLink, useNavigation, useParams } from "react-router-dom";
import UserProfileInfo from "../../components/UserProfileInfo/UserProfileInfo";
import SocialInfo from "../../components/SocialInfo/SocialInfo";
import SocialIcons from "../../components/SocialIcons/SocialIcons";
import CoverImage from "../../components/CoverImage/CoverImage";
import Heading from "../../components/Heading/Heading";
import { getPublicProfile } from "../../utils/services";
import If from "../../components/If/If";
import Loading from "../../components/Loading/Loading";

const MyProfile = React.lazy(
  () => import("../../components/MyProfile/MyProfile")
);

const PublicProfile = React.memo((props: { tab: string }) => {
  let { id } = useParams();
  let tab = props.tab;
  let history = useNavigation();
  let [context, setContext] = useState(null);

  useEffect(() => {
    async function getProfile() {
      let user = await getPublicProfile(id);
      if (user.type === "error") {
        return history("/", { replace: true });
      }
      setContext(user);
    }
    getProfile();
  }, []);

  useEffect(() => {
    if (tab !== "profile") {
      document
        .querySelector("#main-scroll")
        .scrollIntoView({ behavior: "smooth" });
    }
  }, [tab]);

  return (
    <If cond={context} else={<Loading />}>
      <section
        className="section form-creation-wrap profile-section-main"
        style={{ paddingTop: "10px" }}
      >
        <section className="discussion-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="profile-wrap">
                  <CoverImage publicProfile={true} context={context} />
                  <div className="profile-info">
                    <UserProfileInfo publicProfile={true} context={context} />
                    <SocialInfo publicProfile={true} context={context} />
                  </div>
                  <div
                    className="user-profile-main-div mb-hide"
                    id="main-scroll"
                  >
                    <div className="follow-user-div" />
                    <SocialIcons publicProfile={true} context={context} />
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
                          <i
                            style={{ marginRight: "10px" }}
                            className="bx bxs-user-circle"
                          />
                          <span style={{ display: "block" }}>Profile</span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="tab-content profile-tab-content">
                  <div
                    id="my-profile"
                    className={`container tab-pane ${
                      tab === "profile" ? "tab-open" : "fade"
                    }`}
                  >
                    <Heading>Profile</Heading>
                    <Suspense fallback="">
                      <MyProfile publicProfile={true} context={context} />
                    </Suspense>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </If>
  );
});
export default PublicProfile;
