import { Fragment } from 'react';

import Header from '../header/header';
import TrainingsForm from '../trainings-form/trainings-form';
import TrainingsList from '../trainings-list/trainings-list';

import useScrollToTop from '../../hooks/use-scroll-to-top';

type TrainingsProps = {
  headerTitle: string;
  title: string;
  formClassName: string;
  listClassName: string;
  ratingPrefixClassName: string;
  startOnZeroRating?: boolean;
  showedFilterSpecializations?: boolean;
  showedFilterDurations?: boolean;
  showedSorting?: boolean;
  showedAdditionalDiv?: boolean;
}

function Trainings(props: TrainingsProps): JSX.Element {
  //! будет использватся в двух режимах: Каталог тренировок и мои тренировки

  //! задежка при измении числовых значений нужна?
  //! нужен особый текст при пустом результате и скрывть все кнопки
  //! проверить еще раз разметку и оформление
  //! проверить консоль браузера на ошибки
  //! прокрутить на вверх при переходе с главной... может всегда?
  //! востановление состояния страницы через параметры в адресной строке? по ТЗ требуется?

  const { headerTitle, title, formClassName, listClassName, ratingPrefixClassName, startOnZeroRating, showedFilterSpecializations, showedFilterDurations, showedSorting, showedAdditionalDiv } = props;

  useScrollToTop(); //! а если в useEffect?

  const trainingsList = (<TrainingsList className={listClassName} />);

  return (
    <Fragment>
      <Header title={headerTitle} />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">{title}</h1>
              <TrainingsForm
                className={formClassName}
                ratingPrefixClassName={ratingPrefixClassName}
                startOnZeroRating={startOnZeroRating}
                showedFilterSpecializations={showedFilterSpecializations}
                showedFilterDurations={showedFilterDurations}
                showedSorting={showedSorting}
              />
              {
                showedAdditionalDiv
                  ?
                  <div className="inner-page__content">
                    {trainingsList}
                  </div>
                  :
                  trainingsList
              }
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export default Trainings;
