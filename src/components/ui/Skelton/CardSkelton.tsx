import classes from './CardSkelton.module.css';
import projectCardClasses from '../../project/ProjectCard/index.module.css';
import IfPrimiumUser from '../../hoc/IfPrimiumUser';

export type TypeCardRowsSkelton = {
  hideContext?: boolean;
  count?: number;
};
const CardSkelton = ({ hideContext, count = 1 }: TypeCardRowsSkelton) => {
  const rows = Array.from(Array(count).keys());
  return rows.map((v) => {
    return (
      <div key={v} className={'col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12'}>
        <div
          className={`${projectCardClasses.projectCard} ${classes.loaderWrap}`}
        >
          <div className={`loading ${classes['loading-img']}`} />
          <div>
            <h3 className={classes.heading}>
              <span
                style={{ display: 'inline-block' }}
                className={`loading ${classes.cardLoading}`}
              >
                Popup Chat
              </span>
            </h3>
            <p className='loading'>Pa$$w0rd!</p>
            <div className='tags'>
              <div className='tag loading'>CSS</div>
              <div className='tag loading'>JS</div>
              <div className='tag loading'>React</div>
              <div className='tag loading'>Angular</div>
            </div>
          </div>

          <div className='dropdown-divider'></div>
          <div className={projectCardClasses.footer}>
            <div data-table-tooltip='true' className='authorWrap'>
              <div className='loading-img authorImg loading'></div>
              <p style={{ marginRight: '3px' }} className='authorName loading'>
                loreme
              </p>
            </div>
            {!hideContext && (
              <IfPrimiumUser>
                <div className='custom-control custom-switch'>
                  <label className='loading'></label>
                </div>
                <div className='divider-hr'></div>
                <div className='menu-item  dropdown drop-up'>
                  <a
                    className='menu-link themeSettings'
                    href='#action'
                    id='moreAction'
                    data-toggle='dropdown'
                  >
                    <i className={`loading ${classes.moreIcon}`}></i>
                  </a>
                </div>
              </IfPrimiumUser>
            )}
          </div>
        </div>
      </div>
    );
  });
};

export default CardSkelton;
