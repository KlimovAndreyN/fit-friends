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
  startOnZeroRating?: boolean;
  showedFilterSpecializations?: boolean;
  showedSorting?: boolean;
  showedAdditionalDiv?: boolean;
}

function Trainings(props: TrainingsProps): JSX.Element {
  //! будет использватся в двух режимах: Каталог тренировок и мои тренировки

  //! фильтр по продолжительности, скорее всего поход на FilterSpecializations и нужно будте вынести в отдельный компонент

  //! задежка при измении числовых значений нужна?
  //! нужен особый текст при пустом результате и скрывть все кнопки
  //! проверить еще раз разметку и оформление
  //! проверить консоль браузера на ошибки
  //! прокрутить на вверх при переходе с главной... может всегда?
  //! востановление состояния страницы через параметры в адресной строке? по ТЗ требуется?

  const { headerTitle, title, formClassName, listClassName, startOnZeroRating, showedFilterSpecializations, showedSorting, showedAdditionalDiv } = props;

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
                startOnZeroRating={startOnZeroRating}
                showedFilterSpecializations={showedFilterSpecializations}
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
