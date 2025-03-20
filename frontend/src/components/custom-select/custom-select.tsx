import { useState } from 'react';
import classNames from 'classnames';

import { Option } from '../../types/option';

type CustomSelectProps = {
  name: string;
  caption: string;
  options: Option[];
  onChange?: (selected: Option | null) => void;
  currentOption?: Option;
}

function CustomSelect(props: CustomSelectProps): JSX.Element {
  const { name, caption, options, onChange, currentOption: startOption } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(startOption);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleListItemClick = (option: Option) => {
    setSelectedOption(option);
    onChange?.(option);
    setIsOpen(false);
  };

  const divClassName = classNames('custom-select', { 'custom-select--not-selected': !startOption && !selectedOption, 'is-open': isOpen });
  const value = (selectedOption) ? selectedOption.value : startOption?.value;
  const title = (selectedOption) ? selectedOption.title : startOption?.title;

  return (
    <div className={divClassName} onMouseLeave={() => (setIsOpen(false)/*//! скрыть*/)}>
      {/*
      //! пропадает label, добавил style={{ opacity: 1 }}
      возможно ошибка в css .custom-select.is-open .custom-select__label
      */}
      <span className="custom-select__label" style={{ opacity: 1 }}>{caption}</span>
      <div className="custom-select__placeholder">{title}</div>
      <input className='visually-hidden' type="text" readOnly name={name} defaultValue={value} />
      <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" onClick={toggleDropdown}>
        <span className="custom-select__text" />
        <span className="custom-select__icon">
          <svg width="15" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-down" />
          </svg>
        </span>
      </button>
      <ul className="custom-select__list" role="listbox">
        {
          options.map(
            (option) => (
              <li
                key={option.value}
                className="custom-select__item"
                onClick={() => handleListItemClick(option)}
              >
                {option.title}
              </li>
            )
          )
        }
      </ul>
    </div>
  );
}

export default CustomSelect;
