import React from "react";

type TypeIf = {
  cond: boolean | null | undefined;
  children: React.ReactNode;
  else?: React.ReactNode;
};
const If = React.memo((props: TypeIf) => {
  return props.cond ? props.children : props.else ? props.else : "";
});

export default If;
