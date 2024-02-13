import { NavLink, useLocation } from 'react-router-dom';
import IfAdmin from '../IfAdmin/IfAdmin';
import profileImg from '../../assets/images/profile.svg';
import SearchIcon from '../../assets/icons/SearchIcon';
import SettingsIcon from '../../assets/icons/SettingsIcon';
import ScriptIcon from '../../assets/icons/ScriptIcon';
import AddIcon from '../../assets/icons/AddIcon';
import ImportIcon from '../../assets/icons/ImportIcon';
import IfPrimiumUser from '../IfPrimiumUser';
import { useAuth } from '../../providers/Auth';
import { env } from '../../utils';

const Controls = () => {
  const path = useLocation().pathname;
  let auth = useAuth();
  let showControls = true;
  if (
    path === '/login' ||
    path === '/forgot-password' ||
    path.includes('reset') ||
    path.includes('register') ||
    path === '/admin/login' ||
    path.includes('x-studio')
  ) {
    showControls = false;
  }

  return showControls ? (
    <IfAdmin>
      <div className='controls'>
        <a href='#open-menu' className='openMenu' data-table-tooltip=''>
          <SearchIcon />
          <div className='x-tooltip x-tooltip-right x-tooltip-up-sm x-tooltip-up-right-sm'>
            Search
          </div>
        </a>
        <NavLink to='/admin/add-project' data-table-tooltip=''>
          <AddIcon />
          <div className='x-tooltip x-tooltip-right x-tooltip-up-sm'>
            Add Project
          </div>
        </NavLink>
        <NavLink to='/admin/manage-project' data-table-tooltip=''>
          <ImportIcon />
          <div className='x-tooltip x-tooltip-right x-tooltip-up-sm'>
            Manage Project
          </div>
        </NavLink>
        <NavLink to='/my-settings' data-table-tooltip=''>
          <SettingsIcon />
          <div className='x-tooltip x-tooltip-right x-tooltip-up-sm'>
            Settings
          </div>
        </NavLink>
        <IfPrimiumUser>
          <NavLink to='/x-studio' data-table-tooltip=''>
            <div className='x-tooltip x-tooltip-right x-tooltip-up-sm'>
              Open XStudio
            </div>
            <ScriptIcon />
          </NavLink>
        </IfPrimiumUser>
        <div className='dropdown-divider' />
        <NavLink to='/profile' data-table-tooltip=''>
          <div className='x-tooltip x-tooltip-right x-tooltip-up-sm x-tooltip-up-left-sm'>
            My Profile
          </div>
          {auth?.user?.image ? (
            <img
              className='profile-control-img'
              src={`${env['REACT_APP_BASE_URL']}${auth?.user?.image}`}
            />
          ) : (
            <img className='profile-control-img' src={profileImg} />
          )}
        </NavLink>
      </div>
    </IfAdmin>
  ) : (
    ''
  );
};
export default Controls;
