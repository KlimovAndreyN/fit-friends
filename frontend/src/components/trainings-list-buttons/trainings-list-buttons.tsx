import { JSX, FormEvent } from 'react';
import classNames from 'classnames';

import useScrollToTop from '../../hooks/use-scroll-to-top';

type TrainingsListButtonsProps = {
  className: string;
  isHaveMoreTrainings: boolean;
  onShowMoreClick: () => void;
}

function TrainingsListButtons({ className, isHaveMoreTrainings, onShowMoreClick }: TrainingsListButtonsProps): JSX.Element {
  const buttonsClassName = 'btn show-more__button';
  const showMoreButtonClassName = classNames(buttonsClassName, { 'show-more__button--to-top': !isHaveMoreTrainings });
  const toTopButtonClassName = classNames(buttonsClassName, { 'show-more__button--to-top': isHaveMoreTrainings });
  const scrollToTop = useScrollToTop();

  const handleShowMoreButtonClick = (event: FormEvent) => {
    event.preventDefault();

    onShowMoreClick();
  };

  const handleToTopButtonClick = (event: FormEvent) => {
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
