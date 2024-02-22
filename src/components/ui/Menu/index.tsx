import { NavLink, useLocation } from 'react-router-dom';
import classes from './index.module.css';

import IfAdmin from '../../hoc/IfAdmin';
// import DropDown, { TypeList } from '../Dropdown/DropDown';
import SiteLogo from '../../../assets/icons/SiteLogo';
import placeholderProfileImage from '../../../assets/images/placeholder.png';
import ScriptIcon from '../../../assets/icons/ScriptIcon';
import ImportIcon from '../../../assets/icons/ImportIcon';
import ImgIcon from '../../../assets/icons/ImgIcon';
import IfPrimiumUser from '../../hoc/IfPrimiumUser';
import { useAuth } from '../../../providers/Auth';
import { showMenu } from '../../../utils/helper';
import Dropdown from '../Dropdown/Dropdown';
import DropdownToggle from '../Dropdown/DropdownToggle';
import DropdownMenu from '../Dropdown/DropdownMenu';
import DropdownMenuItem from '../Dropdown/DropdownMenuItem';
import Divider from '../Divider';
import Image from '../Image';
import ProfileIcon from '../../../assets/icons/ProfileIcon';
import SettingsIcon from '../../../assets/icons/SettingsIcon';
import UndoIcon from '../../../assets/icons/UndoIcon';

const Menu = () => {
  const path = useLocation().pathname;
  const auth = useAuth();
  // const profileMenu: TypeList[] = [
  //   {
  //     name: 'My Profile',
  //     icon: auth?.user?.image ? (
  //       <Image
  //         width={20}
  //         height={20}
  //         src={auth.user?.image}
  //         defaultImg={placeholderProfileImage}
  //       />
  //     ) : (
  //       <ProfileIcon width={20} height={20} />
  //     ),
  //     link: '/profile',
  //   },
  //   {
  //     name: 'My Settings',
  //     icon: <SettingsIcon width={20} height={20} />,
  //     link: '/my-settings',
  //   },
  //   'divider',
  //   {
  //     name: 'Logout',
  //     icon: <UndoIcon width={20} height={20} />,
  //     onClick: auth.logout,
  //   },
  // ];
  const show = showMenu(path);
  if (!show) return;
  return (
    <section className={`section ${classes.menuSection}`}>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className={classes.menu}>
              <nav className={`${classes.navbar} ${classes.navbarDark}`}>
                <SiteLogo />
                <div className={classes.menuWrap} data-menu>
                  <ul
                    className={classes.menuUl}
                    style={{ justifyContent: 'flex-end' }}
                  >
                    {!auth.user ? (
                      <>
                        <li className='menu-item'>
                          <NavLink
                            to='/login'
                            className='btn btn-small btn-primary btn-outline login-btn'
                          >
                            Login
                          </NavLink>
                        </li>
                        <li className='menu-item'>
                          <NavLink
                            to='/register'
                            className='btn btn-small btn-primary register-btn'
                          >
                            Register
                          </NavLink>
                        </li>
                      </>
                    ) : (
                      <Dropdown>
                        <DropdownToggle>
                          {auth.user?.image ? (
                            <div className={classes.userButton}>
                              <Image
                                className={classes.userImage}
                                width={22}
                                height={22}
                                src={auth.user?.image}
                                defaultImg={placeholderProfileImage}
                              />
                              <span>{auth.user.username}</span>
                            </div>
                          ) : (
                            <ProfileIcon />
                          )}
                        </DropdownToggle>
                        <DropdownMenu position='after'>
                          <DropdownMenuItem>
                            <NavLink to='/profile' className={classes.menuItem}>
                              {auth?.user?.image ? (
                                <Image
                                  width={20}
                                  height={20}
                                  src={auth.user?.image}
                                  defaultImg={placeholderProfileImage}
                                  className={classes.userImage}
                                />
                              ) : (
                                <ProfileIcon width={20} height={20} />
                              )}
                              My Profile
                            </NavLink>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <NavLink
                              to='/my-settings'
                              className={classes.menuItem}
                            >
                              <SettingsIcon width={20} height={20} />
                              My Settings
                            </NavLink>
                          </DropdownMenuItem>
                          <Divider />
                          <DropdownMenuItem>
                            <button
                              className={classes.menuItem}
                              onClick={() => {
                                auth.logout();
                              }}
                            >
                              <UndoIcon width={20} height={20} />
                              Logout
                            </button>
                          </DropdownMenuItem>
                        </DropdownMenu>
                      </Dropdown>
                    )}

                    <IfAdmin>
                      <Dropdown>
                        <DropdownToggle>
                          <button className={classes.userButton}>
                            <i className='bx bx-dots-vertical-rounded' />
                          </button>
                        </DropdownToggle>
                        <DropdownMenu position='after'>
                          <DropdownMenuItem>
                            <NavLink to='/admin/add-project'>
                              <div className={classes.menuItem}>
                                <ImgIcon width={20} height={20} />
                                <span>Add Projects</span>
                              </div>
                            </NavLink>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <NavLink to='/admin/manage-project'>
                              <div className={classes.menuItem}>
                                <ImportIcon width={20} height={20} />
                                <span>Manage Projects</span>
                              </div>
                            </NavLink>
                          </DropdownMenuItem>
                          <Divider />
                          <DropdownMenuItem>
                            <IfPrimiumUser>
                              <NavLink to='/x-studio'>
                                <div className={classes.menuItem}>
                                  <ScriptIcon width={20} height={20} />
                                  <span>Script editor</span>
                                </div>
                              </NavLink>
                            </IfPrimiumUser>
                          </DropdownMenuItem>
                        </DropdownMenu>
                      </Dropdown>
                    </IfAdmin>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
