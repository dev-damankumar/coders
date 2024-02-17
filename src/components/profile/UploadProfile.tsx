import { useState } from 'react';
import { useNotification } from '../../providers/Notification';
import { useAuth } from '../../providers/Auth';
import { updateProfile } from '../../services/user';
import If from '../hoc/If';
import { TUploadImageType } from '../../pages/Profile/Profile';
import coverImg from '../../assets/images/main-2.jpg';
import FileInput from '../ui/FileInput';

const UploadProfile = ({
  closeModel,
  type,
}: {
  closeModel: () => void;
  type: TUploadImageType;
}) => {
  const auth = useAuth();
  const notification = useNotification();
  const [fileImg, setFileImg] = useState<File | null>(null);
  const [_, setSelected] = useState(false);
  const [previewImg, setPreviewImg] = useState('');

  const uploadHandler = async () => {
    if (!fileImg) return;
    let form = new FormData();
    if (type === 'cover') {
      form.append('cover', fileImg);
    } else {
      form.append('profileImage', fileImg);
    }
    try {
      const data = await updateProfile(form);
      if ('error' in data) {
        notification.add({
          message: data.message,
          type: 'error',
        });
        return;
      }

      auth.dispatch({
        type: 'SET_USER',
        payload: data.data,
      });
      localStorage.setItem(
        'user',
        JSON.stringify({ ...auth.user, ...data.data })
      );
      setSelected(false);
      setPreviewImg('');
      setFileImg(null);
      closeModel();
      notification.add({
        message: 'Image Set Successfully',
        type: 'success',
      });
    } catch (e) {
      if (e instanceof Error)
        notification.add({
          message: e.message,
          type: 'success',
        });
    } finally {
    }
  };

  return (
    <>
      <div
        className={`upload-wrap ${
          previewImg ? 'upload-wrap-with-preview' : ''
        }`}
      >
        <FileInput
          onPreview={setPreviewImg}
          onUpload={setFileImg}
          selectedHandler={setSelected}
        />
      </div>
      <div className='footerWrapper'>
        <div className='d-modal-wrap'>
          <If cond={!!previewImg}>
            <div className={`preview-img`}>
              <img src={previewImg ? previewImg : coverImg} />
              <div className={`preview-info`} data-table-tooltip='Copy'>
                <h5 title={fileImg?.name}>{fileImg?.name}</h5>
                <div className='tooltip tooltip-dark tooltip-up'>
                  {fileImg?.name}
                </div>
                <span>{fileImg?.type}</span>
              </div>
            </div>
          </If>
        </div>
        <button
          className='btn btn-small btn-primary'
          type='button'
          onClick={uploadHandler}
        >
          Upload
        </button>
        <button className='btn btn-small btn-dark' onClick={() => closeModel()}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default UploadProfile;
