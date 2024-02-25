import { useState } from 'react';
import classes from './ProjectConfig.module.css';
import useModal from '../../../hooks/useModal';
import { useParams } from 'react-router-dom';
import { siteUrl } from '../../../constants';
import QRCode from '../../ui/QRCode';
import Download from '../Download';

const ProjectConfig = () => {
  const { modal } = useModal();
  const params = useParams();
  const projectId = params.id!;
  const [isCopy, setCopy] = useState(false);
  const [startDownload, setStartDownload] = useState(false);

  const downloadHandler = async () => {
    setStartDownload(true);
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
    <div className='project-config-div'>
      <Download id={projectId} start={startDownload} />
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
        onClick={() => downloadHandler()}
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
