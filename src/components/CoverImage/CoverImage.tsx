import coverImg from '../../assets/images/main-2.jpg';
import EditRowIcon from '../../assets/icons/EditRowIcon';
import If from '../If/If';
import { env } from '../../utils';
import { User, useAuth } from '../../providers/Auth';
import { TUploadImageType } from '../../pages/Profile/Profile';

type PublicCoverImageProps = {
  publicProfile: true;
  user: User;
};

type PrivateCoverImageProps = {
  publicProfile?: false;
  showModalHandler: (arg: TUploadImageType) => void;
};
type CoverImageType = PublicCoverImageProps | PrivateCoverImageProps;

const CoverImage = (props: CoverImageType) => {
  let onClickHandler: (arg: TUploadImageType) => void = () => {};
  if ('showModalHandler' in props) {
    onClickHandler = props.showModalHandler;
  }
  const auth = useAuth();
  const user = props.publicProfile ? props.user : auth.user;
  console.log('auth', auth);
  return (
    <div className={`profile-img-wrap`}>
      <img
        className='profile-img'
        src={
          user?.cover ? `${env['REACT_APP_BASE_URL']}${user?.cover}` : coverImg
        }
      />
      <If cond={!props.publicProfile}>
        <button
          className='edit-cover-profile-btn edit-profile-btn'
          onClick={() => onClickHandler('cover')}
        >
          <EditRowIcon />
        </button>
      </If>
    </div>
  );
};

export default CoverImage;
