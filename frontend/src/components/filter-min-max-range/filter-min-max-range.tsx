import { FormEvent, useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './rc-slider.styles.css';

import { parseStringNumber } from '@backend/shared/core';

import { MinMaxRange } from '../../types/types';
import { getMax, getMin } from '../../utils/min-max';

type FilterMinMaxRangeProps = {
  title: string;
  nameMin?: string;
  nameMax?: string;
  className: string;
  prefixClassName: string;
  prefixLabelClassName?: string;
  value: MinMaxRange;
  limitValue: MinMaxRange;
  showInputs?: boolean;
  onChange: (newValue: MinMaxRange) => void;
}

function FilterMinMaxRange(props: FilterMinMaxRangeProps): JSX.Element {
  //! добавить задержку, чтобы позволило ввести число больше, а потом уменьшить/увеличить

  const { title, nameMin, nameMax, className, prefixClassName, prefixLabelClassName, value, limitValue, showInputs, onChange } = props;
  const { min: valueMin, max: valueMax } = value;
  const { min: limitValueMin, max: limitValueMax } = limitValue;
  const [tempValue, setTempValue] = useState([0, 0]);
  const [isMaxChange, setIsMaxChange] = useState(false);
  const [tempMin, tempMax] = tempValue;

  useEffect(() => {
    setTempValue([valueMin || limitValueMin || 0, valueMax || limitValueMax || 0]);

  }, [value, valueMin, valueMax, limitValueMin, limitValueMax]);

  const handleSliderChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setIsMaxChange(true);
      setTempValue(newValue);
    }
  };

  const handleSliderChangeComplete = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      const [min, max] = newValue;

      onChange({ min, max });
    }
  };

  const handleMinInputChange = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    let newMin = parseStringNumber(event.currentTarget.value);

    if (newMin !== undefined) {
      if (limitValueMin && (newMin < limitValueMin)) {
        newMin = limitValueMin;
      }

      const limitMax = getMin(limitValueMax, valueMax);

      if (limitMax && (newMin > limitMax)) {
        newMin = limitMax;
      }
    }

    onChange({ min: newMin, max: valueMax });
  };

  const handleMaxInputChange = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    let newMax = parseStringNumber(event.currentTarget.value);

    if (newMax !== undefined) {
      if (limitValueMax && (newMax > limitValueMax)) {
        newMax = limitValueMax;
      }

      const limitMin = getMax(limitValueMin, valueMin);

      if (limitMin && (newMax < limitMin)) {
        newMax = limitMin;
      }
    }

    onChange({ min: valueMin, max: newMax });
  };

  const divClassName = `filter-${prefixClassName}`;
  const divLabelClassName = `filter-${(prefixLabelClassName) ? prefixLabelClassName : 'range'}`;

  return (
    <div className={`${className}__block ${className}__block--${prefixClassName}`}>
      <h4 className={`${className}__block-title`}>{title}</h4>
      {
        showInputs &&
        <div className={divClassName}>
          <div className={`${divClassName}__input-text ${divClassName}__input-text--min`}>
            <input type="number" id={nameMin} name={nameMin} value={tempMin ?? ''} onChange={handleMinInputChange} />
            <label htmlFor={nameMin}>от</label>
          </div>
          <div className={`${divClassName}__input-text ${divClassName}__input-text--max`}>
            <input type="number" id={nameMax} name={nameMax} value={((valueMax === undefined) && (!isMaxChange)) ? '' : tempMax ?? ''} onChange={handleMaxInputChange} />
            <label htmlFor={nameMax}>до</label>
          </div>
        </div>
      }
      <div className={divLabelClassName}>
        <div className={`${divLabelClassName}__scale`}>
          <div className={`${divLabelClassName}__bar`}><span className="visually-hidden">Полоса прокрутки</span></div>
        </div>
        <div className={`${divLabelClassName}__control`}>
          <button className={`${divLabelClassName}__min-toggle`}><span className="visually-hidden">Минимальное значение</span></button>
          {prefixLabelClassName && <span>{limitValueMin ?? ''}</span>}
          <button className={`${divLabelClassName}__max-toggle`}><span className="visually-hidden">Максимальное значение</span></button>
          {prefixLabelClassName && <span>{limitValueMax ?? ''}</span>}
        </div>
      </div>
      <br />
      <div>
        <Slider
          min={limitValueMin}
          max={limitValueMax}
          value={tempValue}
          range
          onChange={handleSliderChange}
          onChangeComplete={handleSliderChangeComplete}
          allowCross={false}
        />
      </div>
    </div>
  );
}

export default FilterMinMaxRange;
