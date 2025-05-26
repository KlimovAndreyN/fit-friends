import { JSX, FormEvent } from 'react';
import classNames from 'classnames';

import useScrollToTop from '../../hooks/use-scroll-to-top';

type ButtonsShowMoreAndToTopProps = {
  divClassNamePrefix: string;
  isHaveMoreData: boolean;
  onShowMoreClick: () => void;
}

function ButtonsShowMoreAndToTop({ divClassNamePrefix, isHaveMoreData, onShowMoreClick }: ButtonsShowMoreAndToTopProps): JSX.Element {
  const buttonsClassName = 'btn show-more__button';
  const showMoreButtonClassName = classNames(buttonsClassName, { 'show-more__button--to-top': !isHaveMoreData });
  const toTopButtonClassName = classNames(buttonsClassName, { 'show-more__button--to-top': isHaveMoreData });
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
    <div className={`show-more ${divClassNamePrefix}__show-more`}>
      <button className={showMoreButtonClassName} type="button" disabled={!isHaveMoreData} onClick={handleShowMoreButtonClick}>Показать еще</button>
      <button className={toTopButtonClassName} type="button" disabled={isHaveMoreData} onClick={handleToTopButtonClick}>Вернуться в начало</button>
    </div>
  );
}

export default ButtonsShowMoreAndToTop;
