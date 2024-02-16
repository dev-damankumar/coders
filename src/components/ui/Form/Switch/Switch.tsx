import classes from './Switch.module.css';
import { UUID } from '../../../../utils/helper';

const Switch = (props) => {
  let uid = UUID();
  let change = () => {};
  return (
    <div
      style={props.style ? props.style : {}}
      className={`custom-control custom-switch ${
        classes.customCheckbox ? classes.customCheckbox : ''
      }`}
    >
      <input
        type='checkbox'
        name={props.name || uid}
        id={props.id || uid}
        className='custom-control-input'
        value={props.value || ''}
        onChange={props.onChange || change}
        checked={props.checked}
      />
      <label
        className={`custom-control-label input-warning ${classes.customLabel}`}
        htmlFor={props.id || uid}
      >
        {props.label && <span className={classes.label}>{props.label}</span>}
      </label>
    </div>
  );
};

export default Switch;
