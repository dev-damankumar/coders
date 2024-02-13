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
const SocialIcons = (props: SocialInfoType) => {
  const auth = useAuth();
  const socials = props.publicProfile ? props.socials : auth.user?.socials;
  if (!socials) return;
  return (
    <div className='social-wrap'>
      <p className='mb-hide'>Follow me on</p>
      <div className='social-icon-wrap'>
        <a target='_blank' href={socials?.youtube} className='youtube'>
          <i className='bx bxl-youtube' />
        </a>
        <a target='_blank' href={socials?.linkedin} className='linkedin'>
          <i className='bx bxl-linkedin' />
        </a>
        <a target='_blank' href={socials?.instagram} className='instagram'>
          <i className='bx bxl-instagram' />
        </a>
        <a target='_blank' href={socials?.facebook} className='facebook'>
          <i className='bx bxl-facebook' />
        </a>
      </div>
    </div>
  );
};

export default SocialIcons;
