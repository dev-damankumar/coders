import coverImg from '../../assets/images/main-2.jpg';
import EditRowIcon from '../../assets/icons/EditRowIcon';
import If from '../If/If';
import { env } from '../../utils';
import { useAuth } from '../../providers/Auth';
import { TUploadImageType } from '../../pages/Profile/Profile';

type CoverImageType = {
  showModalHandler: (arg: TUploadImageType) => void;
  publicProfile?: boolean;
};
const CoverImage = ({ showModalHandler, publicProfile }: CoverImageType) => {
  const auth = useAuth();
  return (
    <div className={`profile-img-wrap`}>
      <img
        className='profile-img'
        src={
          auth?.user?.cover
            ? `${env['REACT_APP_BASE_URL']}${auth?.user?.cover}`
            : coverImg
        }
      />
      <If cond={!publicProfile}>
        <button
          className='edit-cover-profile-btn edit-profile-btn'
          onClick={() => showModalHandler('cover')}
        >
          <EditRowIcon />
        </button>
      </If>
    </div>
  );
};

export default CoverImage;
