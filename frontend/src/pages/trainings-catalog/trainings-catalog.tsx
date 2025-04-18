import { Fragment } from 'react';

import Header from '../../components/header/header';
import TrainingsCatalogForm from '../../components/trainings-catalog-form/trainings-catalog-form';
import TrainingsList from '../../components/trainings-list/trainings-list';

import useScrollToTop from '../../hooks/use-scroll-to-top';
import { PageTitle } from '../../const';

function TrainingsCatalog(): JSX.Element {
  //! прокрутить на вверх при переходе с главной... может всегда?
  //! востановление состояния страницы через параметры в адресной строке? по ТЗ требуется?
  //! проверить еще раз разметку и оформление
  //! проверить консоль браузера на ошибки

  useScrollToTop(); //! а если в useEffect?

  return (
    <Fragment>
      <Header title={PageTitle.TrainingsCatalog} />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог тренировок</h1>
              <TrainingsCatalogForm />
              <div className="training-catalog">
                <TrainingsList />
                <div className="show-more training-catalog__show-more">
                  <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
                  <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export default TrainingsCatalog;
