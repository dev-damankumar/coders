import React, { useState, Suspense, useEffect } from 'react';
import './Profile.css';
import { NavLink } from 'react-router-dom';
import IfAdmin from '../../components/hoc/IfAdmin';
import UserProfileInfo from '../../components/profile/UserProfileInfo';
import SocialInfo from '../../components/profile/SocialInfo';
import SocialIcons from '../../components/profile/SocialIcons';
import CoverImage from '../../components/profile/CoverImage';
import Heading from '../../components/ui/Heading';
import Loading from '../../components/ui/Loading';
import ImgIcon from '../../assets/icons/ImgIcon';
import LinkIcon from '../../assets/icons/LinkIcon';
import If from '../../components/hoc/If';
import ProfileForm from '../../components/profile/ProfileForm';
import UploadProfile from '../../components/profile/UploadProfile';
import { useAuth } from '../../providers/Auth';

const Modal = React.lazy(() => import('../../components/ui/Modal'));

const MySettings = React.lazy(
  () => import('../../components/profile/MySettings/MySettings')
);
const AddProject = React.lazy(
  () => import('../../pages/Admin/AddProject/AddProject')
);
const MyProfile = React.lazy(
  () => import('../../components/profile/MyProfile')
);
const ManageProjects = React.lazy(
  () => import('../../pages/Admin/ManageProjects/ManageProjects')
);

export type TUploadImageType = 'profile' | 'cover';
const Profile = React.memo((props: { tab: string }) => {
  const auth = useAuth();
  const tab = props.tab;
  const [showModal, setshowModal] = useState(false);
  const [uploadType, setUploadType] = useState<TUploadImageType>('profile');
  const [showSocialModal, setshowSocialModal] = useState(false);

  let showModalHandler = (type: TUploadImageType) => {
    setUploadType(type);
    setshowModal(true);
  };

  useEffect(() => {
    if (tab !== 'profile') {
      document
        .querySelector('#main-scroll')!
        .scrollIntoView({ behavior: 'smooth' });
    }
  }, [tab]);

  const openSocialModal = () => {
    setshowSocialModal(true);
  };
  if (!auth.user) {
    location.href = '/login';
    return;
  }
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Modal
          heading='Upload Profile Image'
          headerIcon={<ImgIcon />}
          show={showModal}
          body={
            <UploadProfile
              type={uploadType}
              closeModel={() => setshowModal(false)}
            />
          }
          size='md'
          onClose={() => setshowModal(false)}
          hideFooter
        />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Modal
          heading='Upload your social links'
          headerIcon={<LinkIcon />}
          show={showSocialModal}
          body={
            <ProfileForm
              closeModal={() => {
                setshowSocialModal(false);
              }}
            />
          }
          size='md'
          onClose={() => setshowSocialModal(false)}
          hideFooter
        />
      </Suspense>
      <section
        className='section form-creation-wrap profile-section-main'
        style={{ paddingTop: '10px' }}
      >
        <div className='discussion-section'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='profile-wrap'>
                  <CoverImage showModalHandler={showModalHandler} />
                  <div className='profile-info'>
                    <UserProfileInfo showModalHandler={showModalHandler} />
                    <SocialInfo />
                  </div>
                  <div
                    className='user-profile-main-div mb-hide'
                    id='main-scroll'
                  >
                    <div className='follow-user-div'>
                      <button
                        onClick={openSocialModal}
                        className='btn btn-primary'
                      >
                        Edit Social Links
                      </button>
                    </div>
                    <SocialIcons />
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
                          <i className='bx bxs-user-circle' />
                          <span>My Profile</span>
                        </NavLink>
                      </li>
                      <li className='nav-item'>
                        <NavLink
                          className={`nav-link ${
                            tab === 'my-settings' ? 'active' : ''
                          }`}
                          data-toggle='tab'
                          to='/my-settings'
                        >
                          <i className='bx bxs-cog' />
                          <span>My Settings</span>
                        </NavLink>
                      </li>
                      <IfAdmin>
                        <li className='nav-item'>
                          <NavLink
                            className={`nav-link ${
                              tab === 'add-project' ? 'active' : ''
                            }`}
                            data-toggle='tab'
                            to='/admin/add-project'
                          >
                            <i className='bx bxs-add-to-queue' />
                            <span>Add Project</span>
                          </NavLink>
                        </li>
                        <li className='nav-item'>
                          <NavLink
                            className={`nav-link ${
                              tab === 'manage-project' ? 'active' : ''
                            }`}
                            data-toggle='tab'
                            to='/admin/manage-project'
                          >
                            <i className='bx bx-customize' />
                            <span>Manage Project</span>
                          </NavLink>
                        </li>
                        {/*<IfStandardUser>
                                                <li className="nav-item">
                                                    <NavLink
                                                        className={`nav-link ${tab === "manage-subscription" ? "active" : ""}`}
                                                        data-toggle="tab" to="/admin/manage-subscription"
                                                    >
                                                        <i className='bx bx-dollar-circle'/>
                                                        <span>Manage Subscription</span>
                                                    </NavLink>
                                                </li>
                                            </IfStandardUser>*/}
                      </IfAdmin>
                    </ul>
                  </div>
                </div>
                <div className='tab-content profile-tab-content'>
                  <If cond={tab === 'profile'}>
                    <div
                      id='my-profile'
                      className={`container tab-pane ${
                        tab === 'profile' ? 'tab-open' : 'fade'
                      }`}
                    >
                      <Heading>My Profile</Heading>
                      <Suspense fallback={<div></div>}>
                        <MyProfile />
                      </Suspense>
                    </div>
                  </If>
                  <If cond={tab === 'my-settings'}>
                    <div
                      id='my-settings'
                      className={`container tab-pane ${
                        tab === 'my-settings' ? 'tab-open' : 'fade'
                      }`}
                    >
                      <h3>
                        My <span className='highlight-span'>Settings</span>
                      </h3>
                      <div className={'settings-wrap'}>
                        <Suspense fallback={<div></div>}>
                          <MySettings />
                        </Suspense>
                      </div>
                    </div>
                  </If>
                  <IfAdmin>
                    <If cond={tab === 'add-project'}>
                      <div
                        id='add-project'
                        className={`container tab-pane ${
                          tab === 'add-project' ? 'tab-open' : 'fade'
                        }`}
                      >
                        <Heading>Add Project</Heading>
                        <div className={'settings-wrap'}>
                          <Suspense fallback={<div></div>}>
                            <AddProject />
                          </Suspense>
                        </div>
                      </div>
                    </If>
                    <If cond={tab === 'manage-project'}>
                      <div
                        id='manage-project'
                        className={`container tab-pane ${
                          tab === 'manage-project' ? 'tab-open' : 'fade'
                        }`}
                      >
                        <Heading style={{ marginBottom: '30px' }}>
                          Manage Project
                        </Heading>
                        <Suspense fallback={<div></div>}>
                          <ManageProjects />
                        </Suspense>
                      </div>
                    </If>

                    {/* <IfStandardUser>
                                        <div id="manage-subscription"
                                             className={`container tab-pane ${tab === "manage-subscription" ? "tab-open" : "fade"}`}>
                                            <Heading style={{marginBottom: "30px"}}>Manage Subscription</Heading>
                                            <Suspense fallback={<div></div>}>
                                                <ManageSubscription/>
                                            </Suspense>
                                        </div>
                                    </IfStandardUser>*/}
                  </IfAdmin>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});
export default Profile;
