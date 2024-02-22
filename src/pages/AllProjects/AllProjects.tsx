import React, { useEffect, useRef, Suspense, useReducer } from 'react';
import homeReducer from '../../reducers/homeReducer';
import Loading from '../../components/ui/Loading';
import ImportIcon from '../../assets/icons/ImportIcon';
import FilterTags from '../../components/project/FilterTags/FilterTags';
import { useLocation } from 'react-router';
import If from '../../components/hoc/If';
import Heading from '../../components/ui/Heading';
import { getProjects } from '../../services/project';
import Projects from '../../components/project/Projects';
import { Project } from '../../types';

const Modal = React.lazy(() => import('../../components/ui/Modal/Modal'));
const Pagination = React.lazy(() => import('../../components/ui/Pagination'));

export type ProjectsState = {
  projects: Project[] | [];
  pageNo: number;
  limit: number;
  totalProjects: number;
  nodata: boolean;
  filterTags: string;
  filterCount: number;
  showDownload: boolean;
  progress: number;
  loading: boolean;
};

const initialState: ProjectsState = {
  projects: [],
  pageNo: 1,
  filterTags: '',
  filterCount: 1,
  limit: 5,
  totalProjects: 0,
  nodata: false,
  showDownload: false,
  progress: 0,
  loading: true,
};

const AllProjects = React.memo(() => {
  const [state, dispatch] = useReducer(
    homeReducer<ProjectsState>,
    initialState
  );
  const projectRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      let tag = location.hash.replace('#', '');
      if (tag === 'all') {
        tag = '';
      }
      const projects = [...state.projects];
      if (tag) {
        const projectCount = projects.filter((v) => {
          return v.tags.includes(tag);
        });
        dispatch({ type: 'SET_FILTER_COUNT', data: projectCount.length });
      }
      dispatch({ type: 'SET_FILTER_TAG', data: tag });
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
      try {
        const result = await getProjects({
          pageNo: state.pageNo,
          limit: state.limit,
        });
        const projects = result.data;
        if (projects && projects?.length > 0) {
          dispatch({
            type: 'SET_TOTAL_PROJECTS',
            data: result.totalCount,
          });
          dispatch({ type: 'SET_PROJECTS', data: projects });
        } else {
          dispatch({ type: 'SET_NO_DATA', data: true });
        }
      } catch (e) {
        dispatch({ type: 'SET_NO_DATA', data: true });
      } finally {
        dispatch({ type: 'SET_LOADING', data: false });
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
      dispatch({ type: 'SET_PROGRESS', data: value });
      return value;
    }
  };

  const onPagination = (pageNo: number) => {
    dispatch({ type: 'SET_LOADING', data: true });
    dispatch({ type: 'SET_PAGE_NO', data: pageNo });
    if (projectRef && projectRef.current) {
      projectRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
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
      </Suspense>
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
            <FilterTags tags={state?.filterTags} dispatch={dispatch} />
            <Projects
              projects={state.projects}
              filterTags={state.filterTags}
              nodata={state.nodata}
            />
          </div>
          <If cond={state?.totalProjects > state?.projects?.length}>
            <div className='row'>
              <div className='col-md-12' style={{ textAlign: 'right' }}>
                <If cond={state.projects.length > 0}>
                  <Suspense fallback={''}>
                    <Pagination
                      pageNo={state.pageNo}
                      limit={state.limit}
                      total={state.totalProjects}
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
