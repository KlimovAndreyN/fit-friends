import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { Option } from '../../types/types';

type CustomSelectProps = {
  name: string;
  caption: string;
  options: Option[];
  onChange?: (selected: Option | null) => void;
  value?: string;
  titlePrefix?: string;
  extraClassName?: string;
  readOnly?: boolean;
}

function CustomSelect(props: CustomSelectProps): JSX.Element {
  const { name, caption, options, onChange, value = '', titlePrefix = '', extraClassName, readOnly } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    // приходят новые значения из предка! при переключении режимо редактирования и повторной отрисовки формы после получения ответа
    if (value) {
      setSelectedValue(value);
    }
  }, [value]);


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
    { [`${mainClassName}--readonly`]: readOnly },
    mainClassName,
    { [`${mainClassName}--not-selected`]: !selectedValue, 'is-open': isOpen },
    extraClassName && `${extraClassName}__select`
  );

  const title = options.find((option) => (option.value === selectedValue))?.title || '';

  return (
    <div className={divClassName} onMouseLeave={handleDivOnMouseLeave} >
      {/*
      //! пропадает label, добавил style={{ opacity: 1 }}
      возможно ошибка в css .custom-select.is-open .custom-select__label
      */}
      <span className={`${mainClassName}__label`} style={{ opacity: 1 }}>{caption}</span>
      {selectedValue && <div className={`${mainClassName}__placeholder`}>{titlePrefix + title}</div>}
      {!readOnly && <input className='visually-hidden' type="text" name={name} value={selectedValue} readOnly />}
      <button
        className={`${mainClassName}__button`}
        type="button"
        aria-label="Выберите одну из опций"
        onClick={toggleDropdown}
        disabled={readOnly}
      >
        <span className={`${mainClassName}__text`} />
        <span className={`${mainClassName}__icon`}>
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-down" />
          </svg>
        </span>
      </button>
      <ul className={`${mainClassName}__list`} role="listbox">
        {!readOnly && options.map(
          //! а есть стиль для подсветки выбранного значения?
          (option) => {
            const handleClick = () => {
              handleListItemClick(option);
            };

            return (
              <li key={option.value} className={`${mainClassName}__item`} onClick={handleClick}>
                {titlePrefix + option.title}
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}

export default CustomSelect;
