import React from 'react';
import { useAuth } from '../../providers/Auth';

type LoggedInUserPropType = {
  children: React.ReactNode;
  else?: React.ReactNode;
};
const IfLoggedIn = (props: LoggedInUserPropType) => {
  const auth = useAuth();
  return auth.user ? props.children : props.else || null;
};

export default IfLoggedIn;
