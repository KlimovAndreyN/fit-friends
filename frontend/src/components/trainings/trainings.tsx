import { Fragment } from 'react';

import Header from '../header/header';
import TrainingsForm from '../trainings-form/trainings-form';
import TrainingsList from '../trainings-list/trainings-list';

import useScrollToTop from '../../hooks/use-scroll-to-top';

type TrainingsProps = {
  headerTitle: string;
  title: string;
  formClassName: string;
  showedSorting?: boolean;
  showedAdditionalDiv?: boolean;
}

function Trainings({ headerTitle, title, formClassName, showedSorting, showedAdditionalDiv }: TrainingsProps): JSX.Element {
  //! будет использватся в двух режимах: Каталог тренировок и мои тренировки

  //! фильтр по продолжительности, скорее всего поход на FilterSpecializations и нужно будте вынести в отдельный компонент

  //! задежка при измении числовых значений нужна?
  //! нужен особый текст при пустом результате и скрывть все кнопки
  //! проверить еще раз разметку и оформление
  //! проверить консоль браузера на ошибки
  //! прокрутить на вверх при переходе с главной... может всегда?
  //! востановление состояния страницы через параметры в адресной строке? по ТЗ требуется?

  useScrollToTop(); //! а если в useEffect?

  return (
    <Fragment>
      <Header title={headerTitle} />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">{title}</h1>
              <TrainingsForm className={formClassName} showedSorting={showedSorting} />
              {
                showedAdditionalDiv
                  ?
                  <div className="inner-page__content">
                    <TrainingsList />
                  </div>
                  :
                  <TrainingsList />
              }
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export default Trainings;
