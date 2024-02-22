import classes from './Switch.module.css';
import { UUID } from '../../../../utils/helper';

type SwitchType = {
  name?: string;
  id?: string;
  value?: boolean;
  label?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Switch = (props: SwitchType) => {
  let uid = UUID();
  let change = () => {};
  return (
    <div className={`${classes.customSwitch} ${classes.customControl}`}>
      <input
        type='checkbox'
        name={props.name || uid}
        id={props.id || uid}
        className={classes.customControlInput}
        onChange={props.onChange || change}
        checked={props.checked}
      />
      <label className={`${classes.customLabel}`} htmlFor={props.id || uid}>
        {props.label && <span className={classes.label}>{props.label}</span>}
      </label>
    </div>
  );
};

export default Switch;
