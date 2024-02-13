import {
  getSubscriptionImageByType,
  getSubscriptionName,
} from '../../../utils/';
import { NavLink } from 'react-router-dom';
import { DModal } from '../../../utils/dModal';
import { useAuth } from '../../../providers/Auth';

let toast = Toast();
const ManageSubscription = () => {
  let auth = useAuth();

  let confirmHandler = () => {
    DModal({
      heading: `Unsubscribe from ProjectX`,
      size: 'sm',
      headerIcon: <i className='bx bx-x'></i>,
      successButtonText: 'Unsubscribe',
      body: (
        <p className={`confirm-msg`}>
          Are you sure you want to unsubscribe doing so will delete your
          subscription and is not refundable?
        </p>
      ),
      onSuccess: async (e) => {
        // let response = await unsubscribe();
        if (response.type === 'error') {
          return toast.error(response.message);
        } else {
          auth.logout(e);
          return toast.success(response.message);
        }
      },
    });
  };
  return (
    <div className='subscription-div text-center'>
      <img src={getSubscriptionImageByType(auth?.user?.type)} />
      <h1 className='name-subs'>{auth?.user?.name}</h1>
      <p className='subs-type'>{getSubscriptionName(auth?.user?.type)}</p>
      <h1>You have purchased the subscription</h1>
      <p>
        Welcome to ProjectX. you have successfully purchased the subscription.
        You can access the tools and features of ProjectX based on your
        subscription type. See what features you have{' '}
        <NavLink to='/pricing'>here.</NavLink>
      </p>
      <button
        onClick={confirmHandler}
        style={{ display: 'block', margin: 'auto', marginTop: '15px' }}
        type='button'
        className='btn btn-dark'
      >
        Cancel Subscription
      </button>
    </div>
  );
};

export default ManageSubscription;
