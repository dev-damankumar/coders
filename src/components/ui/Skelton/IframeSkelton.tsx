import { joinClasses } from '../../../utils/helper';
import classes from './IframeSkelton.module.css';
const IframeSkelton = () => {
  return <div className={joinClasses('loading', classes['iframe-img'])} />;
};

export default IframeSkelton;
