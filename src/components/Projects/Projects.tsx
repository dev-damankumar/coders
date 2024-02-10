import { lazy, Suspense } from 'react';
import CardRowSkelton from '../Skelton/CardRowSkelton';
const ProjectCard = lazy(() => import('../ProjectCard/ProjectCard'));
const NoData = lazy(() => import('../NoData/NoData'));

export type TypeAuthor = {
  _id: string;
  name: string;
  image: string;
};
export type Project = {
  description: string;
  destination: string;
  image: string;
  tags: string[];
  imageGrid?: string[];
  title: string;
  url: string;
  user_id: TypeAuthor;
  visibility: boolean;
  _id: string;
};

type TypeProjects = {
  projects: Project[];
  nodata: boolean;
  filterTags: string;
};
const Projects = ({ projects, nodata, filterTags }: TypeProjects) => {
  return (
    <>
      <NoData if={projects?.length <= 0 && nodata} />
      {projects?.map((v, i) => {
        return (
          <Suspense key={i} fallback={<CardRowSkelton hideContext={true} />}>
            <ProjectCard
              filterTags={filterTags}
              author={v.user_id}
              hideContext={true}
              image={v.image}
              index={i}
              description={v.description}
              visibility={v.visibility}
              tags={v.tags}
              title={v.title}
              url={'/project-detail/' + v._id}
              _id={v._id}
            />
          </Suspense>
        );
      })}
    </>
  );
};

export default Projects;
