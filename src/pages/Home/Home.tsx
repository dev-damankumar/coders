import { useEffect, useRef, Suspense, lazy, memo } from 'react';
import { NavLink } from 'react-router-dom';

import Loading from '../../components/ui/Loading';
import BannerSection from '../../components/home/Banner/Banner';
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
import CardSkelton from '../../components/ui/Skelton/CardSkelton';
import { useProject } from '../../providers/ProjectProvider';
import { useNotification } from '../../providers/Notification';

const Home = memo(() => {
  const projects = useProject();
  const notification = useNotification();
  const projectRef = useRef(null);

  useEffect(() => {
    (async () => {
      projects.projects.setLoading();
      try {
        const result = await getProjects({
          pageNo: 1,
          limit: 6,
        });
        if ('error' in result) {
          return notification.error(result.message);
        }
        const data = result.data;
        projects.projects.setTotal(result.totalCount);
        projects.projects.set(data);
      } catch (e) {
        if (e instanceof Error) return notification.error(e.message);
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
                !(projects.projects.count === 0 || projects.projects.loading)
              }
              else={<CardSkelton count={4} hideContext />}
            >
              <Suspense fallback={<CardSkelton count={4} hideContext />}>
                <Projects
                  filterTags=''
                  projects={projects.projects.list}
                  nodata={projects.projects.count === 0}
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
        <RecentProjects projects={projects.projects.list} />
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
