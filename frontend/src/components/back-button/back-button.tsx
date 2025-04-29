import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

type BackButtonProps = {
  className: string;
  classPrefix?: boolean;
  underlined?: boolean;
}

function BackButton({ className, classPrefix, underlined }: BackButtonProps): JSX.Element {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const buttonClassName = classNames(
    'btn-flat',
    { 'btn-flat--underlined': underlined },
    `${className}__${(classPrefix) ? 'btn' : ''}back`
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
