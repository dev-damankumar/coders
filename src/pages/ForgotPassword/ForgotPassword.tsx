import { useState } from 'react';
import '../Login/Login.css';
import { NavLink } from 'react-router-dom';
import SiteLogo from '../../assets/icons/SiteLogo';
import SaveRowIcon from '../../assets/icons/SaveRowIcon';
import loginImg from '../../assets/images/3d-people-1.png';
import { loader } from '../../utils/loader';
import If from '../../components/hoc/If';
import { forgotPassword } from '../../services/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNotification } from '../../providers/Notification';
import { validateEmail } from '../../utils/helper';

type TForgotPasswordFormInputs = {
  email: string;
};
function ForgotPassword() {
  const notification = useNotification();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgotPasswordFormInputs>();
  const [success, setSuccess] = useState(false);

  const resetForgotHandler = () => {};

  const onSubmit: SubmitHandler<TForgotPasswordFormInputs> = async (user) => {
    loader.show();
    try {
      const data = await forgotPassword(user.email);
      if ('error' in data) {
        return notification.add({
          type: 'error',
          message: data.message,
          hold: true,
        });
      }
      notification.add({
        type: 'success',
        message: data.message,
      });

      setSuccess(true);
      resetForgotHandler();
    } catch (error) {
      return notification.add({
        type: 'error',
        message: 'unexpected error on forgot password',
        hold: true,
      });
    } finally {
      loader.hide();
    }
  };

  return (
    <>
      <div className='analytics-page main-content forgot-page login-page'>
        <div className='login_section container-fluid'>
          <div className='row'>
            <div className='col-md-12' />
          </div>
          <div className='row'>
            <div className='col-md-6 leftsidecolumn'>
              <div className='leftLoginSide'>
                <div className='loginLogo'>
                  <SiteLogo />
                  <div className='welcomeback' style={{ marginTop: '20px' }}>
                    <div style={{ marginBottom: '0' }} className='welcomeback'>
                      Forgot Password ??
                    </div>
                    <p className='des-for'>
                      In case your forgot your password you can always reset it
                      by entering the email below
                    </p>
                  </div>
                </div>
                <If
                  cond={!success}
                  else={
                    <div className='success-payment'>
                      <SaveRowIcon />
                      <h2>Mail has been sent successfully!</h2>
                      <p>Now you can open your email inbox to reset it</p>
                      <a href='/'>
                        <button type='button' className='btn btn-success'>
                          Go to Home
                        </button>
                      </a>
                    </div>
                  }
                >
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

                      <div className='form-group logininput'>
                        <div className='row'>
                          <div className='col-md-12'>
                            <button
                              type='submit'
                              className='btn btn-primary forgot-btn'
                              style={{ width: '100%' }}
                            >
                              Send Email
                            </button>
                          </div>
                          <div className='col-md-12'>
                            <div className='or'>
                              <span>Or</span>
                            </div>
                            <div className='register-btn-div'>
                              <NavLink to='/login'>
                                <button
                                  type='submit'
                                  className='btn'
                                  style={{
                                    background: 'var(--info)',
                                    color: 'white',
                                  }}
                                >
                                  Login
                                </button>
                              </NavLink>
                              <NavLink to='/register'>
                                <button type='submit' className='btn btn-dark'>
                                  Register
                                </button>
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </If>
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
    </>
  );
}

export default ForgotPassword;
