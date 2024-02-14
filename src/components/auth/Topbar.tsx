import { NavLink } from 'react-router-dom';
import { useAuth } from '../../providers/Auth';

const Topbar = () => {
  const auth = useAuth();
  return auth.user && !auth.user?.active ? (
    <div className='alert alert-danger subscription-alert'>
      <div className='info-sub-div'>
        <p>
          You account is not yet activated. please complete your registration
        </p>
      </div>
      <NavLink to={`/register`}>
        <button className='btn btn-small btn-dark'>Register Now</button>
      </NavLink>
    </div>
  ) : (
    ''
  );
};

export default Topbar;
