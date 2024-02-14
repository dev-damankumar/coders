import { useEffect, useRef, Suspense, useReducer, lazy, memo } from 'react';
import { NavLink } from 'react-router-dom';

import RecentProjectSkelton from '../../components/Skelton/RecentProjectSkelton';
import homeReducer from '../../reducers/homeReducer';
import Loading from '../../components/Loading/Loading';
import BannerSection from '../../components/BannerSection/BannerSection';
import SubscribeSection from '../../components/SubscribeSection/SubscribeSection';
import Heading from '../../components/Heading/Heading';
import If from '../../components/If/If';
const Roadmap = lazy(() => import('../../components/RoadMap/Roadmap'));
const WhyChoose = lazy(() => import('../../components/WhyChoose/WhyChoose'));
const Projects = lazy(() => import('../../components/project/Projects'));
const RecentProjects = lazy(
  () => import('../../components/RecentProjects/RecentProjects')
);
import './Home.css';
import { getProjects } from '../../services/project';
import { Project } from '../../types';
import CardSkelton from '../../components/Skelton/CardSkelton';

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
      <section
        className='section form-creation-wrap'
        style={{ paddingTop: '10px' }}
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
      <section className='section form-creation-wrap recent-project-section'>
        <div className='container'>
          <Heading as='h2' className='main-h' style={{ marginBottom: '30px' }}>
            Recent Projects
          </Heading>
          <If
            cond={!(state.projects.length === 0 && !state.nodata)}
            else={<RecentProjectSkelton />}
          >
            <Suspense fallback={<Loading />}>
              <RecentProjects projects={state?.projects} />
            </Suspense>
          </If>
        </div>
      </section>
      <Suspense fallback=''>
        <WhyChoose />
        {/*<AutoProcessSection/>*/}
        <Roadmap />
      </Suspense>
      <SubscribeSection />
    </>
  );
});

export default Home;
