import ProfileIcon from '../../assets/icons/ProfileIcon';
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

const UserProfileInfo = (props: CoverImageType) => {
  const auth = useAuth();
  let onClickHandler: (arg: TUploadImageType) => void = () => {};
  if ('showModalHandler' in props) {
    onClickHandler = props.showModalHandler;
  }
  const user = props.publicProfile ? props.user : auth.user;
  if (!user) return;
  return (
    <div className='user-wrap'>
      <div className='img-wrap'>
        {user.image ? (
          <img src={`${env['REACT_APP_BASE_URL']}${user.image}`} />
        ) : (
          <ProfileIcon />
        )}
        <If cond={!props.publicProfile}>
          <button
            className='edit-profile-btn'
            onClick={() => onClickHandler(`profile`)}
          >
            <EditRowIcon />
          </button>
        </If>
      </div>
      <div className='user-detail'>
        <h1 className='list-heading'>{user.username}</h1>
        <p className='joined'>{user.email}</p>
        <p className='list-subheading'>
          Mobile: <a href={`tel:${user.mobile}`}> {user.mobile}</a>
        </p>
      </div>
    </div>
  );
};

export default UserProfileInfo;
