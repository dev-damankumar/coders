import classes from './FilterTags.module.css';

const FilterTags = ({
  tags,
  filterHandler,
}: {
  tags: string;
  filterHandler: (tag: string) => void;
}) => {
  return (
    <div className='col-md-12'>
      <ul className={classes['category-tabs']}>
        <li>
          <a
            onClick={() => {
              filterHandler('');
            }}
            className={`${!tags ? classes.active : ''}`}
            href='#all'
          >
            All
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              filterHandler('html');
            }}
            className={`${tags === 'html' ? classes.active : ''}`}
            href='#html'
          >
            HTML
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              filterHandler('css');
            }}
            className={`${tags === 'css' ? classes.active : ''}`}
            href='#css'
          >
            CSS
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              filterHandler('js');
            }}
            className={`${tags === 'js' ? classes.active : ''}`}
            href='#js'
          >
            Javascript
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              filterHandler('python');
            }}
            className={`${tags === 'python' ? classes.active : ''}`}
            href='#python'
          >
            Python
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              filterHandler('others');
            }}
            className={`${tags === 'others' ? classes.active : ''}`}
            href='#others'
          >
            Others
          </a>
        </li>
      </ul>
    </div>
  );
};

export default FilterTags;
