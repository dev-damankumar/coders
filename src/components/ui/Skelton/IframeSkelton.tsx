import { joinURL } from '../../../utils/helper';
import classes from './IframeSkelton.module.css';
const IframeSkelton = () => {
  return <div className={joinURL('loading', classes['iframe-img'])} />;
};

export default IframeSkelton;
