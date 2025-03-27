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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleListItemClick = (option: Option) => {
    //! что то одно Option или sting?
    setSelectedValue(option.value);
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
    { [`${mainClassName}--not-selected`]: !value, 'is-open': isOpen },
    extraClassName
  );

  const currentValue = (readonly) ? value : selectedValue;
  const title = options.find((option) => (option.value === currentValue))?.title || '';

  //! отладка
  if (name === 'level') {
    // eslint-disable-next-line
    console.log('CustomSelect - readonly', readonly);
    // eslint-disable-next-line
    console.log('CustomSelect - value', value);
    // eslint-disable-next-line
    console.log('CustomSelect - selectedValue', selectedValue);
    // eslint-disable-next-line
    console.log('CustomSelect - currentValue', currentValue);
    // eslint-disable-next-line
    console.log('CustomSelect - title', title);
  }

  return (
    <div className={divClassName} onMouseLeave={handleDivOnMouseLeave} >
      {/*
      //! пропадает label, добавил style={{ opacity: 1 }}
      возможно ошибка в css .custom-select.is-open .custom-select__label
      */}
      <span className={`${mainClassName}__label`} style={{ opacity: 1 }}>{caption}</span>
      <div className={`${mainClassName}__placeholder`}>{titlePrefix + title}</div>
      {
        (readonly)
          ? null
          : <input className='visually-hidden' type="text" name={name} defaultValue={currentValue} />
      }
      <button
        className={`${mainClassName}__button`}
        type="button"
        aria-label="Выберите одну из опций"
        onClick={toggleDropdown}
        disabled={readonly}
      >
        <span className={`${mainClassName}__text`} />
        <span className={`${mainClassName}__icon`}>
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-down" />
          </svg>
        </span>
      </button>
      <ul className={`${mainClassName}__list`} role="listbox">
        {
          (readonly)
            ? null
            : options.map(
              //! а есть стиль для подсветки выбранного значения?
              (option) => (
                <li
                  key={option.value}
                  className={`${mainClassName}__item`}
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
