import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import classes from './index.module.css';
import RecentCard from '../RecentCard';
import React, { Suspense } from 'react';
import { Project } from '../../../types';
import Heading from '../../ui/Heading';
import If from '../../hoc/If';
import Loading from '../../ui/Loading';
import RecentProjectSkelton from '../../ui/Skelton/RecentProjectSkelton';

const RecentProjects = React.memo(({ projects }: { projects: Project[] }) => {
  return (
    <section className='section'>
      <div className={`container ${classes.container}`}>
        <Heading as='h2' style={{ marginBottom: '30px' }}>
          Recent Projects
        </Heading>
        <If cond={!(projects.length === 0)} else={<RecentProjectSkelton />}>
          <Suspense fallback={<Loading />}>
            <OwlCarousel
              className='owl-theme owl-carousel'
              {...{
                margin: 100,
                nav: true,
                dots: false,
                items: 1,
                autoplay: true,
                navText: [
                  `<i class="bx bx-chevron-left"></i>`,
                  `<i class="bx bx-chevron-right"></i>`,
                ],
                smartSpeed: 500,
              }}
              id='case'
            >
              {projects.map((v, i) => {
                return (
                  <RecentCard
                    key={i}
                    imageGrid={v.imageGrid || []}
                    image={v.image}
                    index={i}
                    description={v.description}
                    executableFile={v.executableFile}
                    destination={v.destination}
                    author={v.author}
                    visibility={v.visibility}
                    _id={v._id}
                    tags={v.tags}
                    title={v.title}
                    url={'/project-detail/' + v._id}
                  />
                );
              })}
            </OwlCarousel>
          </Suspense>
        </If>
      </div>
    </section>
  );
});

export default RecentProjects;
