import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import RecentCard from './RecentCard';
import React from 'react';
import { Project } from '../../types';

const RecentProjects = React.memo(({ projects }: { projects: Project[] }) => {
  return (
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
  );
});

export default RecentProjects;
