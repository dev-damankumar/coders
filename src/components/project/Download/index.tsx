import React, { Suspense, useEffect, useState } from 'react';
import Loading from '../../ui/Loading';
import ImportIcon from '../../../assets/icons/ImportIcon';
import classes from './Download.module.css';
import { downloadProject } from '../../../services/project';
const Modal = React.lazy(() => import('../../ui/Modal/Modal'));

const Download = ({ start = false, id }: { start: boolean; id: string }) => {
  const [state, setState] = useState({ showDownload: start, progress: 0 });

  const setProgressbarValue = (payload: {
    receivedLength: number;
    length: number;
    done: boolean;
  }) => {
    const { receivedLength, length } = payload;
    const value = Number(((receivedLength / length) * 100).toFixed(2));
    if (!isNaN(value)) {
      setState({
        ...state,
        progress: value,
      });
      return value;
    }
  };

  useEffect(() => {
    setState({
      ...state,
      showDownload: start,
    });
  }, [start]);

  const onClose = () => {
    setState({
      ...state,
      showDownload: false,
    });
  };

  useEffect(() => {
    if (!id) return;
    if (state.showDownload) {
      (async () => {
        await downloadProject(id);
      })();
      window.addEventListener('fetch-progress', (e: any) => {
        setProgressbarValue(e.detail);
      });
      window.addEventListener('fetch-finished', (e: any) => {
        console.log('finished', e.detail);
        setProgressbarValue(e.detail);
        setTimeout(() => {
          onClose();
        }, 1000);
      });
    }
  }, [state.showDownload]);
  return (
    <Suspense fallback={<Loading />}>
      <Modal
        heading='Downloading...'
        headerIcon={<i className='bx bx-cloud-download' />}
        show={state.showDownload}
        size='sm'
        hideSuccessButton
        onClose={() => {
          setState({
            ...state,
            showDownload: false,
          });
        }}
        body={
          <div className={`${classes.download}`}>
            <ImportIcon width={50} height={50} />
            <p>
              Your file is downloading. It will take some time please wait...
            </p>
            <div className='progress'>
              <div
                className='progress-bar'
                style={{ width: state.progress + `%` }}
              >
                <span className={`progress-span`}>{state.progress}%</span>
              </div>
            </div>
          </div>
        }
      />
    </Suspense>
  );
};

export default Download;
