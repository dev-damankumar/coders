import React, { useEffect, useState } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
// import { GoogleLogin } from "react-google-login";
import SiteLogo from '../../assets/icons/SiteLogo';
import Steps from '../../components/ui/Steps/Steps';
import SaveRowIcon from '../../assets/icons/SaveRowIcon';
import If from '../../components/hoc/If';
import { User, useAuth } from '../../providers/Auth';
import '../Login/Login.css';
import {
  register as registerHandler,
  registerProfile,
} from '../../services/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { validateEmail } from '../../utils/helper';
import { useNotification } from '../../providers/Notification';

export interface IRegisterFormInput {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  mobile: string;
  city: string;
  country: string;
  address: string;
}

export interface IRegisterProfileInput {
  profileImage: string;
  cover: string;
}

function Register() {
  const auth = useAuth();
  const notification = useNotification();
  const profileUser: User = JSON.parse(
    localStorage.getItem('profile_user') || '{}'
  );
  let stepsArray: any = [];
  if (profileUser?.profileCompletion) {
    const count = Number(profileUser?.profileCompletion);
    const countArray = Array.from('x'.repeat(count));
    stepsArray = countArray.map((v, i) => {
      return `step-${i + 1}`;
    });
  }
  const [initialStep, setNextStep] = useState(
    profileUser?.profileCompletion
      ? Number(profileUser?.profileCompletion) + 1
      : 1
  );
  const [done, setDone] = useState(stepsArray);
  const [errorStep, setErrorStep] = useState(
    profileUser ? profileUser.errorStep : null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormInput>();

  const {
    register: profileForm,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm<IRegisterProfileInput>();
  const [showPassword, setShowPassword] = useState(false);

  const resetEveryThing = () => {
    localStorage.removeItem('profile_user');
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const saveLocalSteps = (user: User) => {
    localStorage.setItem('profile_user', JSON.stringify(user));
  };
  const continueNextStep = (user: User) => {
    const nextStep = user.profileCompletion + 1;
    saveLocalSteps(user);
    setNextStep(nextStep);
  };

  const handleErrorForCurrentStep = () => {};

  const onProfileSubmitHandler = async (form: any) => {
    if (!profileUser._id) return;
    auth.logout({});

    const payload = new FormData();
    payload.append('id', profileUser._id);
    payload.append('cover', form.cover[0]);
    payload.append('profileImage', form.profileImage[0]);
    const data = await registerProfile(payload);

    if ('error' in data) {
      return handleErrorForCurrentStep();
    }

    continueNextStep(data.user);
  };

  const onSubmitRegisterHandler: SubmitHandler<IRegisterFormInput> = async (
    form
  ) => {
    const data = await registerHandler(form);
    if ('error' in data) {
      return handleErrorForCurrentStep();
    }
    notification.add({
      type: data.type,
      message: data.message,
    });
    continueNextStep(data.user);
  };

  const steps = [
    <div key='step-1' id='step-1'>
      <div className='loginpart'>
        <form
          onSubmit={handleSubmit(onSubmitRegisterHandler)}
          action='#'
          className='upload-img-form row'
          encType=''
          style={{ padding: 10 }}
        >
          <div className='form-group col-md-6  '>
            <label className='inputlabel' htmlFor='name'>
              Firstname:
            </label>
            <input
              {...register('firstname', {
                required: {
                  value: true,
                  message: 'Firstname is required',
                },
              })}
              type='text'
              placeholder='Enter Your Firstname'
              name='firstname'
              id='firstname'
              className='form-input inputtext'
            />
            {errors.firstname && (
              <p className='error'>{errors.firstname.message}</p>
            )}
          </div>
          <div className='form-group col-md-6  '>
            <label className='inputlabel' htmlFor='name'>
              Lastname:
            </label>
            <input
              {...register('lastname', {
                required: {
                  value: true,
                  message: 'Lastname is required',
                },
              })}
              type='text'
              placeholder='Enter Your Lastname'
              name='lastname'
              id='lastname'
              className='form-input inputtext'
            />
            {errors.lastname && (
              <p className='error'>{errors.lastname.message}</p>
            )}
          </div>
          <div className='form-group col-md-6  '>
            <label className='inputlabel' htmlFor='mobile'>
              Mobile:
            </label>
            <input
              {...register('mobile', {
                required: {
                  value: true,
                  message: 'Mobile number is required',
                },
              })}
              type='tel'
              placeholder='Enter Mobile Number'
              name='mobile'
              id='mobile'
              className='form-input inputtext'
            />
            {errors.mobile && <p className='error'>{errors.mobile.message}</p>}
          </div>
          <div className='form-group col-md-6  '>
            <label className='inputlabel' htmlFor='email'>
              Email:
            </label>
            <input
              {...register('email', {
                required: {
                  value: true,
                  message: 'Email is required',
                },
                validate: {
                  emailVal: (value) => {
                    return validateEmail(value) || 'Please enter valid email';
                  },
                },
              })}
              type='email'
              placeholder='Enter Email'
              name='email'
              id='email'
              className='form-input inputtext'
            />
            {errors.email && <p className='error'>{errors.email.message}</p>}
          </div>
          <div className='form-group col-md-6  '>
            <label className='inputlabel' htmlFor='password'>
              Password:
            </label>
            <input
              {...register('password', {
                required: {
                  value: true,
                  message: 'Password is required',
                },
                minLength: {
                  value: 5,
                  message: 'Password should be atleast 5 charactors',
                },
              })}
              type='password'
              placeholder='Enter Password'
              name='password'
              id='password'
              className='form-input inputtext'
            />
            {errors.password && (
              <p className='error'>{errors.password.message}</p>
            )}
            <button
              type={'button'}
              onClick={togglePassword}
              className={'show-password'}
            >
              {showPassword ? (
                <i className='bx bxs-show'></i>
              ) : (
                <i className='bx bxs-hide'></i>
              )}
            </button>
          </div>
          <div className='form-group col-md-6  '>
            <label className='inputlabel' htmlFor='city'>
              City:
            </label>
            <input
              {...register('city', {
                required: {
                  value: true,
                  message: 'City is required',
                },
              })}
              type='text'
              placeholder='Enter City'
              name='city'
              id='city'
              className='form-input inputtext'
            />
            {errors.city && <p className='error'>{errors.city.message}</p>}
          </div>
          <div className='form-group col-md-6  '>
            <label className='inputlabel' htmlFor='country'>
              Country:
            </label>
            <input
              {...register('country', {
                required: {
                  value: true,
                  message: 'Country is required',
                },
              })}
              type='text'
              placeholder='Enter Country'
              name='country'
              id='country'
              className='form-input inputtext'
            />
            {errors.country && (
              <p className='error'>{errors.country.message}</p>
            )}
          </div>
          <div className='form-group col-md-12  '>
            <label className='inputlabel' htmlFor='address'>
              Address:
            </label>
            <textarea
              {...register('address', {
                required: {
                  value: true,
                  message: 'Address is required',
                },
              })}
              placeholder='Enter Address'
              name='address'
              id='address'
              className='form-input inputtext'
            />
            {errors.address && (
              <p className='error'>{errors.address.message}</p>
            )}
          </div>
          <div className='form-group col-md-12'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='register-btn-div'>
                  <button type='submit' className='btn btn-primary'>
                    Register
                  </button>
                  <div
                    className='form-group logininput loginwith'
                    style={{ margin: '0', padding: '0' }}
                  >
                    {/* <GoogleLogin
                      clientId="904156776688-of8bknffbq813fnreqoi0cb7eb4qtjpa.apps.googleusercontent.com"
                      render={(renderProps) => (
                        <button
                          disabled={renderProps.disabled}
                          onClick={() => {
                            loader.show();
                            renderProps.onClick();
                          }}
                          type="submit"
                          className="mr-4 google-btn"
                        >
                          <img src={googleImg} alt="google" /> Continue with
                          Google
                        </button>
                      )}
                      onSuccess={(r, i) => {
                        auth.socialSignUp(r, onSignUpSuccess);
                      }}
                      onFailure={(r) => {
                        auth.socialSignUp(r, onSignUpSuccess);
                        loader.hide();
                      }}
                      cookiePolicy={"single_host_origin"}
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>,
    <div key='step-2' id='step-2'>
      <If cond={profileUser.profileCompletion === 1} else={<Navigate to='/' />}>
        <form
          onSubmit={handleProfileSubmit(onProfileSubmitHandler)}
          action='#'
          className='upload-img-form'
          encType='multipart/form-data'
          style={{ padding: 10 }}
        >
          <div className='form-group  form-file-group '>
            <label className='' htmlFor='profileImage'>
              Select Profile Image:
            </label>
            <div className='main-file-wrap'>
              <div className='file-make-div '>
                <input
                  {...profileForm('profileImage', {
                    required: {
                      value: true,
                      message: 'Profile is required',
                    },
                  })}
                  type='file'
                  name='profileImage'
                  id='profileImage'
                  accept='image/*'
                />
                <i className='bx bx-plus' />
              </div>
              {profileErrors.profileImage && (
                <p className='error'>{profileErrors.profileImage.message}</p>
              )}
              <div className='preview-img-wrap' />
              <p />
            </div>
          </div>
          <div className='form-group  form-file-group '>
            <label className='' htmlFor='cover'>
              Select Cover Image:
            </label>
            <div className='main-file-wrap'>
              <div className='file-make-div '>
                <input
                  {...profileForm('cover', {
                    required: {
                      value: true,
                      message: 'Cover image is required',
                    },
                  })}
                  type='file'
                  name='cover'
                  id='cover'
                  accept='image/*'
                />
                <i className='bx bx-plus' />
              </div>
              {profileErrors.cover && (
                <p className='error'>{profileErrors.cover.message}</p>
              )}
              <div className='preview-img-wrap' />
              <p />
            </div>
          </div>
          <div className='form-group col-md-12'>
            <div className='row'>
              <div className=''>
                <div className='register-btn-div'>
                  <button type='submit' className='btn btn-primary'>
                    Upload Images
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </If>
    </div>,
    <div key='step-3' id='step-3'>
      <div className='success-payment'>
        <SaveRowIcon />
        <h2>You are registered successfully</h2>
        <p>
          Now you can proceed to your coders account and can grow while you
          develop your projects
        </p>
        <NavLink
          to='/login'
          onClick={() => {
            resetEveryThing();
          }}
        >
          <button type='button' className='btn btn-success'>
            Go to Coders
          </button>
        </NavLink>
      </div>
    </div>,
  ];

  useEffect(() => {
    if (initialStep >= steps.length) {
      resetEveryThing();
    }
  }, [initialStep]);

  useEffect(() => {
    if (auth.user?._id && auth.user.active) {
      notification.add({
        type: 'warning',
        message:
          'Please logout your current user in order to register new user',
      });
    }
  }, []);

  return auth.user?._id && auth.user.active ? (
    <Navigate to='/' />
  ) : (
    <div className='analytics-page main-content login-page register-page'>
      <div className='login_section'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-7 col-lg-9 col-md-12 leftsidecolumn'>
              <div className='leftLoginSide jumbotron'>
                <div
                  className='loginLogo'
                  style={{
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <SiteLogo />
                  <div
                    className='welcomeback'
                    style={{ marginBottom: '0', marginLeft: '20px' }}
                  >
                    <div style={{ marginBottom: '0' }} className='welcomeback'>
                      Register With Us To Get Started
                    </div>
                  </div>
                </div>

                <Steps
                  titles={[
                    { subTitle: 'Personal Information', title: '' },
                    { subTitle: 'Upload Images', title: '' },
                  ]}
                  errorStep={errorStep}
                  initialStep={initialStep}
                  steps={steps}
                  done={done}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
