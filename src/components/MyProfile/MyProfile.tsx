import React from "react";
import getSubscriptionName from "../../utils/getSubscriptionName";
import If from "../If/If";
import { useAuth } from "../../providers/Auth";

type MyProfileType = {
  publicProfile?: boolean;
};
const MyProfile = ({ publicProfile }: MyProfileType) => {
  const auth = useAuth();
  return (
    <div className="profile-main-card">
      <div className="card-body">
        <div className="row">
          <div className="col-sm-3">
            <h5 className="mb-0">Name</h5>
          </div>
          <div className="col-sm-9 text-secondary">
            {auth?.user?.username || "N/A"}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h5 className="mb-0">Email</h5>
          </div>
          <div className="col-sm-9 text-secondary">
            {auth?.user?.email || "N/A"}
          </div>
        </div>

        <If cond={!publicProfile}>
          <hr />
          <div className="row">
            <div className="col-sm-3">
              <h5 className="mb-0">Subscription</h5>
            </div>
            <div className="col-sm-9 text-secondary">
              {getSubscriptionName(auth?.user?.type || 1) || "N/A"}
            </div>
          </div>
        </If>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h5 className="mb-0">Mobile</h5>
          </div>
          <div className="col-sm-9 text-secondary">
            {auth?.user?.mobile || "N/A"}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h5 className="mb-0">Address</h5>
          </div>
          <div className="col-sm-9 text-secondary">
            {auth?.user?.address || "N/A"}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h5 className="mb-0">City</h5>
          </div>
          <div className="col-sm-9 text-secondary">
            {auth?.user?.city || "N/A"}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h5 className="mb-0">Country</h5>
          </div>
          <div className="col-sm-9 text-secondary">
            {auth?.user?.country || "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
