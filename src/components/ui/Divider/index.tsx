import { getClassNames } from '../../../utils/helper';
import React from 'react';
import styles from './Divider.module.css';

export const Divider: React.FC<
  {
    direction?: 'horizontal' | 'vertical';
    children?: React.ReactNode;
  } & React.AllHTMLAttributes<HTMLDivElement>
> = ({ direction = 'horizontal' }) => {
  return (
    <div
      className={getClassNames(
        styles,
        'divider',
        direction === 'vertical' ? 'divider-vertical' : ''
      )}
    />
  );
};

Divider.displayName = 'Divider';
export default Divider;
