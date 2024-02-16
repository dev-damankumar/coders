import { NavLink, useLocation } from 'react-router-dom';
import classes from './index.module.css';
import IfAdmin from '../../hoc/IfAdmin';
import profileImg from '../../../assets/images/profile.svg';
import SearchIcon from '../../../assets/icons/SearchIcon';
import SettingsIcon from '../../../assets/icons/SettingsIcon';
import ScriptIcon from '../../../assets/icons/ScriptIcon';
import AddIcon from '../../../assets/icons/AddIcon';
import ImportIcon from '../../../assets/icons/ImportIcon';
import IfPrimiumUser from '../../hoc/IfPrimiumUser';
import { useAuth } from '../../../providers/Auth';
import { showControls } from '../../../utils/helper';
import Image from '../Image';

const Controls = () => {
  const path = useLocation().pathname;
  const auth = useAuth();
  const show = showControls(path);
  if (!show) return;
  return (
    <IfAdmin>
      <div className={classes.controls}>
        <a href='#open-menu' className={classes.openMenu} data-table-tooltip>
          <SearchIcon />
          <div className='tooltip tooltip-right tooltip-up-sm tooltip-up-right-sm'>
            Search
          </div>
        </a>
        <NavLink to='/admin/add-project' data-table-tooltip>
          <AddIcon />
          <div className='tooltip tooltip-right tooltip-up-sm'>Add Project</div>
        </NavLink>
        <NavLink to='/admin/manage-project' data-table-tooltip>
          <ImportIcon />
          <div className='tooltip tooltip-right tooltip-up-sm'>
            Manage Project
          </div>
        </NavLink>
        <NavLink to='/my-settings' data-table-tooltip>
          <SettingsIcon />
          <div className='tooltip tooltip-right tooltip-up-sm'>Settings</div>
        </NavLink>
        <IfPrimiumUser>
          <NavLink to='/x-studio' data-table-tooltip>
            <div className='tooltip tooltip-right tooltip-up-sm'>
              Open XStudio
            </div>
            <ScriptIcon />
          </NavLink>
        </IfPrimiumUser>
        <div className='dropdown-divider' />
        <NavLink to='/profile' data-table-tooltip>
          <div className='tooltip tooltip-right tooltip-up-sm tooltip-up-left-sm'>
            My Profile
          </div>
          {auth.user?.image ? (
            <Image className={classes.profileImg} src={auth.user?.image} />
          ) : (
            <Image className={classes.profileImg} src={profileImg} />
          )}
        </NavLink>
      </div>
    </IfAdmin>
  );
};
export default Controls;
