import { useState } from 'react';
import classNames from 'classnames';

import { Option } from '../../types/option';

type CustomSelectProps = {
  name: string;
  caption: string;
  options: Option[];
  onChange?: (selected: Option | null) => void;
  value?: string;
  titlePrefix?: string;
  extraClassName?: string;
  readonly?: boolean;
}

function CustomSelect(props: CustomSelectProps): JSX.Element {
  const { name, caption, options, onChange, value = '', titlePrefix = '', extraClassName, readonly } = props;
  const title = options.find((option) => (option.value === value))?.title || '';
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option>({ value, title });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleListItemClick = (option: Option) => {
    setSelectedOption(option);
    onChange?.(option);
    setIsOpen(false);
  };

  const handleDivOnMouseLeave = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const mainClassName = 'custom-select';
  const divClassName = classNames(
    { [`${mainClassName}--readonly`]: readonly },
    'custom-select',
    { [`${mainClassName}--not-selected`]: !value && !selectedOption, 'is-open': isOpen },
    extraClassName
  );
  const { value: currentValue, title: currentTitle } = selectedOption;

  return (
    <div className={divClassName} onMouseLeave={handleDivOnMouseLeave} >
      {/*
      //! пропадает label, добавил style={{ opacity: 1 }}
      возможно ошибка в css .custom-select.is-open .custom-select__label
      */}
      <span className="custom-select__label" style={{ opacity: 1 }}>{caption}</span>
      <div className="custom-select__placeholder">{titlePrefix + currentTitle}</div>
      {
        (readonly)
          ? null
          : <input className='visually-hidden' type="text" readOnly name={name} value={currentValue} />
      }
      <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" onClick={toggleDropdown} disabled={readonly}>
        <span className="custom-select__text" />
        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-down" />
          </svg>
        </span>
      </button>
      <ul className="custom-select__list" role="listbox">
        {
          (readonly)
            ? null
            : options.map(
              //! а есть стиль для подсветки выбранного значения?
              (option) => (
                <li
                  key={option.value}
                  className="custom-select__item"
                  onClick={() => handleListItemClick(option)}
                >
                  {titlePrefix + option.title}
                </li>
              )
            )
        }
      </ul>
    </div>
  );
}

export default CustomSelect;
