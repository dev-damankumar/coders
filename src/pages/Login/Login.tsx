import React, { useState, Suspense, useEffect } from 'react';
import './Login.css';
import loginImg from '../../assets/images/3d-people-1.png';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import SiteLogo from '../../assets/icons/SiteLogo';
import { useAuth } from '../../providers/Auth';
import { validateEmail } from '../../helpers';
import { SubmitHandler, useForm } from 'react-hook-form';
import { login } from '../../services/auth';
import { useNotification } from '../../providers/Notification';

const QRCode = React.lazy(() => import('react-qr-code'));
const Modal = React.lazy(() => import('../../components/Modal/Modal'));

type IFormInput = {
  email: string;
  password: string;
};
function Login() {
  const notification = useNotification();
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [showPassword, setShowPassword] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const auth = useAuth();
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (user) => {
    const data = await login(user.email, user.password);
    if ('error' in data) {
      return notification.add({
        type: 'error',
        message: data.message,
        hold: true,
      });
    }
    auth.login({
      user: data.user,
      token: data.token,
    });
    notification.add({
      type: 'success',
      message: data.message,
    });
    navigation('/');
  };

  return (
    <>
      {auth.user ? (
        <Navigate to='/' />
      ) : (
        <div className='analytics-page main-content login-page qr-wrap'>
          <Suspense fallback={''}>
            <Modal
              heading={`Scan QR Code`}
              headerIcon={<i className='bx bx-qr-scan'></i>}
              show={showQr}
              onClose={() => {
                setShowQr(false);
              }}
              body={
                <div className={`qrdiv`}>
                  <Suspense fallback={<Loading />}>
                    <QRCode value='https://projectx-23927.web.app/login' />
                  </Suspense>
                </div>
              }
            />
          </Suspense>

          <div className='login_section container-fluid'>
            <div className='row'>
              <div className='col-md-6 leftsidecolumn'>
                <div className='leftLoginSide'>
                  <div className='loginLogo'>
                    <SiteLogo />
                  </div>
                  <div className='welcomeback'>
                    Please log into admin account
                  </div>
                  <div
                    className='form-group logininput loginwith'
                    style={{ margin: '0', padding: '0' }}
                  ></div>
                  <div className='or'>
                    <span>Or</span>
                  </div>
                  <div className='loginpart'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className='form-group form-signup'>
                        <div className='valid-wrap'>
                          <label className='inputlabel'>Email Address</label>
                          <input
                            {...register('email', {
                              required: {
                                value: true,
                                message: 'Email is required',
                              },
                              validate: {
                                emailVal: (value) => {
                                  return (
                                    validateEmail(value) ||
                                    'Please enter valid email'
                                  );
                                },
                              },
                            })}
                            placeholder='Email Address'
                            type='text'
                            name='email'
                            className='form-control form-control-lg inputtext'
                          />
                          {errors.email && (
                            <p className='error'>{errors.email.message}</p>
                          )}
                        </div>
                      </div>
                      <div className='form-group'>
                        <div className={'valid-wrap'}>
                          <label className='inputlabel'>Password</label>
                          <input
                            {...register('password', {
                              required: {
                                value: true,
                                message: 'Password is required',
                              },
                              minLength: {
                                value: 5,
                                message:
                                  'Password should be atleast 5 charactors',
                              },
                            })}
                            placeholder='Password'
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            className='form-control form-control-lg inputtext'
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
                      </div>
                      <div className='combvalue'>
                        <NavLink
                          className='dashboard-color'
                          to='/forgot-password'
                        >
                          <span className='forgetpassword'>
                            Forgot Password
                          </span>
                        </NavLink>
                      </div>
                      <div className='form-group logininput'>
                        <button type='submit' className='btn btn-primary'>
                          Login
                        </button>
                        <NavLink to='/register'>
                          <button type={'button'} className='btn-light btn'>
                            <span className='btnGradiant'>Sign Up Free</span>
                          </button>
                        </NavLink>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div
                className='col-md-6 rightsidecolumn'
                style={{ alignItems: 'center', display: 'flex' }}
              >
                <img src={loginImg} className='login-img' alt='hdsf' />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
