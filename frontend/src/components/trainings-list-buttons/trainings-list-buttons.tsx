import classNames from 'classnames';
import { FormEvent } from 'react';

import useScrollToTop from '../../hooks/use-scroll-to-top';
import { OnClick } from '../../types/types';

type TrainingsListButtonsProps = {
  className: string;
  isHaveMoreTrainings: boolean;
  onShowMoreClick: OnClick;
}

function TrainingsListButtons({ className, isHaveMoreTrainings, onShowMoreClick }: TrainingsListButtonsProps): JSX.Element {
  const buttonsClassName = 'btn show-more__button';
  // в css ошибка нет класса show-more__button--more
  // он наверное должен быть похож на show-more__button--to-top {display: none;}
  // вместо него использую visually-hidden
  const showMoreButtonClassName = classNames(buttonsClassName, { 'show-more__button--more visually-hidden': !isHaveMoreTrainings });
  const toTopButtonClassName = classNames(buttonsClassName, { 'show-more__button--to-top': isHaveMoreTrainings });
  const scrollToTop = useScrollToTop();

  const handleShowMoreButtonClick = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    onShowMoreClick();
  };

  const handleToTopButtonClick = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    scrollToTop();
  };

  return (
    <div className={`show-more ${className}__show-more`}>
      <button className={showMoreButtonClassName} type="button" disabled={!isHaveMoreTrainings} onClick={handleShowMoreButtonClick}>Показать еще</button>
      <button className={toTopButtonClassName} type="button" disabled={isHaveMoreTrainings} onClick={handleToTopButtonClick}>Вернуться в начало</button>
    </div>
  );
}

export default TrainingsListButtons;
