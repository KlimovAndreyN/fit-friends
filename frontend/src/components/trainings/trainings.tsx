import { Fragment } from 'react';

import Header from '../header/header';
import TrainingsCatalogForm from '../trainings-catalog-form/trainings-catalog-form';
import TrainingsList from '../trainings-list/trainings-list';

import useScrollToTop from '../../hooks/use-scroll-to-top';

type TrainingsProps = {
  headerTitle: string;
  title: string;
  mainClassName: string;
}

function Trainings({ headerTitle, title, mainClassName }: TrainingsProps): JSX.Element {
  //! будет использватся в двух режимах: Каталог тренировок и мои тренировки

  //! отладка
  // eslint-disable-next-line no-console
  console.log('mainClassName', mainClassName);

  //! прокрутить на вверх при переходе с главной... может всегда?
  //! востановление состояния страницы через параметры в адресной строке? по ТЗ требуется?
  //! задежка при измении числовых значений нужна?
  //! нужен особый текст при пустом результате и скрывть все кнопки
  //! проверить еще раз разметку и оформление
  //! проверить консоль браузера на ошибки

  useScrollToTop(); //! а если в useEffect?

  return (
    <Fragment>
      <Header title={headerTitle} />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">{title}</h1>
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

export default Trainings;
