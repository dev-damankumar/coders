import { useEffect, useRef, Suspense, useReducer, lazy, memo } from 'react';
import { NavLink } from 'react-router-dom';

import homeReducer from '../../reducers/homeReducer';
import Loading from '../../components/ui/Loading';
import BannerSection from '../../components/home/banner/banner';
import SubscribeSection from '../../components/home/SubscribeSection/';
import Heading from '../../components/ui/Heading';
import If from '../../components/hoc/If';
const Roadmap = lazy(() => import('../../components/home/Roadmap'));
const WhyChoose = lazy(() => import('../../components/home/WhyChoose'));
const Projects = lazy(() => import('../../components/project/Projects'));
const RecentProjects = lazy(
  () => import('../../components/home/RecentProjects/index')
);
import { getProjects } from '../../services/project';
import { Project } from '../../types';
import CardSkelton from '../../components/ui/Skelton/CardSkelton';

type HomeState = {
  projects: Project[];
  pageNo: number;
  limit: number;
  totalProjects: number;
  nodata: boolean;
  loading: boolean;
};

let initialState: HomeState = {
  projects: [],
  pageNo: 1,
  limit: 6,
  totalProjects: 0,
  nodata: false,
  loading: true,
};
const Home = memo(() => {
  const [state, dispatch] = useReducer(homeReducer<HomeState>, initialState);
  const projectRef = useRef(null);
  console.log('state', state);
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
      }
    })();
  }, []);

  return (
    <>
      <BannerSection />
      <section className='section' style={{ paddingTop: '10px' }}>
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
            <If
              cond={
                !(
                  (state.projects.length === 0 && !state.nodata) ||
                  state.loading
                )
              }
              else={<CardSkelton count={4} hideContext />}
            >
              <Suspense fallback={<CardSkelton count={4} hideContext />}>
                <Projects
                  filterTags=''
                  projects={state?.projects}
                  nodata={state?.nodata}
                />
              </Suspense>
            </If>
            <div className='col-md-12' style={{ textAlign: 'right' }}>
              <NavLink to='/all-projects'>
                <button type='button' className='btn btn-primary'>
                  View All Projects
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
      <Suspense fallback={<Loading />}>
        <RecentProjects projects={state?.projects} />
      </Suspense>
      <Suspense fallback=''>
        <WhyChoose />
        <Roadmap />
      </Suspense>
      <SubscribeSection />
    </>
  );
});

export default Home;
