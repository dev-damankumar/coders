import { joinClasses } from '../../../utils/helper';
import classes from './FileListSkelton.module.css';
const FileListSkelton = (props: { dark?: boolean }) => {
  return (
    <div
      className={`${classes['file-list']} ${
        props.dark
          ? classes['search-dark-theme'] + ' ' + 'search-dark-theme'
          : ''
      }`}
    >
      <div className={classes['file-div']}>
        <div className={classes['file-icon']}>
          <div className={joinClasses('loading', classes.img)}></div>
        </div>
        <div className={classes['file-info']}>
          <h3>
            <span className={joinClasses('loading', classes.mainHeading)}>
              index.jpg
            </span>
          </h3>
          <p className={joinClasses('loading', classes.mainHeading)}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque,
            laborum!
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileListSkelton;
