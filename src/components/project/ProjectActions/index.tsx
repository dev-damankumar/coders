import { NavLink } from 'react-router-dom';
import BinIcon from '../../../assets/icons/BinIcon';
import ImportIcon from '../../../assets/icons/ImportIcon';
import LinkIcon from '../../../assets/icons/LinkIcon';
import PreIcon from '../../../assets/icons/PreIcon';
import ScriptIcon from '../../../assets/icons/ScriptIcon';
import Divider from '../../ui/Divider';
import Dropdown from '../../ui/Dropdown/Dropdown';
import DropdownToggle from '../../ui/Dropdown/DropdownToggle';
import DropdownMenu from '../../ui/Dropdown/DropdownMenu';
import DropdownMenuItem from '../../ui/Dropdown/DropdownMenuItem';
import classes from './index.module.css';
import CopyIcon from '../../../assets/icons/CopyIcon';
import useModal from '../../../hooks/useModal';
import { cloneProject, deleteProject } from '../../../services/project';
import { useNotification } from '../../../providers/Notification';

const ProjectActions = ({
  id,
  isAuthor,
}: {
  id: string;
  isAuthor: boolean;
}) => {
  const { modal } = useModal();
  const notification = useNotification();
  const cloneProjectHandler = async () => {
    const data = await cloneProject(id);
    if ('error' in data) {
      return notification.error(data.message);
    }
    console.log('data', data);
    notification.success(data.message);
  };

  const deleteProjectHandler = async () => {
    const data = await deleteProject(id);
    if ('error' in data) {
      return notification.error(data.message);
    }
    console.log('data', data);
    notification.success(data.message);
  };
  const confirmHandler = (type: 'delete' | 'clone') => {
    modal({
      heading: type === 'delete' ? 'Delete Project' : 'Clone Project',
      size: 'sm',
      headerIcon:
        type === 'delete' ? (
          <i className='bx bxs-trash'></i>
        ) : (
          <i className='bx bx-copy-alt'></i>
        ),
      successButtonText: type === 'delete' ? 'Delete' : 'Clone',
      body: (
        <p className={`confirm-msg`}>
          Are you sure you want {type === 'delete' ? 'delete' : 'clone'} this
          project?
        </p>
      ),
      onSuccess: async () => {
        if (type === 'delete') {
          await deleteProjectHandler();
        } else {
          cloneProjectHandler();
        }
      },
    });
  };
  return (
    <Dropdown position='top'>
      <DropdownToggle>
        <button className={classes.moreBtn}>
          <i className='bx bx-dots-vertical-rounded' />
        </button>
      </DropdownToggle>
      <DropdownMenu position='after'>
        <DropdownMenuItem
          onClick={() => {
            console.log('ok');
            confirmHandler('clone');
          }}
        >
          <div className={classes.menuItem}>
            <CopyIcon width={20} height={20} />
            <span>Make a Copy</span>
          </div>
        </DropdownMenuItem>
        <Divider />
        <DropdownMenuItem>
          <div className={classes.menuItem}>
            <LinkIcon width={20} height={20} />
            <span>Get pre-filled link</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink to={`/x-studio/${id}`}>
            <div className={classes.menuItem}>
              <ScriptIcon width={20} height={20} />
              <span>Coders editor</span>
            </div>
          </NavLink>
        </DropdownMenuItem>
        <Divider />
        <DropdownMenuItem>
          <div className={classes.menuItem}>
            <ImportIcon width={20} height={20} />
            <span>Download</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NavLink to={`/admin/edit-project/${id}`}>
            <div className={classes.menuItem}>
              <PreIcon width={20} height={20} />
              <span>Preferences</span>
            </div>
          </NavLink>
        </DropdownMenuItem>
        {isAuthor && (
          <DropdownMenuItem
            onClick={() => {
              confirmHandler('delete');
            }}
          >
            <div className={classes.menuItem}>
              <BinIcon width={20} height={20} />
              <span>Move to bin</span>
            </div>
          </DropdownMenuItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProjectActions;
