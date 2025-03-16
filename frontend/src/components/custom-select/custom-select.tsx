import { useState } from 'react';
import classNames from 'classnames';

export type Option = {
  value: string;
  label: string;
}

type CustomSelectProps = {
  caption: string;
  options: Option[];
  onChange: (selected: Option | null) => void;
  placeholder?: string;
}

const CustomSelect = (props: CustomSelectProps) => {
  const { caption, options, onChange, placeholder } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  const existPlaceholder = !!placeholder;
  const divClassName = classNames('custom-select', { 'custom-select--not-selected': !existPlaceholder, 'is-open': isOpen });

  console.log('isOpen', isOpen);
  console.log('placeholder', placeholder);
  console.log('selectedOption', selectedOption);
  console.log('existPlaceholder', existPlaceholder);
  console.log('divClassName', divClassName);

  return (
    <div className={divClassName}>
      <span className="custom-select__label custom-select__label--placeholder">{caption}</span>
      {
        existPlaceholder ? <div className="custom-select__placeholder">{(selectedOption) ? selectedOption.label : placeholder}</div> : null
      }
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
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </li>
            )
          )
        }
      </ul>
    </div >
  );
};

export default CustomSelect;
