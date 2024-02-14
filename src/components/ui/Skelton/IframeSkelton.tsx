import { joinURL } from '../../../utils';
import classes from './IframeSkelton.module.css';
const IframeSkelton = () => {
  return <div className={joinURL('loading', classes['iframe-img'])} />;
};

export default IframeSkelton;
