import ProfileIcon from "../../assets/icons/ProfileIcon";
import EditRowIcon from "../../assets/icons/EditRowIcon";
import If from "../If/If";
import { env } from "../../utils";
import { useAuth } from "../../providers/Auth";

type CoverImageType = {
  showModalHandler: (arg: string) => void;
  publicProfile?: boolean;
};

const UserProfileInfo = ({
  showModalHandler,
  publicProfile,
}: CoverImageType) => {
  const auth = useAuth();
  return (
    <div className="user-wrap">
      <div className="img-wrap">
        {auth?.user?.image ? (
          <img src={`${env["REACT_APP_BASE_URL"]}${auth?.user?.image}`} />
        ) : (
          <ProfileIcon />
        )}
        <If cond={!publicProfile}>
          <button
            className="edit-profile-btn"
            onClick={() => showModalHandler(`profile`)}
          >
            <EditRowIcon />
          </button>
        </If>
      </div>
      <div className="user-detail">
        <h1 className="list-heading">{auth?.user?.name}</h1>
        <p className="joined">{auth?.user?.email}</p>
        <p className="list-subheading">
          Mobile:{" "}
          <a href={`tel:${auth?.user?.mobile}`}> {auth?.user?.mobile}</a>
        </p>
      </div>
    </div>
  );
};

export default UserProfileInfo;
