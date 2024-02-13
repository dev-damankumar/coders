import React, { useEffect, useRef, useState, Suspense } from 'react';
import {
  NavLink,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import GetLines from '../../hoc/GetLines';
import Prism from 'prismjs';
import Loading from '../../components/Loading/Loading';
import NoData from '../../components/NoData/NoData';
import IfPrimiumUser from '../../components/IfPrimiumUser';
import { loader, env } from '../../utils';
import If from '../../components/If/If';
import { useAuth } from '../../providers/Auth';
import { FileDetailsType, fetchFileContent } from '../../services/files';
import { copyToClipboard } from '../../helpers';
import { useNotification } from '../../providers/Notification';
const SearchFile = React.lazy(
  () => import('../../components/SearchFile/SearchFile')
);

import '../../assets/css/prism.css';
import './FilePreview.css';

const FilePreview = React.memo(() => {
  const params = useParams();
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const notification = useNotification();
  const projectId = params.id!;
  const query = new URLSearchParams(location.search);
  const filename = decodeURIComponent(query.get('filename') || '');
  const filepath = decodeURIComponent(query.get('filepath') || '');
  const isStandardAndAbove = auth.user?.type === 1 || auth.user?.type === 2;
  const [fileData, setfileData] = useState<FileDetailsType<string> | null>(
    null
  );
  const name = filename || 'index.html';
  const [prevPath, setPrevPath] = useState(filepath || '/');
  const [files, setFiles] = useState(location.state?.files || []);
  const getFileLines = fileData?.data?.split('\n')?.length;
  const codeRef = useRef<HTMLElement>(null);

  const fetchFileContentHandler = async (name: string, prevPath?: string) => {
    loader.show();
    if (!projectId) {
      notification.add({
        type: 'error',
        message: 'Can not find project',
      });
      navigate('/');
      return;
    }
    const details = await fetchFileContent<string>(
      name,
      projectId,
      prevPath || ''
    );
    if ('error' in details) {
      return notification.add({
        type: 'error',
        message: details.message,
      });
    }

    setPrevPath(details.prevPath);

    if (details.mimeType !== 'folder') {
      setfileData({ ...details, name });
    } else {
      setFiles(details.data);
    }
    loader.hide();
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [fileData]);

  useEffect(() => {
    if (files.length === 0) {
      fetchFileContentHandler('', prevPath);
    }
  }, [files]);

  useEffect(() => {
    fetchFileContentHandler(name, prevPath);
  }, []);

  const copyHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (codeRef.current) {
      const isCopied = copyToClipboard(codeRef.current.innerText);
      if (isCopied) return notification.success('Text Copied Successfully');
      notification.error('Error while copying');
    }
  };

  let code = (
    <GetLines data={fileData?.data || ''}>
      <div className='code-edit-container'>
        <pre className='code-output'>
          <code ref={codeRef} className={`language-${fileData?.extension}`}>
            {fileData?.data}
          </code>
        </pre>
      </div>
    </GetLines>
  );

  if (fileData?.mimeType === 'image') {
    code = <img src={'data:image/jpeg;base64,' + fileData?.data} />;
  }

  if (fileData?.extension === 'pdf') {
    code = (
      <iframe
        className='pdf-preview'
        src={[env.REACT_APP_BASE_URL, fileData?.data].join('/')}
      />
    );
  }

  function download(filename: string, text: string) {
    if (isStandardAndAbove) {
      var element = document.createElement('a');
      element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
      );
      element.setAttribute('download', filename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  }

  const downloadFile = (e: React.MouseEvent) => {
    if (!fileData) return;
    e.preventDefault();
    download(fileData.name, fileData.data);
  };

  if (!projectId) {
    notification.add({
      type: 'error',
      message: 'Project id missing.',
    });
    return <Navigate to='/' />;
  }
  return (
    <>
      <div className='file-preview-page'>
        <section
          className='section form-creation-wrap'
          style={{ paddingTop: '10px', paddingBottom: '20px' }}
        >
          <section className='x-div'>
            <div className='container'>
              <div className='row'>
                <If
                  cond={fileData === null}
                  else={<NoData if={!fileData?.data} />}
                >
                  <Loading />
                </If>

                <If cond={!!fileData && !!fileData?.data}>
                  <div className='col-md-12'>
                    <div className='code-preview dark-preview'>
                      <div className='code-preview-header'>
                        <h3>
                          <NavLink to={`/xcode/${projectId}`}>
                            <button type='button' className='gobackBtn'>
                              <i className='bx bx-chevron-left' />
                            </button>
                          </NavLink>
                          <span className='file-name-para'>
                            {fileData?.name}
                          </span>
                          <span>
                            <i className='bx bx-chevron-right' /> {getFileLines}{' '}
                            lines
                            <i className='bx bx-chevron-right' />{' '}
                            {fileData?.size}
                          </span>
                        </h3>
                        <div className='action-code-div'>
                          <div className='x-search-wrap'>
                            <Suspense fallback={<Loading />}>
                              <SearchFile
                                files={files}
                                setFiles={setFiles}
                                prevPath={prevPath}
                                fetchFileContentHandler={
                                  fetchFileContentHandler
                                }
                              />
                            </Suspense>
                          </div>
                          <a
                            href='#'
                            onClick={copyHandler}
                            data-table-tooltip-bottom='true'
                            data-table-tooltip='Copy'
                            className='header-btn code-action-btn'
                          >
                            <i className='bx bx-clipboard' />
                          </a>
                          <IfPrimiumUser>
                            <NavLink
                              to='/x-studio'
                              data-table-tooltip-bottom='true'
                              data-table-tooltip='Goto X Studio Code'
                              className='header-btn code-action-btn'
                            >
                              <i className='bx bx-code-alt' />
                            </NavLink>
                            <a
                              onClick={downloadFile}
                              data-table-tooltip-bottom='true'
                              data-table-tooltip='Download'
                              className='header-btn code-action-btn'
                            >
                              <i className='bx bx-download' />
                            </a>
                          </IfPrimiumUser>
                        </div>
                      </div>
                      <div className='code-preview-body'>{code}</div>
                      <div className='code-preview-footer'>
                        <div className='code-button-div'>
                          <IfPrimiumUser>
                            <a
                              type='button'
                              onClick={downloadFile}
                              className='btn btn-primary btn-small'
                            >
                              Download
                            </a>
                          </IfPrimiumUser>
                          <NavLink
                            to={`/xcode/${projectId}`}
                            className='btn btn-dark btn-small'
                          >
                            Go Back
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </If>
              </div>
            </div>
          </section>
        </section>
      </div>
    </>
  );
});

export default FilePreview;
