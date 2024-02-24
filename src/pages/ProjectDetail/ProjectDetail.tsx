import React, { Suspense, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import NoData from '../../components/ui/NoData/NoData';
import IfPrimiumUser from '../../components/hoc/IfPrimiumUser';
import If from '../../components/hoc/If';
import { joinURL } from '../../utils/helper';
import { baseURL } from '../../constants';
import Tags from '../../components/ui/Tags';
import GallaryGrid from '../../components/project/GallaryGrid/GallaryGrid';
import { User, useAuth } from '../../providers/Auth';
import { getProject } from '../../services/project';
import { useNotification } from '../../providers/Notification';
import IframeSkelton from '../../components/ui/Skelton/IframeSkelton';
import ProjectDetailSkelton from '../../components/ui/Skelton/ProjectDetailSkelton';
import classes from './ProjectDetail.module.css';

const AuthorCard = React.lazy(
  () => import('../../components/author/AuthorCard')
);

export type ExecutableFileType = {
  name: string;
  type: string;
};

export type ProjectDetailType = {
  description: string;
  destination: string;
  executableFile: string;
  executables: ExecutableFileType[];
  image: string;
  imageGrid: string[];
  project: string;
  tags: string[];
  title: string;
  url: string;
  author?: User;
  user: { _id: string; name: string; image: string };
  visibility: boolean;
  _id: string;
} | null;

const ProjectDetail = React.memo(() => {
  const notification = useNotification();
  const params = useParams();
  const projectId = params.id!;
  const auth = useAuth();
  const isStandardAndAbove = auth?.user?.type === 1 || auth?.user?.type === 2;
  const [projectDetail, setProjectDetail] = useState<ProjectDetailType>(null);
  const [isExpand, setExpand] = useState(true);
  const isAuthor = projectDetail?.user?._id === auth.user?._id;

  useEffect(() => {
    (async () => {
      if (projectDetail && Object.keys(projectDetail).length > 0) return;
      const project = await getProject(projectId);
      if ('error' in project) {
        notification.add({
          type: 'error',
          message: 'Unable to get project details',
        });
      }
      setProjectDetail(project || {});
    })();
  }, [projectId]);

  const shrinkBox = (e: React.MouseEvent) => {
    e.preventDefault();
    setExpand(!isExpand);
  };

  const previewURL = joinURL(
    baseURL,
    projectDetail?.url || '',
    projectDetail?.executableFile || ''
  );
  return (
    <div className={classes['project-details-page']}>
      <div className={`container-fluid ${classes['container-fluid']}`}>
        <div className={`${classes.row} row`}>
          <NoData
            if={projectDetail && Object.keys(projectDetail).length === 0}
          />
          <div className={`col-lg-7 ${classes['site-div']}`}>
            <If cond={!!projectDetail} else={<IframeSkelton />}>
              <iframe
                title='site'
                className={classes.iframe}
                src={previewURL}
              />
            </If>
          </div>
          <div
            className={`col-lg-5 ${classes['info-col']} ${
              isExpand ? '' : classes['info-body-shrink']
            }`}
          >
            <If
              cond={projectDetail && Object.keys(projectDetail).length > 0}
              else={<ProjectDetailSkelton />}
            >
              <div
                className={`jumbotron bg-light ${classes['project-detail-div']}`}
              >
                <div className={classes['info-header']}>
                  <h1>{projectDetail?.title}</h1>
                  <a
                    href='#'
                    onClick={shrinkBox}
                    className={classes['shrink-box']}
                  >
                    <i className='bx bx-chevron-down' />
                  </a>
                </div>
                <div className={classes['info-body']}>
                  <div className={classes['project-content']}>
                    <p>{projectDetail?.description}</p>
                    {projectDetail?.author && (
                      <Suspense fallback=''>
                        <AuthorCard
                          id={projectDetail.author._id}
                          name={projectDetail.author.username}
                          src={projectDetail.author.image}
                          isAuthor={
                            projectDetail.author._id === auth?.user?._id
                          }
                        />
                      </Suspense>
                    )}
                    <p className={classes['web-url']}>
                      <b>Website Url: </b>
                      <a href={previewURL} target='_blank' rel='noreferrer'>
                        {previewURL}
                      </a>
                    </p>
                    <Tags tags={projectDetail?.tags || []} />
                    <GallaryGrid images={projectDetail?.imageGrid || []} />
                  </div>

                  <div
                    className={classes['info-footer']}
                    style={{ marginTop: '15px' }}
                  >
                    <a
                      href={previewURL}
                      target='_blank'
                      rel='noreferrer'
                      className='btn btn-primary'
                    >
                      Live Preview
                    </a>
                    <If
                      cond={isAuthor || isStandardAndAbove}
                      else={
                        <IfPrimiumUser>
                          <NavLink
                            className='btn btn-dark'
                            to={`/xcode/${projectDetail?._id}`}
                          >
                            View X Code
                          </NavLink>
                        </IfPrimiumUser>
                      }
                    >
                      <NavLink
                        className='btn btn-dark'
                        to={`/xcode/${projectDetail?._id}`}
                      >
                        View X Code
                      </NavLink>
                    </If>
                  </div>
                </div>
              </div>
            </If>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProjectDetail;
