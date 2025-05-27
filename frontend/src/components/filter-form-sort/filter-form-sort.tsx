import { JSX, FormEvent } from 'react';
import classNames from 'classnames';
import { Option } from '../../types/types';

type FilterFormSortProps<T> = {
  value?: T;
  options: Option[];
  className: string;
  isUseButtonRatioClassName: boolean;
  onChange: (sort: T | undefined) => void;
}

function FilterFormSort<T>({ value: currentValue, options, className, isUseButtonRatioClassName, onChange }: FilterFormSortProps<T>): JSX.Element {
  return (
    <div className={`${className}__block ${className}__block--sort`}>
      <h4 className={`${className}__title ${className}__title--sort`}>Сортировка</h4>
      <div className={classNames('btn-radio-sort', { [`${className}__radio`]: isUseButtonRatioClassName })}>
        {
          options.map(
            ({ title, value }) => {
              const handleLabelClick = (event: FormEvent) => {
                event.preventDefault();

                if (value !== currentValue) {
                  onChange(value as T);
                } else {
                  onChange(undefined);
                }
              };

              return (
                <label key={value} onClick={handleLabelClick}>
                  <input type="radio" name="sort" checked={value === currentValue} readOnly />
                  <span className="btn-radio-sort__label">{title}</span>
                </label>
              );
            }
          )
        }
      </div>
    </div>
  );
}

export default FilterFormSort;
