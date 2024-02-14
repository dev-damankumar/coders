import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const ContextMenu = ({
  list,
  id,
  size,
  menuClass,
  className,
  disablePaste,
}) => {
  let click = () => {};
  let [listArray, setListArray] = useState(list);
  useEffect(() => {
    setListArray([...list]);
  }, [list]);

  let items = listArray?.map((v, i) => {
    if (Object.keys(v).length > 0) {
      if (v === 'divider') {
        return <div key={i} className='dropdown-divider' />;
      } else {
        if (!(v.id === 'paste' && !disablePaste)) {
          if (v.link) {
            return (
              <NavLink key={i} className='dropdown-item' to={v.link}>
                <div className='action-div'>
                  {v.icon || ''}
                  <span>{v.name || ''}</span>
                </div>
              </NavLink>
            );
          }

          return (
            <a
              key={i}
              className='dropdown-item'
              href='#'
              onClick={v.onClick || click}
            >
              <div className='action-div'>
                {v.icon || ''}
                <span>{v.name || ''}</span>
              </div>
            </a>
          );
        }
      }
    }
  });
  return (
    <div className={`context-menu ${className ? className : ''}`}>
      <div
        data-context-menu
        id={id ? id : ''}
        style={{ opacity: 1, visibility: 'visible' }}
        className={`dropdown-menu ${menuClass ? menuClass : ''} ${
          size ? `dropdown-${size}` : ''
        }`}
      >
        {items}
      </div>
    </div>
  );
};

export default ContextMenu;
