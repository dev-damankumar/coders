import React from 'react';
import getLines from '../../utils/file';
const GetLines = (props: { children: React.ReactNode; data: string }) => {
  let rows = getLines(props.data);
  return (
    <>
      {rows}
      {props.children}
    </>
  );
};
export default GetLines;
