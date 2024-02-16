import { getSubscriptionName } from '../../utils/helper';
import If from '../hoc/If';
import { User, useAuth } from '../../providers/Auth';

type PublicProfileProps = {
  publicProfile: true;
  user: User;
};

type PrivateProfileProps = {
  publicProfile?: false;
};
type MyProfileType = PublicProfileProps | PrivateProfileProps;
const MyProfile = (props: MyProfileType) => {
  const auth = useAuth();
  const user = props.publicProfile ? props.user : auth.user;
  return (
    <div className='profile-main-card'>
      <div className='card-body'>
        <div className='row'>
          <div className='col-sm-3'>
            <h5 className='mb-0'>Name</h5>
          </div>
          <div className='col-sm-9 text-secondary'>
            {user?.username || 'N/A'}
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className='col-sm-3'>
            <h5 className='mb-0'>Email</h5>
          </div>
          <div className='col-sm-9 text-secondary'>{user?.email || 'N/A'}</div>
        </div>

        <If cond={!props.publicProfile}>
          <hr />
          <div className='row'>
            <div className='col-sm-3'>
              <h5 className='mb-0'>Subscription</h5>
            </div>
            <div className='col-sm-9 text-secondary'>
              {getSubscriptionName(user?.type || 1) || 'N/A'}
            </div>
          </div>
        </If>
        <hr />
        <div className='row'>
          <div className='col-sm-3'>
            <h5 className='mb-0'>Mobile</h5>
          </div>
          <div className='col-sm-9 text-secondary'>{user?.mobile || 'N/A'}</div>
        </div>
        <hr />
        <div className='row'>
          <div className='col-sm-3'>
            <h5 className='mb-0'>Address</h5>
          </div>
          <div className='col-sm-9 text-secondary'>
            {user?.address || 'N/A'}
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className='col-sm-3'>
            <h5 className='mb-0'>City</h5>
          </div>
          <div className='col-sm-9 text-secondary'>{user?.city || 'N/A'}</div>
        </div>
        <hr />
        <div className='row'>
          <div className='col-sm-3'>
            <h5 className='mb-0'>Country</h5>
          </div>
          <div className='col-sm-9 text-secondary'>
            {user?.country || 'N/A'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
