import { useAuth } from "../../providers/Auth";

type AdminUserPropType = {
  children: React.ReactNode;
  else?: React.ReactNode;
};
const IfAdmin = (props: AdminUserPropType) => {
  let auth = useAuth();
  return auth.user ? props.children : "";
};

export default IfAdmin;
