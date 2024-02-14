import React, { Suspense, useEffect, useReducer, useRef } from 'react';
import Projects from '../../../components/project/Projects';
import If from '../../../components/hoc/If';
import homeReducer from '../../../reducers/homeReducer';
import { ProjectsState } from '../../AllProjects/AllProjects';
import { getProjects } from '../../../services/project';

const Pagination = React.lazy(
  () => import('../../../components/ui/Pagination')
);

type ManagePropjectState = Omit<ProjectsState, 'filterTags' | 'filterCount'>;

const initialState: ManagePropjectState = {
  projects: [],
  pageNo: 1,
  limit: 10,
  totalProjects: 0,
  nodata: false,
  showDownload: false,
  progress: 0,
  loading: true,
};

const ManageProjects = () => {
  const projectRef = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(
    homeReducer<ManagePropjectState>,
    initialState
  );

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

  const onPagination = (pageNo: number) => {
    dispatch({ type: 'SET_LOADING', data: true });
    dispatch({ type: 'SET_PAGE_NO', data: pageNo });
    if (projectRef && projectRef.current) {
      projectRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='x-code-page'>
      <div className='table-responsive' ref={projectRef}>
        <table className='table table-compact table-dark table-striped table-warning'>
          <thead className='dark-head'>
            <tr className=''>
              <th className=''>
                <div className=''>Project Name</div>
              </th>
              <th className=''>
                <div className=''>Description</div>
              </th>
              <th className=''>
                <div className=''>Website Url</div>
              </th>
              <th className=''>
                <div className=''>Executable File</div>
              </th>
              <th className=''>
                <div className=''>Tags</div>
              </th>
              <th className=''>
                <div className=''>Visibility</div>
              </th>
              <th className=''>
                <div className=''>Images</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <Projects
              layout='row'
              filterTags=''
              projects={state?.projects}
              nodata={state?.nodata}
            />
          </tbody>
        </table>
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
  );
};

export default ManageProjects;
