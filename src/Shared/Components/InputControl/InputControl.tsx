import { FC, useCallback } from 'react';

import './InputControl.css';
import { INPUT_CONTROL_TYPE } from '../../Enums';

interface Props {
  label: string;
  name?: string;
  min?: number;
  max?: number;
  required?: boolean;
  value?: string | number;
  type?: INPUT_CONTROL_TYPE;
  options?: string[];
  onChange?: (value: string | number) => void;
}

const InputControl: FC<Props> = (props) => {
  const {
    type,
    name,
    value,
    label,
    required,
    min,
    max,
    options = [],
    ...others
  } = props;

  const onChange = (val: string | number): void => {
    if (others.onChange instanceof Function) {
      others.onChange(val);
    }
  };

  const switchFieldRenderer = useCallback(() => {
    switch (type) {
      case INPUT_CONTROL_TYPE.EMAIL:
        return (
          <input
            type="email"
            pattern="[^ @]*@[^ @]*"
            name={name}
            value={value}
            required={required}
          />
        );
      case INPUT_CONTROL_TYPE.DATE_PICKER:
        return (
          <input type="date" name={name} value={value} required={required} />
        );
      case INPUT_CONTROL_TYPE.DROPDOWN:
        return (
          <select name={name} value={value} required={required}>
            {options.map((x) => (
              <option value={x} key={x}>
                {x}
              </option>
            ))}
          </select>
        );
      case INPUT_CONTROL_TYPE.NUMBER:
        return (
          <input
            type="number"
            name={name}
            value={value}
            required={required}
            min={min}
            max={max}
          />
        );
      default:
        return (
          <input
            type="text"
            name={name}
            value={value}
            required={required}
            className="form-control"
            onChange={(e) => onChange(e.target.value)}
          />
        );
    }
  }, [type, name, value, required, min, max, options.length]);

  return (
    <div className="input-control-wrapper">
      <label htmlFor={name}>{label}</label>
      {switchFieldRenderer()}
    </div>
  );
};

InputControl.defaultProps = {
  options: [],
  type: INPUT_CONTROL_TYPE.TEXT,
};

export default InputControl;
