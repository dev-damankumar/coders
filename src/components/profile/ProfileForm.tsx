import { SubmitHandler, useForm } from 'react-hook-form';
import { SocialLinksType, setSocials } from '../../services/user';
import { useNotification } from '../../providers/Notification';
import { useAuth } from '../../providers/Auth';
import { loader } from '../../utils';
import { validateUrl } from '../../helpers';

type TProfileLinksInputs = SocialLinksType;

const ProfileForm = ({ closeModal }: { closeModal: () => void }) => {
  const notification = useNotification();
  const auth = useAuth();
  console.log('auth', auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProfileLinksInputs>({
    defaultValues: {
      facebook: auth.user?.socials?.facebook || '',
      github: auth.user?.socials?.github || '',
      instagram: auth.user?.socials?.instagram || '',
      linkedin: auth.user?.socials?.linkedin || '',
      website: auth.user?.socials?.website || '',
      youtube: auth.user?.socials?.youtube || '',
    },
  });
  const onSubmit: SubmitHandler<TProfileLinksInputs> = async (socials) => {
    loader.show();
    try {
      const data = await setSocials(socials);
      if ('error' in data) {
        return notification.add({
          type: 'error',
          message: data.message,
          hold: true,
        });
      }

      auth.setSocials(data.data);
      notification.add({
        type: 'success',
        message: data.message,
        hold: true,
      });
      closeModal();
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
      <div className='form-body-wrap'>
        <div className='form-group'>
          <div className='valid-wrap'>
            <label className='inputlabel'>Website</label>
            <input
              {...register('website', {
                required: {
                  value: true,
                  message: 'Website is required',
                },
                validate: {
                  urlVal: (value) => {
                    return validateUrl(value) || 'Please enter valid url';
                  },
                },
              })}
              placeholder='Enter Website URL'
              type='text'
              name='website'
              className='form-control form-control-lg input'
            />
            {errors.website && (
              <p className='error'>{errors.website.message}</p>
            )}
          </div>
        </div>
        <div className='form-group'>
          <div className='valid-wrap'>
            <label className='inputlabel'>Facebook</label>
            <input
              {...register('facebook', {
                required: {
                  value: true,
                  message: 'Facebook is required',
                },
                validate: {
                  urlVal: (value) => {
                    return validateUrl(value) || 'Please enter valid url';
                  },
                },
              })}
              placeholder='Enter Facebook URL'
              type='text'
              name='facebook'
              className='form-control form-control-lg input'
            />
            {errors.facebook && (
              <p className='error'>{errors.facebook.message}</p>
            )}
          </div>
        </div>
        <div className='form-group'>
          <div className='valid-wrap'>
            <label className='inputlabel'>Github</label>
            <input
              {...register('github', {
                required: {
                  value: true,
                  message: 'Github is required',
                },
                validate: {
                  urlVal: (value) => {
                    return validateUrl(value) || 'Please enter valid url';
                  },
                },
              })}
              placeholder='Enter Github URL'
              type='text'
              name='github'
              className='form-control form-control-lg input'
            />
            {errors.github && <p className='error'>{errors.github.message}</p>}
          </div>
        </div>
        <div className='form-group'>
          <div className='valid-wrap'>
            <label className='inputlabel'>Instagram</label>
            <input
              {...register('instagram', {
                required: {
                  value: true,
                  message: 'Instagram is required',
                },
                validate: {
                  urlVal: (value) => {
                    return validateUrl(value) || 'Please enter valid url';
                  },
                },
              })}
              placeholder='Enter Instagram URL'
              type='text'
              name='instagram'
              className='form-control form-control-lg input'
            />
            {errors.instagram && (
              <p className='error'>{errors.instagram.message}</p>
            )}
          </div>
        </div>
        <div className='form-group'>
          <div className='valid-wrap'>
            <label className='inputlabel'>Linkedin</label>
            <input
              {...register('linkedin', {
                required: {
                  value: true,
                  message: 'Linkedin is required',
                },
                validate: {
                  urlVal: (value) => {
                    return validateUrl(value) || 'Please enter valid url';
                  },
                },
              })}
              placeholder='Enter Linkedin URL'
              type='text'
              name='linkedin'
              className='form-control form-control-lg input'
            />
            {errors.linkedin && (
              <p className='error'>{errors.linkedin.message}</p>
            )}
          </div>
        </div>
        <div className='form-group'>
          <div className='valid-wrap'>
            <label className='inputlabel'>Youtube</label>
            <input
              {...register('youtube', {
                required: {
                  value: true,
                  message: 'Youtube is required',
                },
                validate: {
                  urlVal: (value) => {
                    return validateUrl(value) || 'Please enter valid url';
                  },
                },
              })}
              placeholder='Enter Youtube URL'
              type='text'
              name='youtube'
              className='form-control form-control-lg input'
            />
            {errors.youtube && (
              <p className='error'>{errors.youtube.message}</p>
            )}
          </div>
        </div>
      </div>
      <div className='d-modal-wrap'>
        <div className='d-modal-button-div'>
          <button className='btn btn-small btn-primary' type='submit'>
            Submit
          </button>
          <button
            className='btn btn-small btn-dark'
            onClick={() => closeModal()}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
