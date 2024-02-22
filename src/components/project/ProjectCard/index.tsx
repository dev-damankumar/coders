import React, { useState } from 'react';
import classes from './index.module.css';
import { NavLink } from 'react-router-dom';
import img from '../../../assets/images/placeholder.png';
import Switch from '../../ui/Form/Switch/Switch';
import BinIcon from '../../../assets/icons/BinIcon';
import LinkIcon from '../../../assets/icons/LinkIcon';
import ScriptIcon from '../../../assets/icons/ScriptIcon';
import CopyIcon from '../../../assets/icons/CopyIcon';
import ImportIcon from '../../../assets/icons/ImportIcon';
import PreIcon from '../../../assets/icons/PreIcon';
import IfPrimiumUser from '../../hoc/IfPrimiumUser';
import AuthorCard from '../../author/AuthorCard';
import If from '../../hoc/If';
import Tags from '../../ui/Tags';
import { useAuth } from '../../../providers/Auth';

import { useNotification } from '../../../providers/Notification';
import { Project } from '../../../types';
import { changeProjectVisibility } from '../../../services/project';
import Image from '../../ui/Image';
import Dropdown from '../../ui/Dropdown/Dropdown';
import DropdownToggle from '../../ui/Dropdown/DropdownToggle';
import DropdownMenu from '../../ui/Dropdown/DropdownMenu';
import DropdownMenuItem from '../../ui/Dropdown/DropdownMenuItem';
import Divider from '../../ui/Divider';

export type TypeProjectCard = Project & {
  filterTags: string;
  index: number;
  configHandler: (...args: any[]) => void;
  confirmHandler: (...args: any[]) => void;
  downloadProjectHandler: (...args: any[]) => void;
};

const ProjectCard = ({
  author,
  filterTags,
  visibility,
  description,
  tags,
  title,
  url,
  image,
  index,
  _id,
  ...props
}: TypeProjectCard) => {
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
      const project = await changeProjectVisibility(id, visibility);
      if ('error' in project) return notification.error(project.message);
      notification.success(project.message);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(e.message);
      }
      console.error(e);
    } finally {
      //
    }
  };

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
            <If cond={author._id === auth.user?._id}>
              <IfPrimiumUser>
                <Switch
                  id={'privacy' + _id}
                  name='privacy'
                  value={visible}
                  checked={visible}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setProjectPrivacy(e, _id)
                  }
                />
                <Divider direction='vertical' />
                <Dropdown position='top'>
                  <DropdownToggle>
                    <button className={classes.moreBtn}>
                      <i className='bx bx-dots-vertical-rounded' />
                    </button>
                  </DropdownToggle>
                  <DropdownMenu position='after'>
                    <DropdownMenuItem
                      onClick={() => props.confirmHandler(_id, 'clone')}
                    >
                      <div className={classes.menuItem}>
                        <CopyIcon width={20} height={20} />
                        <span>Make a Copy</span>
                      </div>
                    </DropdownMenuItem>
                    <Divider />
                    <DropdownMenuItem onClick={() => props.configHandler(_id)}>
                      <div className={classes.menuItem}>
                        <LinkIcon width={20} height={20} />
                        <span>Get pre-filled link</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <NavLink to={`/x-studio/${_id}`}>
                        <div className={classes.menuItem}>
                          <ScriptIcon width={20} height={20} />
                          <span>Coders editor</span>
                        </div>
                      </NavLink>
                    </DropdownMenuItem>
                    <Divider />
                    <DropdownMenuItem
                      onClick={() => props.downloadProjectHandler(_id)}
                    >
                      <div className={classes.menuItem}>
                        <ImportIcon width={20} height={20} />
                        <span>Download</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <NavLink to={`/admin/edit-project/${_id}`}>
                        <div className={classes.menuItem}>
                          <PreIcon width={20} height={20} />
                          <span>Preferences</span>
                        </div>
                      </NavLink>
                    </DropdownMenuItem>
                    {author?._id === auth?.user?._id && (
                      <DropdownMenuItem
                        onClick={() => props.confirmHandler(_id, 'delete')}
                      >
                        <div className={classes.menuItem}>
                          <BinIcon width={20} height={20} />
                          <span>Move to bin</span>
                        </div>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
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
