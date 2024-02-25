import React, {
  Suspense,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import Projects from '../../../components/project/Projects';
import If from '../../../components/hoc/If';
import { getProjects } from '../../../services/project';
import { useProject } from '../../../providers/ProjectProvider';
import { useNotification } from '../../../providers/Notification';

const Pagination = React.lazy(
  () => import('../../../components/ui/Pagination')
);

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

const ManageProjects = () => {
  const projects = useProject();
  const notification = useNotification();
  const projectRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState(initialState);

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
              projects={projects.projects.list}
              nodata={projects.projects.count === 0}
            />
          </tbody>
        </table>
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
  );
};

export default ManageProjects;
