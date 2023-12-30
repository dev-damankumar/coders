import { useAuth } from "../../providers/Auth";

type StandardUserPropType = {
  children: React.ReactNode;
  else?: React.ReactNode;
};

const IfStandardUser = (props: StandardUserPropType) => {
  let auth = useAuth();
  return auth.user &&
    (Number(auth.user.type) === 2 || Number(auth.user.type) === 1)
    ? props.children
    : props.else
    ? props.else
    : "";
};

export default IfStandardUser;
