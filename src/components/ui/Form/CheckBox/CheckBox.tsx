import classes from './Checkbox.module.css';
import { UUID } from '../../../../utils/helper';

type CheckboxType = {
  name?: string;
  id?: string;
  value?: string;
  label?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const CheckBox = (props: CheckboxType) => {
  const uid = UUID();
  const change = (e: React.ChangeEvent) => {};
  return (
    <div className={`${classes.customControl} ${classes.customCheckbox}`}>
      <input
        type='checkbox'
        name={props.name || uid}
        id={props.id || uid}
        className={classes.customControlInput}
        onChange={props.onChange || change}
        checked={!!props.checked}
      />
      <label className={`${classes.customLabel}`} htmlFor={props.id || uid}>
        {props.label && <span className={classes.label}>{props.label}</span>}
      </label>
    </div>
  );
};

export default CheckBox;
