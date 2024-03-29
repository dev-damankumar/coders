import React from 'react';
import { getClassNames } from '../../../utils/helper';
import classes from './Dropdown.module.css';
import { IMenuItemProps } from './Dropdown.type';

export const DropdownMenuItem: React.FC<
  IMenuItemProps & React.AllHTMLAttributes<HTMLDivElement>
> = ({
  active,
  onSelect,
  className,
  style,
  children,
  closeHandler,
  autoClose,
  ...rest
}) => {
  return (
    <div
      {...rest}
      style={style}
      onClick={(e) => {
        onSelect?.(e);
        rest?.onClick?.(e);
        if (autoClose) {
          closeHandler?.();
        }
      }}
      className={`${getClassNames(
        classes,
        'dropdown-item',
        active ? 'active' : ''
      )} ${className}`}
    >
      {children}
    </div>
  );
};
DropdownMenuItem.displayName = 'DropdownMenuItem';
export default DropdownMenuItem;
