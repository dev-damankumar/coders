import React, { useState } from 'react';
import classes from './index.module.css';
import { NavLink } from 'react-router-dom';
import img from '../../../assets/images/placeholder.png';
import Switch from '../../ui/Form/Switch/Switch';
import DropDown, { TypeList } from '../../ui/DropDown';
import BinIcon from '../../../assets/icons/BinIcon';
import LinkIcon from '../../../assets/icons/LinkIcon';
import ScriptIcon from '../../../assets/icons/ScriptIcon';
import CopyIcon from '../../../assets/icons/CopyIcon';
import ImportIcon from '../../../assets/icons/ImportIcon';
import PreIcon from '../../../assets/icons/PreIcon';
import IfPrimiumUser from '../../hoc/IfPrimiumUser';
import AuthorCard from '../../author/AuthorCard';
import { loader } from '../../../utils';
import If from '../../hoc/If';
import Tags from '../../ui/Tags';
import { useAuth } from '../../../providers/Auth';

import { useNotification } from '../../../providers/Notification';
import { Project } from '../../../types';
import { changeProjectVisibility } from '../../../services/project';
import Image from '../../ui/Image';

export type TypeProjectCard = Project & {
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
const ProjectCard = ({
  author,
  filterTags,
  hideContext,
  visibility,
  description,
  tags,
  title,
  url,
  image,
  index,
  _id,
  ...props
}: TypeProjectCard | ExtraProjectsProps) => {
  const notification = useNotification();
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
      const project = await changeProjectVisibility(id, visibility);
      if ('error' in project) return notification.error(project.message);
      notification.success(project.message);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
      console.error(e);
    } finally {
      loader.hide();
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
        name: 'Codx editor',
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

  const projectCard = (
    <div
      className='col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12'
      id={`slider_${index}`}
    >
      <div className={classes.projectCard}>
        <div className={classes.projectImageWrap}>
          <Image
            loading='lazy'
            src={image}
            defaultImg={img}
            alt={`slider-img_${index}`}
          />
          <div className={classes.projectOverlay} />
        </div>

        <div className={classes.projectDetails}>
          <h3>
            <NavLink to={auth?.user ? url : '/login'}>{title}</NavLink>
          </h3>
          <p>{description.slice(0, 60)}</p>
          <Tags tags={tags} />
        </div>
        <>
          <div className='dropdown-divider' />
          <div className={classes.footer}>
            <AuthorCard
              id={author._id}
              name={author.name}
              src={author.image}
              isOwner={author?._id === auth.user?._id}
            />
            <If cond={!hideContext}>
              <IfPrimiumUser>
                <Switch
                  id={'req' + _id}
                  name='example1'
                  value={visible}
                  checked={visible}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setProjectPrivacy(e, _id)
                  }
                />
                <div className='divider-hr' />
                <DropDown
                  menuClass='dropdown-menu-right card-auth-menu'
                  direction='up'
                  list={projectActions as TypeList[]}
                  name=''
                  icon={<i className='bx bx-dots-vertical-rounded' />}
                />
              </IfPrimiumUser>
            </If>
          </div>
        </>
      </div>
    </div>
  );

  return filterTags
    ? tags.includes(filterTags.toUpperCase()) && projectCard
    : projectCard;
};

export default ProjectCard;
