import { SubmitHandler, useForm } from 'react-hook-form';
import {
  SocialLinksType,
  setSocials,
  updateProfile,
} from '../../services/user';
import { useNotification } from '../../providers/Notification';
import { User, useAuth } from '../../providers/Auth';
import { loader } from '../../utils';
import { validateUrl } from '../../helpers';
import FileUpload from '../file-upload';

export type TProfileInputs = Omit<
  User,
  | '_id'
  | 'profileCompletion'
  | 'active'
  | 'type'
  | 'errorStep'
  | 'socials'
  | 'email'
  | 'username'
  | 'password'
>;

const SettingsForm = () => {
  const notification = useNotification();
  const auth = useAuth();
  console.log('auth', auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProfileInputs>({
    defaultValues: {
      firstname: auth.user?.firstname || '',
      lastname: auth.user?.lastname || '',
      address: auth.user?.address || '',
      city: auth.user?.city || '',
      country: auth.user?.country || '',
      mobile: auth.user?.mobile || 0,
      cover: auth.user?.cover || undefined,
      image: auth.user?.image || undefined,
    },
  });
  const onSubmit: SubmitHandler<TProfileInputs> = async (user) => {
    loader.show();
    try {
      const data = await updateProfile(user);
      if ('error' in data) {
        return notification.add({
          type: 'error',
          message: data.message,
          hold: true,
        });
      }

      auth.setUser(data.data);
      notification.add({
        type: 'success',
        message: data.message,
        hold: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        notification.add({
          type: 'error',
          message: error.message,
          hold: true,
        });
      }
    } finally {
      loader.hide();
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=''>
        <div className='form-group'>
          <div className='valid-wrap'>
            <label className='inputlabel'>First Name</label>
            <input
              {...register('firstname', {
                required: {
                  value: true,
                  message: 'First Name is required',
                },
              })}
              placeholder='Enter First Name URL'
              type='text'
              name='firstname'
              className='form-control form-control-lg input'
            />
            {errors.firstname && (
              <p className='error'>{errors.firstname.message}</p>
            )}
          </div>
        </div>
        <div className='form-group'>
          <div className='valid-wrap'>
            <label className='inputlabel'>Last Name</label>
            <input
              {...register('lastname', {
                required: {
                  value: true,
                  message: 'Last Name is required',
                },
              })}
              placeholder='Enter Last Name URL'
              type='text'
              name='lastname'
              className='form-control form-control-lg input'
            />
            {errors.lastname && (
              <p className='error'>{errors.lastname.message}</p>
            )}
          </div>
        </div>
        <div className='form-group'>
          <div className='valid-wrap'>
            <label className='inputlabel'>Mobile</label>
            <input
              {...register('mobile', {
                required: {
                  value: true,
                  message: 'Mobile is required',
                },
              })}
              placeholder='Enter Mobile URL'
              type='text'
              name='mobile'
              className='form-control form-control-lg input'
            />
            {errors.mobile && <p className='error'>{errors.mobile.message}</p>}
          </div>
        </div>
        <div className='form-group'>
          <div className='valid-wrap'>
            <label className='inputlabel'>Address</label>
            <input
              {...register('address', {
                required: {
                  value: true,
                  message: 'Address is required',
                },
              })}
              placeholder='Enter Address URL'
              type='text'
              name='address'
              className='form-control form-control-lg input'
            />
            {errors.address && (
              <p className='error'>{errors.address.message}</p>
            )}
          </div>
        </div>
        <div className='form-group'>
          <div className='valid-wrap'>
            <label className='inputlabel'>City</label>
            <input
              {...register('city', {
                required: {
                  value: true,
                  message: 'City is required',
                },
              })}
              placeholder='Enter City URL'
              type='text'
              name='city'
              className='form-control form-control-lg input'
            />
            {errors.city && <p className='error'>{errors.city.message}</p>}
          </div>
        </div>
        <div className='form-group'>
          <div className='valid-wrap'>
            <label className='inputlabel'>Country</label>
            <input
              {...register('country', {
                required: {
                  value: true,
                  message: 'Country is required',
                },
              })}
              placeholder='Enter Country URL'
              type='text'
              name='country'
              className='form-control form-control-lg input'
            />
            {errors.country && (
              <p className='error'>{errors.country.message}</p>
            )}
          </div>
        </div>

        <div className='form-group'>
          <div className='valid-wrap'>
            <label className='inputlabel'>Profile Image</label>
            <FileUpload
              {...register('image', {
                required: {
                  value: true,
                  message: 'Profile Image is required',
                },
              })}
              defaultImage={auth.user?.image}
              placeholder='Enter Profile Image URL'
              type='text'
              name='image'
              id='image'
              className='form-control form-control-lg input'
            />

            {errors.image && <p className='error'>{errors.image.message}</p>}
          </div>
        </div>
        <div className='form-group'>
          <div className='valid-wrap'>
            <label className='inputlabel'>Cover Image</label>
            <FileUpload
              {...register('cover', {
                required: {
                  value: true,
                  message: 'Cover Image is required',
                },
              })}
              defaultImage={auth.user?.cover}
              placeholder='Enter Cover Image URL'
              type='text'
              name='cover'
              id='cover'
              className='form-control form-control-lg input'
            />
            {errors.cover && <p className='error'>{errors.cover.message}</p>}
          </div>
        </div>
      </div>
      <div className='d-modal-wrap'>
        <div className='d-modal-button-div'>
          <button className='btn btn-small btn-primary' type='submit'>
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default SettingsForm;
