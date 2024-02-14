import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import placeholder from '../../assets/images/placeholder.png';
import Switch from '../Form/Switch/Switch';
import Http from '../../hooks/http';
import DropDown from '../DropDown/DropDown';
import BinIcon from '../../assets/icons/BinIcon';
import LinkIcon from '../../assets/icons/LinkIcon';
import ScriptIcon from '../../assets/icons/ScriptIcon';
import CopyIcon from '../../assets/icons/CopyIcon';
import ImportIcon from '../../assets/icons/ImportIcon';
import PreIcon from '../../assets/icons/PreIcon';
import { env, joinURL, loader } from '../../utils';

import { useAuth } from '../../providers/Auth';
import { Project } from './Projects';
import { useNotification } from '../../providers/Notification';
import IfAdmin from '../IfAdmin/IfAdmin';
import { changeProjectVisibility } from '../../services/project';

export type TypeProjectRow = Project & {
  filterTags: string;
  index: number;
  hideContext: true;
};

type ExtraProjectsProps = Project & {
  filterTags: string;
  index: number;
  hideContext: false;
  configHandler: (...args: any[]) => void;
  confirmHandler: (...args: any[]) => void;
  downloadProjectHandler: (...args: any[]) => void;
};
const ProjectRow = ({
  author,
  filterTags,
  hideContext,
  visibility,
  description,
  executableFile,
  tags,
  title,
  url,
  image,
  index,
  _id,
  imageGrid,
  ...props
}: TypeProjectRow | ExtraProjectsProps) => {
  const notification = useNotification();
  const imgSrc: string = env['REACT_APP_BASE_URL'] || '';
  const [visible, setVisibility] = useState(visibility);
  const auth = useAuth();
  const setProjectPrivacy = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const visibility = !!e.target.checked;
    setVisibility(visibility);
    try {
      loader.show();
      const project = await changeProjectVisibility(_id, !!visibility);
      loader.hide();
      if ('error' in project) return notification.error(project.message);
      notification.error(project.message);
    } catch (e: unknown) {
      if (e instanceof Error) {
        return notification.error(e.message);
      }
      console.error(e);
    }
  };
  let projectActions;
  if (!hideContext) {
    projectActions = [
      {
        name: 'Make a Copy',
        onClick: () =>
          (props as ExtraProjectsProps).confirmHandler(_id, `clone`),
        icon: <CopyIcon />,
      },
      'divider',
      {
        name: 'Get pre-filled link',
        onClick: () => (props as ExtraProjectsProps).configHandler(_id),
        icon: <LinkIcon />,
      },
      {
        name: 'ProjectX editor',
        link: `/x-studio/${_id}`,
        icon: <ScriptIcon />,
      },
      'divider',
      {
        name: 'Download',
        onClick: () =>
          (props as ExtraProjectsProps).downloadProjectHandler(_id),
        icon: <ImportIcon />,
      },
      {
        name: 'Preferences',
        link: `/admin/edit-project/${_id}`,
        icon: <PreIcon />,
      },
    ];
    if (author?._id === auth?.user?._id) {
      projectActions.splice(1, 0, {
        name: 'Move to bin',
        onClick: () =>
          (props as ExtraProjectsProps).confirmHandler(_id, `delete`),
        icon: <BinIcon />,
      });
    }
  }

  const projectRow = (
    <tr>
      <td>
        <a
          href={auth?.user ? '/project-detail/' + _id : '/login'}
          target='_blank'
          className='open-x-code'
        >
          <img
            alt='dg'
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
            }}
            className='x-file-img'
            src={image ? joinURL(imgSrc, image) : placeholder}
          />
          {title}
        </a>
      </td>
      <td>
        <div className='description' data-table-tooltip='Edit Row'>
          {description.slice(0, 40)}
          <div className='x-tooltip '>{description}</div>
        </div>
      </td>
      <td>
        <div className='url-link'>
          <a
            title={joinURL(imgSrc, url, executableFile)}
            target='_blank'
            href={joinURL(imgSrc, url, executableFile)}
          >
            <button
              type='button'
              className='btn btn-small btn-primary live-url-btn'
            >
              Live URL <i className='bx bx-link-external'></i>
            </button>
          </a>
          <a
            title={joinURL(imgSrc, url, executableFile)}
            href={auth?.user ? '/xcode/' + _id : '/admin/login'}
            target='_blank'
          >
            <button
              type='button'
              className='btn btn-small btn-dark live-url-btn'
            >
              Xcode <i className='bx bx-link-external'></i>
            </button>
          </a>
        </div>
      </td>
      <td>{executableFile}</td>
      <td>
        <div className='tags'>
          {tags.map((tag: string, tagIndex: number) => {
            return (
              <div className='tag' key={`tag_${tagIndex}`}>
                {tag}
              </div>
            );
          })}
        </div>
      </td>
      <td>
        <Switch
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setProjectPrivacy(e, _id)
          }
          style={{ marginTop: '12px' }}
          checked={visibility}
        />
      </td>
      <td>
        <div className='img-grid-wrap'>
          {imageGrid?.map((img: string, tagIndex: number) => {
            return (
              <img
                src={img ? joinURL(imgSrc, img) : placeholder}
                key={`img_${tagIndex}`}
              />
            );
          })}
        </div>
      </td>
    </tr>
  );

  return filterTags
    ? tags.includes(filterTags.toUpperCase()) && projectRow
    : projectRow;
};

export default ProjectRow;