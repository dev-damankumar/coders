import { useState, useEffect } from 'react';
import '../Login/Login.css';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import Loading from '../../components/ui/Loading';
import SiteLogo from '../../assets/icons/SiteLogo';
import loginImg from '../../assets/images/3d-people-1.png';
import If from '../../components/hoc/If';
import { useNotification } from '../../providers/Notification';
import { SubmitHandler, useForm } from 'react-hook-form';
import { isValidResetToken, resetPassword } from '../../services/auth';

type TResetPasswordFormInputs = {
  password: string;
  confirmPassword: string;
};
function ResetPassword() {
  const notification = useNotification();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TResetPasswordFormInputs>();
  const [success, setSuccess] = useState(false);

  const [showResetForm, setshowResetForm] = useState(false);
  const { id } = useParams();
  const resetForgotHandler = () => {};

  const onSubmit: SubmitHandler<TResetPasswordFormInputs> = async (user) => {
    if (!id) return;

    const data = await resetPassword(user.password, id);
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
  };

  useEffect(() => {
    (async () => {
      if (!id) return navigate('/');
      let data = await isValidResetToken(id);
      if (data.type === 'success') {
        setshowResetForm(true);
      } else {
        notification.add({
          type: 'error',
          message: 'Your token has been expired',
        });
        setshowResetForm(false);
        navigate('/');
      }
    })();
  }, []);
  if (!id) return <Navigate to='/' />;
  return (
    <If cond={showResetForm} else={<Loading />}>
      <If cond={success}>
        <Navigate to='/' />
      </If>
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
                      Reset Password
                    </div>
                    <p className='des-for'>
                      All set now you can reset your password. please enter you
                      new password below
                    </p>
                  </div>
                </div>
                <div className='loginpart'>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-group form-signup'>
                      <div className='valid-wrap'>
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
                          type='password'
                          placeholder='Enter Password'
                          name='password'
                          id='password'
                          className='form-input inputtext'
                        />
                        {errors.password && (
                          <p className='error'>{errors.password.message}</p>
                        )}
                      </div>
                    </div>
                    <div className='form-group form-signup'>
                      <div className='valid-wrap'>
                        <label className='inputlabel'>Confirm Password</label>
                        <input
                          {...register('confirmPassword', {
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
                          type='password'
                          placeholder='Enter Confirm Password'
                          name='confirmPassword'
                          id='confirmPassword'
                          className='form-input inputtext'
                        />
                        {errors.confirmPassword && (
                          <p className='error'>
                            {errors.confirmPassword.message}
                          </p>
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
                            Reset Password
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div
              className='col-md-6 rightsidecolumn'
              style={{ alignItems: 'center', display: 'flex' }}
            >
              <img src={loginImg} className='login-img' alt='login' />
            </div>
          </div>
        </div>
      </div>
    </If>
  );
}

export default ResetPassword;
