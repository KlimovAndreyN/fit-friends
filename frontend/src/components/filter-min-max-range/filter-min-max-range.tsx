import { FormEvent } from 'react';

import { parseStringNumber } from '@backend/shared/core';

import { MinMaxRange } from '../../types/types';

type FilterMinMaxRangeProps = {
  title: string;
  nameMin?: string;
  nameMax?: string;
  className: string;
  prefixClassName: string;
  prefixLabelClassName?: string;
  value: MinMaxRange;
  showInputs?: boolean;
  onChange: (newValue: MinMaxRange) => void;
}

function FilterMinMaxRange(props: FilterMinMaxRangeProps): JSX.Element {
  //! добавить range - двигать мышкой
  //! проверить что min <= max или в самом запросе или в при обработке

  const { title, nameMin, nameMax, className, prefixClassName, prefixLabelClassName, value, showInputs, onChange } = props;
  const { min, max } = value;

  const handleMinInputChange = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    onChange({ min: parseStringNumber(event.currentTarget.value), max });
  };

  const handleMaxInputChange = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    onChange({ min, max: parseStringNumber(event.currentTarget.value) });
  };
  const divClassName = `filter-${prefixClassName}`;
  const divLabelClassName = `filter-${(prefixLabelClassName) ? prefixLabelClassName : 'range'}`;

  return (
    <div className={`${className}__block ${className}__block--${prefixClassName}`}>
      <h4 className={`${className}__block-title`}>{title}</h4>
      {
        (!showInputs)
          ?
          null
          :
          <div className={divClassName}>
            <div className={`${divClassName}__input-text ${divClassName}__input-text--min`}>
              <input type="number" id={nameMin} name={nameMin} value={min ?? ''} onInput={handleMinInputChange} />
              <label htmlFor={nameMin}>от</label>
            </div>
            <div className={`${divClassName}__input-text ${divClassName}__input-text--max`}>
              <input type="number" id={nameMax} name={nameMax} value={max ?? ''} onInput={handleMaxInputChange} />
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
          {prefixLabelClassName && <span>{min}</span>}
          <button className={`${divLabelClassName}__max-toggle`}><span className="visually-hidden">Максимальное значение</span></button>
          {prefixLabelClassName && <span>{max}</span>}
        </div>
      </div>
    </div>
  );
}

export default FilterMinMaxRange;
