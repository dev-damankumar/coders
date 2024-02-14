import React from 'react';
import noDataImg from '../../../assets/images/no-data-svg.png';
import classes from './NoData.module.css';

type NoDataProps = {
  if?: boolean;
  message?: string;
};
const NoData = (props: NoDataProps) => {
  let data: string | React.ReactNode = '';
  if (props.if) {
    data = (
      <div className={classes['no-data']}>
        <img width={264} height={200} src={noDataImg} alt='noDataImg' />
        <h1>{props.message ? props.message : 'No Data Found !!'}</h1>
      </div>
    );
  }
  return data;
};

export default NoData;
