import React from 'react';
import { addPropsToChildren, getClassNames } from '../../../utils/helper';
import styles from './Dropdown.module.css';
import { IDropdownMenu } from './Dropdown.type';
addPropsToChildren;
export const DropdownMenu: React.FC<
  IDropdownMenu & React.AllHTMLAttributes<HTMLDivElement>
> = ({
  children,
  className = '',
  style,
  position = 'before',
  autoClose,
  onClick,
  ...rest
}) => {
  const classes = getClassNames(
    styles,
    'dropdown-menu',
    position === 'after' ? 'dropdown-menu-right' : ''
  );
  const childrenWithProps = addPropsToChildren(children, {}, false);

  return (
    <div
      {...rest}
      className={`${classes} ${className}`}
      style={style}
      onClick={(e) => {
        if (autoClose) {
          onClick?.(e);
        }
      }}
    >
      <div className={getClassNames(styles, 'dropdown-wrap')}>
        {childrenWithProps}
      </div>
    </div>
  );
};
DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;
