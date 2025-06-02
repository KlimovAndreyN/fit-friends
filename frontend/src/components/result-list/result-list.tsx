import { JSX, Fragment } from 'react';

import ButtonsShowMoreAndToTop from '../buttons-show-more-and-to-top/buttons-show-more-and-to-top';

type ResultListProps = {
  mainClassName: string;
  childrens: JSX.Element[];
  isHaveMoreData: boolean;
  onNextPageClick: () => void;
  textOnEmpty: string;
  showedAdditionalDiv?: boolean;
}

function ResultList(props: ResultListProps): JSX.Element {
  const { mainClassName, childrens, isHaveMoreData, onNextPageClick, textOnEmpty, showedAdditionalDiv } = props;

  const handleShowMoreClick = () => {
    onNextPageClick();
  };

  const list = (
    <ul className={`${mainClassName}__list`}>
      {
        childrens.map(
          (children) => (
            <li className={`${mainClassName}__item`} key={children.key}>
              {children}
            </li>
          )
        )
      }
    </ul>
  );

  const mainDiv = (
    <div className={mainClassName}>
      {
        (childrens.length)
          ?
          <Fragment>
            {list}
            <ButtonsShowMoreAndToTop divClassNamePrefix={mainClassName} isHaveMoreData={isHaveMoreData} onShowMoreClick={handleShowMoreClick} />
          </Fragment>
          :
          <Fragment>
            <br />
            <br />
            {/* //! добавил "style={{ textAlign: 'center' }}" т.к. в однов варианте есть дополнительный див в одном нет, можно переделать/доделать вывод*/}
            <h3 className={`${mainClassName}__title`} style={{ textAlign: 'center' }}>{textOnEmpty}</h3>
          </Fragment>
      }
    </div>
  );

  return showedAdditionalDiv
    ?
    <div className="inner-page__content">
      {mainDiv}
    </div>
    :
    mainDiv;
}

export default ResultList;
