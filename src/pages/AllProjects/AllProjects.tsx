import React, { useEffect, useRef, Suspense, useState } from 'react';
import FilterTags from '../../components/project/FilterTags/FilterTags';
import { useLocation } from 'react-router';
import If from '../../components/hoc/If';
import Heading from '../../components/ui/Heading';
import { getProjects } from '../../services/project';
import Projects from '../../components/project/Projects';
import { useProject } from '../../providers/ProjectProvider';
import { useNotification } from '../../providers/Notification';

const Modal = React.lazy(() => import('../../components/ui/Modal/Modal'));
const Pagination = React.lazy(() => import('../../components/ui/Pagination'));

export type ProjectsState = {
  pageNo: number;
  limit: number;
  filterTags: string;
  filterCount: number;
};

const initialState: ProjectsState = {
  pageNo: 1,
  filterTags: '',
  filterCount: 1,
  limit: 5,
};

const AllProjects = React.memo(() => {
  const [state, setState] = useState(initialState);
  const projects = useProject();
  const notification = useNotification();
  const projectRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      let tag = location.hash.replace('#', '');
      if (tag === 'all') {
        tag = '';
      }
      if (tag) {
        const projectCount = projects.projects.list.filter((v) => {
          return v.tags.includes(tag);
        });
        setState({
          ...state,
          filterCount: projectCount.length,
        });
      }
      setState({
        ...state,
        filterTags: tag,
      });
    }
  }, [location.hash]);

  useEffect(() => {
    if (projectRef && projectRef.current) {
      projectRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    window.addEventListener('fetch-progress', (e: any) => {
      setProgressbarValue(e.detail);
    });
  }, []);

  useEffect(() => {
    (async () => {
      projects.projects.setLoading();
      try {
        const result = await getProjects({
          pageNo: state.pageNo,
          limit: state.limit,
        });
        if ('error' in result) {
          return notification.error(result.message);
        }
        const data = result.data;
        projects.projects.setTotal(result.totalCount);
        projects.projects.set(data);
      } catch (e) {
        if (e instanceof Error) return notification.error(e.message);
      } finally {
        if (projectRef && projectRef.current) {
          projectRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }
    })();
  }, [state.pageNo, state.limit]);

  const setProgressbarValue = (payload: {
    receivedLength: number;
    length: number;
    done: boolean;
  }) => {
    const { receivedLength, length } = payload;
    const value = Number(((receivedLength / length) * 100).toFixed(2));
    if (!isNaN(value)) {
      // dispatch({ type: 'SET_PROGRESS', data: value });
      return value;
    }
  };

  const onPagination = (pageNo: number) => {
    projects.projects.setLoading();
    setState({
      ...state,
      pageNo,
    });
    if (projectRef && projectRef.current) {
      projectRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filterHandler = (tag: string) => {
    setState({
      ...state,
      filterTags: tag,
    });
  };

  return (
    <>
      {/* <Suspense fallback={<Loading />}>
        <Modal
          heading={`Downloading...`}
          headerIcon={<i className='bx bx-cloud-download' />}
          show={state.showDownload}
          onClose={() => {
            dispatch({ type: 'SET_DOWNLOAD', data: false });
          }}
          body={
            <div className={`download-wrap`}>
              <p className={`confirm-msg`}>
                Your file is downloading. It will take some time please wait...
              </p>
              <ImportIcon />
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
      </Suspense> */}
      <section
        className='section'
        style={{ paddingTop: '10px', marginTop: '-100px' }}
      >
        <div className='container'>
          <div className='row'>
            <div className='col-md-12' ref={projectRef}>
              <Heading
                as='h2'
                id='my-projects'
                className='main-h'
                style={{ marginBottom: '30px', paddingTop: '100px' }}
              >
                Collaborative Projects
              </Heading>
            </div>
            <FilterTags
              tags={state?.filterTags}
              filterHandler={filterHandler}
            />
            <Projects
              projects={projects.projects.list}
              filterTags={state.filterTags}
              nodata={projects.projects.count === 0}
            />
          </div>
          <If cond={projects.projects.total > projects.projects.count}>
            <div className='row'>
              <div className='col-md-12' style={{ textAlign: 'right' }}>
                <If cond={projects.projects.count > 0}>
                  <Suspense fallback={''}>
                    <Pagination
                      pageNo={state.pageNo}
                      limit={state.limit}
                      total={projects.projects.total}
                      onPagination={onPagination}
                    />
                  </Suspense>
                </If>
              </div>
            </div>
          </If>
        </div>
      </section>
    </>
  );
});

export default React.memo(AllProjects);
