import { getSiteName } from '../../utils/helper';
import { useAuth } from '../../providers/Auth';
import { SocialLinksType } from '../../services/user';

type PublicSocialInfoProps = {
  publicProfile: true;
  socials: SocialLinksType;
};

type PrivateSocialInfoProps = {
  publicProfile?: false;
};
type SocialInfoType = PublicSocialInfoProps | PrivateSocialInfoProps;

const SocialInfo = (props: SocialInfoType) => {
  const auth = useAuth();
  const socials = props.publicProfile ? props.socials : auth.user?.socials;
  if (!socials) return;
  return (
    <div className='points-wrap'>
      {socials.website && (
        <div className='point-card'>
          <i className='bx bx-globe' />
          <a
            target={getSiteName(socials.website || '') ? '_blank' : '_self'}
            href={socials.website || '#'}
            className='point-info'
          >
            <h1>Website</h1>
            <h1 className='avg-rating'>
              <i className='bx bxs-star' />
              <i className='bx bxs-star' />
              <i className='bx bxs-star' />
              <i className='bx bxs-star' />
              <i className='bx bxs-star no-star' />
            </h1>
            <p>
              {getSiteName(socials.website || '') || 'No website URL found'}
            </p>
          </a>
        </div>
      )}
      {socials.github && (
        <div className='point-card'>
          <i className='bx bxl-github' />
          <a
            target={getSiteName(socials.github || '') ? '_blank' : '_self'}
            href={socials.github || '#'}
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
            <p>{getSiteName(socials.github || '') || 'Enter your git URL'}</p>
          </a>
        </div>
      )}
      {socials.facebook && (
        <div className='point-card'>
          <i className='bx bxl-facebook-circle' />
          <a
            target={getSiteName(socials.facebook || '') ? '_blank' : '_self'}
            href={socials.facebook || '#'}
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
              {getSiteName(socials.facebook || '') || 'Enter your facebook URL'}
            </p>
          </a>
        </div>
      )}
    </div>
  );
};

export default SocialInfo;
