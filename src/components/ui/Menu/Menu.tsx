import { NavLink, useLocation } from 'react-router-dom';
import IfAdmin from '../../hoc/IfAdmin';
import DropDown, { TypeList } from '../DropDown';
import SiteLogo from '../../../assets/icons/SiteLogo';
import SettingsIcon from '../../../assets/icons/SettingsIcon';
import UndoIcon from '../../../assets/icons/UndoIcon';
import ScriptIcon from '../../../assets/icons/ScriptIcon';
import ProfileIcon from '../../../assets/icons/ProfileIcon';
import ImportIcon from '../../../assets/icons/ImportIcon';
import ImgIcon from '../../../assets/icons/ImgIcon';
import IfPrimiumUser from '../../hoc/IfPrimiumUser';
import { useAuth } from '../../../providers/Auth';
import { showMenu } from '../../../utils';
import Image from '../Image';
import placeholderProfileImage from '../../../assets/images/profile.svg';

const Menu = () => {
  const path = useLocation().pathname;
  const auth = useAuth();
  const profileMenu: TypeList[] = [
    {
      name: 'My Profile',
      icon: auth?.user?.image ? (
        <Image src={auth.user?.image} defaultImg={placeholderProfileImage} />
      ) : (
        <ProfileIcon />
      ),
      link: '/profile',
    },
    {
      name: 'My Settings',
      icon: <SettingsIcon />,
      link: '/my-settings',
    },
    'divider',
    {
      name: 'Logout',
      icon: <UndoIcon />,
      onClick: auth.logout,
    },
  ];
  const show = showMenu(path);

  if (!show) return;
  return (
    <section className='section menu-section'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='menu sticky-menu'>
              <nav className='navbar navbar-dark'>
                <SiteLogo />
                <div className='menu-wrap' data-menu>
                  <ul
                    className='menu-ul'
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
                      <DropDown
                        menuClass='dropdown-menu-right'
                        list={profileMenu}
                        linkClass='userMenu'
                        icon={
                          auth.user?.image ? (
                            <Image
                              src={auth.user?.image}
                              defaultImg={placeholderProfileImage}
                            />
                          ) : (
                            <ProfileIcon />
                          )
                        }
                        name={auth.user?.username}
                      />
                    )}

                    <IfAdmin>
                      <li className='menu-item dropdown'>
                        <a
                          className='menu-link themeSettings'
                          href='#moreActsion'
                          id='moreActsion'
                          data-toggle='dropdown'
                        >
                          <i className='bx bx-dots-vertical-rounded' />
                        </a>
                        <div className='dropdown-menu more-action-dropdown dropdown-menu-right'>
                          <NavLink
                            className='dropdown-item'
                            to='/admin/add-project'
                          >
                            <div className='action-div'>
                              <ImgIcon />
                              <span>Add Projects</span>
                            </div>
                          </NavLink>

                          <NavLink
                            className='dropdown-item'
                            to='/admin/manage-project'
                          >
                            <div className='action-div'>
                              <ImportIcon />
                              <span>Manage Projects</span>
                            </div>
                          </NavLink>
                          <IfPrimiumUser>
                            <div className='dropdown-divider' />
                            <NavLink className='dropdown-item' to='/x-studio'>
                              <div className='action-div script-edit'>
                                <ScriptIcon />
                                <span>Script editor</span>
                              </div>
                            </NavLink>
                          </IfPrimiumUser>
                        </div>
                      </li>
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
