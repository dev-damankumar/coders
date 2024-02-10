import { useState } from 'react';
import QRCode from 'react-qr-code';
import classes from './ProjectConfig.module.css';
import { DModal } from '../../utils/dModal';
import { env } from '../../utils';
import { useParams } from 'react-router-dom';
import { downloadProject } from '../../services/project';
import { useAuth } from '../../providers/Auth';
import { useNotification } from '../../providers/Notification';
import { FileType } from '../../pages/Xcode/Xcode';
import { XcodeReducerActionType } from '../../reducers/xcodeReducer';

type ProjectConfigType = {
  isAuthor: boolean;
  dispatch: React.Dispatch<XcodeReducerActionType>;
};
const ProjectConfig = ({ isAuthor, dispatch }: ProjectConfigType) => {
  const params = useParams();
  const auth = useAuth();
  const notification = useNotification();
  const projectId = params.id!;
  let [isCopy, setCopy] = useState(false);

  const downloadHandler = async (id: string) => {
    if (!(isAuthor || auth?.user?.type === 1)) return;
    let data = await downloadProject(id, dispatch);
    if (data?.type === 'error')
      return notification.add({
        type: 'error',
        message: data.message,
      });
    notification.add({
      type: 'error',
      message: data.message,
    });
  };

  const scanQr = () => {
    DModal({
      heading: 'Scan QR Code',
      size: 'xs',
      headerIcon: <i className='bx bx-qr-scan'></i>,
      body: (
        <div className={`qr-wrap`}>
          <div className={`qrdiv`}>
            <QRCode value={`${env['REACT_APP_WEB_URL']}/xcode/${projectId}`} />
          </div>
        </div>
      ),
    });
  };
  return (
    <div className={`project-congfig-div`}>
      <div className={`download-div ${classes['download-div']}`}>
        <p>
          <i className='bx bx-code-block' /> Clone
        </p>
        <p className={classes[`url-label`]}>Live Url</p>
        <div className={classes['url-group']}>
          <input
            spellCheck='false'
            type='text'
            readOnly
            value={`${env['REACT_APP_WEB_URL']}/xcode/${projectId}`}
          />

          <button
            type='button'
            data-table-tooltip='Copy'
            className={`${classes[`copy-btn`]} ${
              isCopy ? classes[`active-copy-btn`] : ``
            }`}
            onClick={() => {
              navigator.clipboard.writeText(
                `${env['REACT_APP_WEB_URL']}/xcode/${projectId}`
              );
              setCopy(true);
            }}
          >
            <i className='bx bx-clipboard' />
            <div className='x-tooltip'>Copy</div>
          </button>
        </div>
        <p className={classes['sub-para']}>
          You can download the project directly to your local
        </p>
      </div>
      <div className='dropdown-divider' />
      <a
        href='#action'
        onClick={() => downloadHandler(projectId)}
        className={classes['download-item']}
      >
        <i className='bx bxs-download' />
        Download ZIP
      </a>
      <div className='dropdown-divider' />
      <a
        href='#action'
        onClick={(e) => {
          e.preventDefault();
          scanQr();
        }}
        className={classes['download-item']}
      >
        <i className='bx bx-barcode-reader' />
        Scan QR Code
      </a>
    </div>
  );
};

export default ProjectConfig;
