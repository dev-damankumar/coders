import ProfileIcon from "../../assets/icons/ProfileIcon";
import { useAuth } from "../../providers/Auth";
import { env } from "../../utils";

const ProfileImage = (props) => {
  let auth = useAuth();
  return auth?.user?.image ? (
    <img src={`${env["REACT_APP_BASE_URL"]}${auth?.user?.image}`} {...props} />
  ) : (
    <ProfileIcon />
  );
};

export default ProfileImage;
