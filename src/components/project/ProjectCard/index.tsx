import React, { useState } from 'react';
import classes from './index.module.css';
import { NavLink } from 'react-router-dom';
import img from '../../../assets/images/placeholder.png';
import Switch from '../../ui/Form/Switch/Switch';
import IfPrimiumUser from '../../hoc/IfPrimiumUser';
import AuthorCard from '../../author/AuthorCard';
import If from '../../hoc/If';
import Tags from '../../ui/Tags';
import { useAuth } from '../../../providers/Auth';
import { useNotification } from '../../../providers/Notification';
import { changeProjectVisibility } from '../../../services/project';
import Image from '../../ui/Image';
import Divider from '../../ui/Divider';
import ProjectActions from '../ProjectActions';
import { ExtentedProject } from '../../../providers/ProjectProvider';

export type TypeProjectCard = ExtentedProject & {
  filterTags: string;
  index: number;
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
}: TypeProjectCard) => {
  const notification = useNotification();
  const [visible, setVisibility] = useState(visibility);
  const auth = useAuth();
  const isAuthor = author._id === auth.user?._id;

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
        <div className='dropdown-divider' />
        <div className={classes.footer}>
          <AuthorCard
            id={author._id}
            name={author.username}
            src={author.image}
            isAuthor={isAuthor}
          />
          <If cond={isAuthor}>
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
              <ProjectActions id={_id} isAuthor={isAuthor} />
            </IfPrimiumUser>
          </If>
        </div>
      </div>
    </div>
  );

  return filterTags
    ? tags.includes(filterTags.toUpperCase()) && projectCard
    : projectCard;
};

export default ProjectCard;
