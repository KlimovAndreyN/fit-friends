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
  limitValue?: MinMaxRange;
  showInputs?: boolean;
  onChange: (newValue: MinMaxRange) => void;
}

function FilterMinMaxRange(props: FilterMinMaxRangeProps): JSX.Element {
  //! добавить range - двигать мышкой
  //! добавить задержку, чтобы позволило ввести число больше, а потом уменьшить/увеличить

  const { title, nameMin, nameMax, className, prefixClassName, prefixLabelClassName, value, limitValue, showInputs, onChange } = props;
  //const { min, max } = value;

  const [savedValue, setSavedValue] = useState(value); // Начальные значения для минимума и максимума
  const [tempValue, setTempValue] = useState([value.min || limitValue?.min || 0, value.max || limitValue?.max || 0]);


  useEffect(() => {
    setTempValue([savedValue.min || limitValue?.min || 0, savedValue.max || limitValue?.max || 0]);

  }, [savedValue, limitValue]);


  const handleChange = (newValue) => {
    setTempValue(newValue)
  };

  const handleAfterChange = (newValue) => {
    setValue1(newValue); // Обновляем основное значение только после отпускания ползунка
  };

  const handleMinInputChange = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    let newMin = parseStringNumber(event.currentTarget.value);

    if (newMin !== undefined) {
      if (limitValue && limitValue.min && (newMin < limitValue.min)) {
        newMin = limitValue.min;
      }

      const limitMax = getMin(limitValue?.max, value.max);

      if (limitMax && (newMin > limitMax)) {
        newMin = limitMax;
      }
    }

    onChange({ min: newMin, max: value.max });
  };

  const handleMaxInputChange = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    let newMax = parseStringNumber(event.currentTarget.value);

    if (newMax !== undefined) {
      if (limitValue && limitValue.max && (newMax > limitValue.max)) {
        newMax = limitValue.max;
      }

      const limitMin = getMax(limitValue?.min, value.min);

      if (limitMin && (newMax < limitMin)) {
        newMax = limitMin;
      }
    }

    onChange({ min: value.min, max: newMax });
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
            <input type="number" id={nameMin} name={nameMin} value={value.min ?? ''} onChange={handleMinInputChange} />
            <label htmlFor={nameMin}>от</label>
          </div>
          <div className={`${divClassName}__input-text ${divClassName}__input-text--max`}>
            <input type="number" id={nameMax} name={nameMax} value={value.max ?? ''} onChange={handleMaxInputChange} />
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
          {prefixLabelClassName && <span>{limitValue?.min ?? ''}</span>}
          <button className={`${divLabelClassName}__max-toggle`}><span className="visually-hidden">Максимальное значение</span></button>
          {prefixLabelClassName && <span>{limitValue?.max ?? ''}</span>}
        </div>
      </div>
      <br />
      <div>
        <Slider
          min={limitValue?.min}
          max={limitValue?.max}
          value={tempValue}
          range
          onChange={handleChange}
          onChangeComplete={handleAfterChange}
          allowCross={false} // Запретить пересечение ползунков
        />
        <div>
          <strong>Минимум:</strong> {tempValue[0]} <br />
          <strong>Максимум:</strong> {tempValue[1]}<br />
          <strong>Минимум1:</strong> {savedValue.min} <br />
          <strong>Максимум1:</strong> {savedValue.min}
        </div>
      </div>
    </div>
  );
}

export default FilterMinMaxRange;
