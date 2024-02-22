import React, { useState } from 'react';
import styles from './Dropdown.module.css';
import { IDropdownProps } from './Dropdown.type';
import { addPropsToChildren, getClassNames } from '../../../utils/helper';
export const Dropdown: React.FC<
  IDropdownProps & Omit<React.AllHTMLAttributes<HTMLDivElement>, 'size'>
> = ({
  autoClose,
  children,
  className = '',
  style,
  size = 'md',
  position = 'bottom',
  fullwidth,
  layout = 'default',
  variant = 'default',
  ...rest
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const classNames = '';

  const toggleDropdown = () => {
    setOpenMenu(!openMenu);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };
  const childrenWithProps = addPropsToChildren(children, {}, false, {
    DropdownToggle: {
      onClick: toggleDropdown,
    },
    DropdownMenu: {
      autoClose,
      onClick: toggleDropdown,
    },
    DropdownMenuItem: {
      closeHandler: handleCloseMenu,
      autoClose,
      onClick: toggleDropdown,
    },
  });

  const classes = getClassNames(
    styles,
    'dropdown',
    fullwidth ? 'dropdown-fullwidth' : '',
    position !== 'bottom' ? `drop-${position}` : '',
    openMenu ? 'dropdown-open' : ''
  );
  return (
    <>
      {openMenu && (
        <div onClick={handleCloseMenu} className={styles.dropdownOverlay} />
      )}
      <div
        {...rest}
        style={style}
        data-dropdown
        className={`${classNames} ${classes}`}
      >
        {childrenWithProps}
      </div>
    </>
  );
};
Dropdown.displayName = 'Dropdown';
export default Dropdown;
