import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../providers/Auth';
import { Project } from '../../../types';
import Image from '../../ui/Image';
import classes from './index.module.css';

type RecentProjectProps = Project & {
  index: number;
};
const RecentCard = ({
  imageGrid,
  description,
  tags,
  title,
  url,
  image,
  index,
}: RecentProjectProps) => {
  const auth = useAuth();
  return (
    <div className='item'>
      <div className={classes.recentCard}>
        <div className='row'>
          <div className='col-lg-7 col-md-6 col-sm-12'>
            <div className={classes.image}>
              <Image loading='lazy' src={image} alt={`slider-img_${index}`} />
              <div className={classes.projectOverlay} />
            </div>
          </div>
          <div className='col-md-5'>
            <div className={classes.content}>
              <h6 className={classes.subTitle}>
                <a href='#'>Best Projects</a>
              </h6>
              <h4>
                <NavLink to={auth?.user ? url : '/login'}>{title}</NavLink>
              </h4>
              <div className={classes.platform}>
                {tags.map((tag, tagIndex) => {
                  return <span key={`tag_${tagIndex}`}># {tag}</span>;
                })}
              </div>
              <p>{description}</p>
              <div className={classes.imageGallery}>
                {imageGrid?.map((img, imgIndex: number) => {
                  if (imgIndex < 2) {
                    return (
                      <Image
                        loading='lazy'
                        alt={img}
                        key={imgIndex}
                        src={img}
                      />
                    );
                  }
                })}
              </div>
              <NavLink
                className={`button btn ${classes.readMore}`}
                to={auth?.user ? url : '/login'}
              >
                Read More
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentCard;
