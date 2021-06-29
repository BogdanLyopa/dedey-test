import { useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

import './Counter.scss';

export default function Counter({ type, startValue }) {
  const [value, setValue] = useState(startValue);
  const handleIncrement = () => {
    setValue(prevValue => +prevValue + 1);
  };
  const handleDecrement = () => {
    setValue(prevValue =>
      prevValue - 1 < startValue ? startValue : prevValue - 1,
    );
  };
  const handleChange = event => {
    setValue(event.target.value);
  };
  return (
    <div className="form__counter">
      <div className="form__field">
        <label htmlFor="counter">{type}</label>
        <div className="counter__box">
          <input
            type="number"
            name="counter"
            id="counter"
            value={value}
            onChange={handleChange}
          />
          <div className="form__counters--buttons">
            <button
              className="counter__button"
              type="button"
              onClick={handleIncrement}
            >
              <AiFillCaretUp className="arrow__top" />
            </button>
            <button
              className="counter__button"
              type="button"
              onClick={handleDecrement}
            >
              <AiFillCaretDown className="arrow__bot" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
