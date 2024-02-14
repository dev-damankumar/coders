import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export type TypeList =
  | {
      link?: string;
      target?: '_blank' | '_self' | '_parent' | '_top';
      name: string;
      onClick?: () => void;
      icon?: React.ReactNode;
    }
  | 'divider';

export type DropdownType = {
  list: TypeList[];
  size?: 'xs' | 'sm' | 'lg' | 'md' | 'xl';
  icon?: React.ReactNode;
  name: string;
  direction?: 'up' | 'down';
  className?: string;
  menuClass?: string;
  linkClass?: string;
};
const DropDown = ({
  list,
  size,
  icon,
  name,
  direction,
  className,
  menuClass,
  linkClass,
}: DropdownType) => {
  let [listArray, setListArray] = useState(list);
  useEffect(() => {
    setListArray([...list]);
  }, [list]);

  let click = () => {};
  let items = listArray?.map((v, i) => {
    if (Object.keys(v).length > 0) {
      if (v === 'divider') {
        return <div key={i} className='dropdown-divider' />;
      } else {
        if (v.link) {
          return !v?.target ? (
            <NavLink key={i} className='dropdown-item' to={v.link}>
              <span className='action-div'>
                {v.icon || ''}
                <span>{v.name || ''}</span>
              </span>
            </NavLink>
          ) : (
            <a
              target={v.target}
              key={i}
              className='dropdown-item'
              href={v.link}
            >
              <span className='action-div'>
                {v.icon || ''}
                <span>{v.name || ''}</span>
              </span>
            </a>
          );
        }

        return (
          <a key={i} className='dropdown-item' onClick={v.onClick || click}>
            <span className='action-div'>
              {v.icon || ''}
              <span>{v.name || ''}</span>
            </span>
          </a>
        );
      }
    }
  });
  return (
    <>
      <div
        className={`menu-item dropdown ${className ? className : ''} ${
          direction === 'up' ? 'drop-up' : ''
        }`}
      >
        <a
          className={`menu-link ${linkClass ? linkClass : ''}`}
          data-toggle='dropdown'
        >
          {icon}
          <span>{name}</span>
        </a>
        <div
          className={`dropdown-menu ${menuClass ? menuClass : ''} ${
            size ? `dropdown-${size}` : ''
          }`}
        >
          <div className='dropdown-wrap'>{items}</div>
        </div>
      </div>
    </>
  );
};

export default DropDown;
