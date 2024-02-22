import classes from './ProjectDetailSkelton.module.css';
import projectDetailsClasses from '../../../pages/ProjectDetail/ProjectDetail.module.css';
import galleryClasses from '../../project/GallaryGrid/GallaryGrid.module.css';
import { joinClasses } from '../../../utils/helper';
const ProjectDetailSkelton = () => {
  return (
    <div className={`jumbotron bg-light ${classes['project-detail-div']}`}>
      <div className='info-header'>
        <h1 className={joinClasses('loading', classes.heading)}>Popup Chat</h1>
      </div>
      <div className={projectDetailsClasses['info-body']}>
        <div className={projectDetailsClasses['project-content']}>
          <p className={'loading'}>Pa$$w0rd!</p>
          <p className={`${projectDetailsClasses['web-url']} loading`}>
            <b>Website Url:</b>
            <a target='_blank' rel='noreferrer'>
              http://localhost:5000/webapp/popup-chat
            </a>
          </p>
          <div className='tags'>
            <div className='tag loading'>CSS</div>
            <div className='tag loading'>JS</div>
            <div className='tag loading'>React</div>
            <div className='tag loading'>Angular</div>
          </div>
          <div className={galleryClasses['gallery-grid']}>
            <div className={galleryClasses['gallery-item']}>
              <div
                className={joinClasses(
                  'loading',
                  classes['project-img-loader']
                )}
              />
            </div>
            <div className={galleryClasses['gallery-item']}>
              <div
                className={joinClasses(
                  'loading',
                  classes['project-img-loader']
                )}
              />
            </div>
            <div className={galleryClasses['gallery-item']}>
              <div
                className={joinClasses(
                  'loading',
                  classes['project-img-loader']
                )}
              />
            </div>
          </div>
        </div>
        <div className='info-footer' style={{ marginTop: '15px' }}>
          <a
            onClick={(e) => {
              e.preventDefault();
            }}
            className='btn btn-primary loading'
          >
            Live Preview
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailSkelton;
