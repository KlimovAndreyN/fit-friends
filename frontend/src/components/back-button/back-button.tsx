import { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { useAppSelector } from '../../hooks';
import { getPrevLocation, getUserMainPage } from '../../store/user-process/selectors';

type BackButtonProps = {
  className: string;
  classPrefix?: boolean;
  underlined?: boolean;
}

function BackButton({ className, classPrefix, underlined }: BackButtonProps): JSX.Element {
  const prevLocation = useAppSelector(getPrevLocation);
  const mainPage = useAppSelector(getUserMainPage);
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    if (prevLocation) {
      navigate(-1);
    } else {
      navigate(mainPage);
    }
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
