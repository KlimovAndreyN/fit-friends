import { FormEvent } from 'react';

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
  //! проверить что min <= max или в самом запросе или в при обработке
  //! добавить задержку, чтобы позволило ввести число больше, а потом уменьшить/увеличить

  const { title, nameMin, nameMax, className, prefixClassName, prefixLabelClassName, value, limitValue, showInputs, onChange } = props;
  const { min, max } = value;

  const handleMinInputChange = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    let newMin = parseStringNumber(event.currentTarget.value);

    //! мининум учесть!
    //! отладить
    console.log('newMin', newMin);

    if (newMin) {
      if (limitValue && limitValue.min && (newMin < limitValue.min)) {
        newMin = limitValue.min;
        console.log('newMin', newMin);
      }

      const limitMax = getMin(limitValue?.max, max);
      console.log('limitMax', limitMax);

      if (limitMax && (newMin > limitMax)) {
        newMin = limitMax;
        console.log('newMin', newMin);
      }
    }

    console.log('newMin', newMin);

    onChange({ min: newMin, max });
  };

  const handleMaxInputChange = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    //! отладить
    let newMax = parseStringNumber(event.currentTarget.value);

    if (newMax) {
      if (limitValue && limitValue.max && (newMax > limitValue.max)) {
        newMax = limitValue.max;
      }

      const limitMin = getMax(limitValue?.min, min);

      if (limitMin && (newMax < limitMin)) {
        newMax = limitMin;
      }
    }

    onChange({ min, max: newMax });
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
            <input type="number" id={nameMin} name={nameMin} value={min ?? ''} onChange={handleMinInputChange} />
            <label htmlFor={nameMin}>от</label>
          </div>
          <div className={`${divClassName}__input-text ${divClassName}__input-text--max`}>
            <input type="number" id={nameMax} name={nameMax} value={max ?? ''} onChange={handleMaxInputChange} />
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
    </div>
  );
}

export default FilterMinMaxRange;
