import getSiteName from '../../utils/getSiteName';
import { useAuth } from '../../providers/Auth';

const SocialInfo = () => {
  const auth = useAuth();
  return (
    <div className='points-wrap'>
      <a
        target={
          getSiteName(auth.user?.socials?.website || '') ? '_blank' : '_self'
        }
        href={auth?.user?.socials?.website || '#'}
        className='point-card'
      >
        <i className='bx bx-globe' />
        <div className='point-info'>
          <h1>Website</h1>
          <h1 className='avg-rating'>
            <i className='bx bxs-star' />
            <i className='bx bxs-star' />
            <i className='bx bxs-star' />
            <i className='bx bxs-star' />
            <i className='bx bxs-star no-star' />
          </h1>
          <p>
            {getSiteName(auth?.user?.socials?.website || '') ||
              'Enter your website URL'}
          </p>
        </div>
      </a>
      <div className='point-card'>
        <i className='bx bxl-github' />
        <a
          target={
            getSiteName(auth?.user?.socials?.github || '') ? '_blank' : '_self'
          }
          href={auth?.user?.socials?.github || '#'}
          className='point-info'
        >
          <h1>Github</h1>
          <h1 className='avg-rating'>
            <i className='bx bxs-star' />
            <i className='bx bxs-star' />
            <i className='bx bxs-star' />
            <i className='bx bxs-star' />
            <i className='bx bxs-star no-star' />
          </h1>
          <p>
            {getSiteName(auth?.user?.socials?.github || '') ||
              'Enter your git URL'}
          </p>
        </a>
      </div>
      <div className='point-card'>
        <i className='bx bxl-facebook-circle' />
        <a
          target={
            getSiteName(auth?.user?.socials?.facebook || '')
              ? '_blank'
              : '_self'
          }
          href={auth?.user?.socials?.facebook || '#'}
          className='point-info'
        >
          <h1>Facebook</h1>
          <h1 className='avg-rating'>
            <i className='bx bxs-star' />
            <i className='bx bxs-star' />
            <i className='bx bxs-star' />
            <i className='bx bxs-star' />
            <i className='bx bxs-star no-star' />
          </h1>
          <p>
            {getSiteName(auth?.user?.socials?.facebook || '') ||
              'Enter your facebook URL'}
          </p>
        </a>
      </div>
    </div>
  );
};

export default SocialInfo;
