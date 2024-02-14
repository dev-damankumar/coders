import classes from './Radio.module.css';
import { UUID } from '../../../../utils';

const Radio = (props) => {
  let uid = UUID();
  let change = () => {};
  return (
    <div className={`custom-control custom-radio ${classes.customCheckbox}`}>
      <input
        type='radio'
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

export default Radio;
