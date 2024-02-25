import { useState } from 'react';
import classes from './ProjectConfig.module.css';
import useModal from '../../../hooks/useModal';
import { useParams } from 'react-router-dom';
import { downloadProject } from '../../../services/project';
import { useAuth } from '../../../providers/Auth';
import { useNotification } from '../../../providers/Notification';
import { siteUrl } from '../../../constants';
import QRCode from '../../ui/QRCode';

type ProjectConfigType = {
  isAuthor: boolean;
};
const ProjectConfig = ({ isAuthor }: ProjectConfigType) => {
  const { modal } = useModal();
  const params = useParams();
  const auth = useAuth();
  const notification = useNotification();
  const projectId = params.id!;
  let [isCopy, setCopy] = useState(false);

  const downloadHandler = async (id: string) => {
    if (!(isAuthor || auth?.user?.type === 1)) return;
    let data = await downloadProject(id);
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
    modal({
      heading: 'Scan QR Code',
      size: 'xs',
      headerIcon: <i className='bx bx-qr-scan'></i>,
      body: <QRCode value={`${siteUrl}/xcode/${projectId}`} />,
    });
  };
  return (
    <div className='project-congfig-div'>
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
            value={`${siteUrl}/xcode/${projectId}`}
          />

          <button
            type='button'
            data-table-tooltip='Copy'
            className={`${classes[`copy-btn`]} ${
              isCopy ? classes[`active-copy-btn`] : ``
            }`}
            onClick={() => {
              navigator.clipboard.writeText(`${siteUrl}/xcode/${projectId}`);
              setCopy(true);
            }}
          >
            <i className='bx bx-clipboard' />
            <div className='tooltip'>Copy</div>
          </button>
        </div>
        <p className='description'>
          You can download the project directly to your local
        </p>
      </div>
      <div className='dropdown-divider' />
      <a
        href='#'
        onClick={() => downloadHandler(projectId)}
        className={classes['download-item']}
      >
        <i className='bx bxs-download' />
        Download ZIP
      </a>
      <div className='dropdown-divider' />
      <a
        href='#'
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
