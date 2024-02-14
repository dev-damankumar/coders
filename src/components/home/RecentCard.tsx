import { NavLink } from 'react-router-dom';
import { useAuth } from '../../providers/Auth';
import { Project } from '../../types';
import { baseImageSrc } from '../../constants';
import Image from '../ui/Image';

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
  const imgSrc: string = baseImageSrc || '';
  return (
    <div className='item'>
      <div className='project-box'>
        <div className='row'>
          <div className='col-lg-7 col-md-6 col-sm-12'>
            <div className='image'>
              <Image loading='lazy' src={image} alt={`slider-img_${index}`} />
              <div className='project-overlay' />
            </div>
          </div>
          <div className='col-md-5'>
            <div className='content'>
              <h6 className='sub-title'>
                <a href='#'>Best Projects</a>
              </h6>
              <h4>
                <NavLink to={auth?.user ? url : '/login'}>{title}</NavLink>
              </h4>
              <div className='platform'>
                {tags.map((tag, tagIndex) => {
                  return (
                    <span className='plat' key={`tag_${tagIndex}`}>
                      # {tag}
                    </span>
                  );
                })}
              </div>
              <p>{description}</p>
              <div className='image-gallery'>
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
                className='button btn read-more'
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
