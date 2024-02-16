import classes from './RecentProjectSkelton.module.css';
import recentCardClasses from '../../home/RecentCard/index.module.css';
const RecentProjectSkelton = () => {
  return (
    <div
      className={`item ${classes.noSelect}`}
      style={{ userSelect: 'none', pointerEvents: 'none' }}
    >
      <div className={recentCardClasses.recentCard}>
        <div className='row'>
          <div className='col-lg-7 col-md-6 col-sm-12'>
            <div className={recentCardClasses.image}>
              <div className={`loading ${classes.sideImg}`}></div>
            </div>
          </div>
          <div className='col-md-5'>
            <div className={recentCardClasses.content}>
              <h6 className={recentCardClasses.subTitle}>
                <a href='#' className={'loading'}>
                  Best Tour Agency
                </a>
              </h6>
              <h4>
                <a className={'loading'}>Travel Door</a>
              </h4>
              <div className={recentCardClasses.platform}>
                <span className={`loading ${classes.tagLoad}`}># Laral</span>
                <span className={`loading ${classes.tagLoad}`}># Wordpres</span>
                <span className={`loading ${classes.tagLoad}`}>
                  # Wordpress
                </span>
              </div>
              <p className={'loading'}>
                Travel Door Georgia is a tour agency, eparloutstablished in
                Tbilisi Georgia in March 2017. They are offering travel services
                around Georgia, Armenia and Azerbaijan, combining our energy and
                enthusiasm.
              </p>
              <div className={recentCardClasses.imageGallery}>
                <div className={`${classes.imgGallery} loading`}></div>
                <div className={`${classes.imgGallery} loading`}></div>
              </div>
              <a className={`button btn loading ${classes.readMore}`}>
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentProjectSkelton;
