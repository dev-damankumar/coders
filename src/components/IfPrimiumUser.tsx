import { useAuth } from "../providers/Auth";

type PrimiumUserPropType = {
  children: React.ReactNode;
  else?: React.ReactNode;
};

const IfPrimiumUser = (props: PrimiumUserPropType) => {
  const auth = useAuth();
  return auth.user && Number(auth.user.type) === 1
    ? props.children
    : props.else
    ? props.else
    : "";
};

export default IfPrimiumUser;
