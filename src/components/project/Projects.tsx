import { lazy, Suspense } from 'react';
import TableRowSkelton from '../ui/Skelton/TableRowSkelton';
import CardSkelton from '../ui/Skelton/CardSkelton';
import { ExtentedProject } from '../../providers/ProjectProvider';
const ProjectCard = lazy(() => import('./ProjectCard'));
const ProjectRow = lazy(() => import('./ProjectRow/ProjectRow'));
const NoData = lazy(() => import('../ui/NoData/NoData'));

let rowLoader = <TableRowSkelton rows={5} cols={7} />;
type TypeProjects = {
  projects: ExtentedProject[];
  nodata: boolean;
  filterTags: string;
  layout?: 'card' | 'list' | 'row';
};
const Projects = ({
  projects,
  nodata,
  filterTags,
  layout = 'card',
}: TypeProjects) => {
  const Component = layout === 'card' ? ProjectCard : ProjectRow;
  console.log('mu', projects);
  return (
    <>
      <NoData if={projects?.length <= 0 && nodata} />
      {projects?.map((v, i) => {
        return (
          <Suspense
            key={i}
            fallback={
              layout === 'card' ? (
                <CardSkelton count={4} hideContext={true} />
              ) : (
                rowLoader
              )
            }
          >
            {v.loading ? (
              <CardSkelton count={1} hideContext={true} />
            ) : (
              <Component
                filterTags={filterTags}
                loading={!!v.loading}
                author={v.author}
                image={v.image}
                index={i}
                description={v.description}
                visibility={v.visibility}
                destination={v.destination}
                executableFile={v.executableFile}
                tags={v.tags}
                title={v.title}
                imageGrid={v.imageGrid || []}
                url={'/project-detail/' + v._id}
                _id={v._id}
              />
            )}
          </Suspense>
        );
      })}
    </>
  );
};

export default Projects;
