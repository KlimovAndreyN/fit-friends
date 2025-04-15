import { FormEvent } from 'react';

import { MinMaxRange } from '../../types/types';
import { parseStringNumber } from '../../utils/common';

type FilterMinMaxRangeProps = {
  title: string;
  nameMin?: string;
  nameMax?: string;
  prefixClassName: string;
  value: MinMaxRange;
  showInputs?: boolean;
  onChange: (newValue: MinMaxRange) => void;
}

function FilterMinMaxRange(props: FilterMinMaxRangeProps): JSX.Element {
  //! добавить range - двигать мышкой
  //! проверить что min <= max или в самом запросе или в при обработке

  const { title, nameMin, nameMax, prefixClassName, value, showInputs, onChange } = props;
  const { min, max } = value;

  const handleMinInputChange = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    onChange({ min: parseStringNumber(event.currentTarget.value), max });
  };

  const handleMaxInputChange = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();

    onChange({ min, max: parseStringNumber(event.currentTarget.value) });
  };

  return (
    <div className={`gym-catalog-form__block gym-catalog-form__block--${prefixClassName}`}>
      <h4 className="gym-catalog-form__block-title">{title}</h4>
      {
        (!showInputs)
          ?
          null
          :
          <div className={`filter-${prefixClassName}`}>
            <div className={`filter-${prefixClassName}__input-text filter-${prefixClassName}__input-text--min`}>
              <input type="number" id={nameMin} name={nameMin} value={min ?? ''} onInput={handleMinInputChange} />
              <label htmlFor={nameMin}>от</label>
            </div>
            <div className={`filter-${prefixClassName}__input-text filter-${prefixClassName}__input-text--max`}>
              <input type="number" id={nameMax} name={nameMax} value={max ?? ''} onInput={handleMaxInputChange} />
              <label htmlFor={nameMax}>до</label>
            </div>
          </div>
      }
      <div className="filter-range">
        <div className="filter-range__scale">
          <div className="filter-range__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
        </div>
        <div className="filter-range__control">
          <button className="filter-range__min-toggle"><span className="visually-hidden">Минимальное значение</span></button>
          <button className="filter-range__max-toggle"><span className="visually-hidden">Максимальное значение</span></button>
        </div>
      </div>
    </div>
  );
}

export default FilterMinMaxRange;
