import { useAuth } from '../../../providers/Auth';
import { SocialLinksType } from '../../../services/user';
import classes from './SocialIcons.module.css';

type PublicSocialInfoProps = {
  publicProfile: true;
  socials: SocialLinksType;
};

type PrivateSocialInfoProps = {
  publicProfile?: false;
};
type SocialInfoType = PublicSocialInfoProps | PrivateSocialInfoProps;
const SocialIcons = (props: SocialInfoType) => {
  const auth = useAuth();
  const socials = props.publicProfile ? props.socials : auth.user?.socials;
  if (!socials) return;
  return (
    <div className={classes.socialWrap}>
      <p className='mb-hide'>Follow me on</p>
      <div className={classes.socialIconWrap}>
        <a
          target='_blank'
          href={socials?.youtube}
          className={`youtube ${classes.socialIcon}`}
        >
          <i className='bx bxl-youtube' />
        </a>
        <a
          target='_blank'
          href={socials?.linkedin}
          className={`linkedin ${classes.socialIcon}`}
        >
          <i className='bx bxl-linkedin' />
        </a>
        <a
          target='_blank'
          href={socials?.instagram}
          className={`instagram ${classes.socialIcon}`}
        >
          <i className='bx bxl-instagram' />
        </a>
        <a
          target='_blank'
          href={socials?.facebook}
          className={`facebook ${classes.socialIcon}`}
        >
          <i className='bx bxl-facebook' />
        </a>
      </div>
    </div>
  );
};

export default SocialIcons;
