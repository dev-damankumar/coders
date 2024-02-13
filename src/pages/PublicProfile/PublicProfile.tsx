import React, { useState, Suspense, useEffect, useRef } from 'react';
import '../Profile/Profile.css';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import UserProfileInfo from '../../components/UserProfileInfo/UserProfileInfo';
import SocialInfo from '../../components/profile/SocialInfo';
import SocialIcons from '../../components/profile/SocialIcons';
import CoverImage from '../../components/CoverImage/CoverImage';
import Heading from '../../components/Heading/Heading';
import Loading from '../../components/Loading/Loading';
import { getPublicProfile } from '../../services/user';
import { User } from '../../providers/Auth';

const MyProfile = React.lazy(
  () => import('../../components/MyProfile/MyProfile')
);

const PublicProfile = React.memo((props: { tab: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  let { id } = useParams();
  let tab = props.tab;
  let navigate = useNavigate();
  let [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getProfile() {
      if (!id) return;
      let user = await getPublicProfile(id);
      if ('error' in user) {
        navigate('/', { replace: true });
        return;
      }
      setUser(user.data);
    }
    getProfile();
  }, []);

  useEffect(() => {
    if (tab === 'profile') return;
    if (!ref.current) return;
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }, [tab]);

  if (!id) return;
  if (!user) return <Loading />;
  return (
    <section
      className='section form-creation-wrap profile-section-main'
      style={{ paddingTop: '10px' }}
    >
      <div className='discussion-section'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='profile-wrap'>
                <CoverImage publicProfile user={user} />
                <div className='profile-info'>
                  <UserProfileInfo publicProfile user={user} />
                  <SocialInfo publicProfile socials={user.socials} />
                </div>
                <div
                  className='user-profile-main-div mb-hide'
                  id='main-scroll'
                  ref={ref}
                >
                  <div className='follow-user-div' />
                  <SocialIcons publicProfile socials={user.socials} />
                </div>
                <div className='profile-tabs'>
                  <ul className='nav-tabs' role='tablist'>
                    <li className='nav-item'>
                      <NavLink
                        className={`nav-link ${
                          tab === 'profile' ? 'active' : ''
                        }`}
                        data-toggle='tab'
                        to='/profile'
                      >
                        <i
                          style={{ marginRight: '10px' }}
                          className='bx bxs-user-circle'
                        />
                        <span style={{ display: 'block' }}>Profile</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='tab-content profile-tab-content'>
                <div
                  id='my-profile'
                  className={`container tab-pane ${
                    tab === 'profile' ? 'tab-open' : 'fade'
                  }`}
                >
                  <Heading>Profile</Heading>
                  <Suspense fallback=''>
                    <MyProfile publicProfile user={user} />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
export default PublicProfile;
