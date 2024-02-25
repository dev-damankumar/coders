import React, { useState } from 'react';
import placeholder from '../../assets/images/placeholder.png';
import Switch from '../../ui/Form/Switch/Switch';
import { useAuth } from '../../../providers/Auth';
import { useNotification } from '../../../providers/Notification';
import { changeProjectVisibility } from '../../../services/project';
import { baseImageSrc } from '../../../constants';
import Image from '../../ui/Image';
import { joinURL } from '../../../utils/helper';
import If from '../../hoc/If';
import { ExtentedProject } from '../../../providers/ProjectProvider';
import ProjectActions from '../ProjectActions';

export type TypeProjectRow = ExtentedProject & {
  filterTags: string;
  index: number;
};

const ProjectRow = ({
  author,
  filterTags,
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
}: TypeProjectRow) => {
  const notification = useNotification();
  const imgSrc: string = baseImageSrc || '';
  const [_, setVisibility] = useState(visibility);

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
        return notification.error(e.message);
      }
      console.error(e);
    } finally {
    }
  };

  const projectRow = (
    <tr>
      <td>
        <a
          href={auth?.user ? '/project-detail/' + _id : '/login'}
          target='_blank'
          className='open-x-code'
        >
          <Image
            alt='dg'
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
            }}
            className='x-file-img'
            src={image}
            defaultImg={placeholder}
          />
          {title}
        </a>
      </td>
      <td>
        <div className='description' data-table-tooltip='Edit Row'>
          {description.slice(0, 40)}
          <div className='tooltip '>{description}</div>
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
          checked={visibility}
        />
      </td>
      <td>
        <div className='img-grid-wrap'>
          {imageGrid?.map((img: string, tagIndex: number) => {
            return (
              <Image
                src={img}
                defaultImg={placeholder}
                key={`img_${tagIndex}`}
              />
            );
          })}
        </div>
      </td>
      <If cond={author._id === auth.user?._id}>
        <ProjectActions id={_id} isAuthor={author._id === auth.user?._id} />
      </If>
    </tr>
  );

  return filterTags
    ? tags.includes(filterTags.toUpperCase()) && projectRow
    : projectRow;
};

export default ProjectRow;
