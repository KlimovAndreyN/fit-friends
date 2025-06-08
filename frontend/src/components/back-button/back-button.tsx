import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

type BackButtonProps = {
  className: string;
  underlined?: boolean;
}

function BackButton({ className, underlined }: BackButtonProps): JSX.Element {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const buttonClassName = classNames(
    'btn-flat',
    { 'btn-flat--underlined': underlined },
    className
  );

  return (
    <button
      className={buttonClassName}
      type="button"
      onClick={handleBackButtonClick}
    >
      <svg width="14" height="10" aria-hidden="true">
        <use xlinkHref="#arrow-left" />
      </svg><span>Назад</span>
    </button>
  );
}

export default BackButton;
