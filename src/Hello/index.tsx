import classes from './Hello.module.css';
const Hello = ({ children }) => {
  return <div className={classes.red}>{children}</div>;
};

export default Hello;
