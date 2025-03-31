import { Fragment } from 'react';

import Header from '../../components/header/header';
import TrainingCatalogForm from '../../components/training-catalog-form/training-catalog-form';
import TrainingCard from '../../components/training-card/training-card';

import { PageTitle } from '../../const';
import { MOCK_TRAININGS } from '../../mock';

function TrainingCatalog(): JSX.Element {
  //! прокрутить на вверх при переходе с главной... может всегда?
  //! проверить консоль браузера на ошибки
  //! заголовок в нижнем регистре? или или там стили?

  return (
    <Fragment>
      <Header title={PageTitle.TrainingCatalog} />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог тренировок</h1>
              <TrainingCatalogForm />
              <div className="training-catalog">
                <ul className="training-catalog__list">
                  {
                    MOCK_TRAININGS.map(
                      (training) => {
                        //! временно, потом передать training и в одну строку
                        const { id } = training;

                        return <TrainingCard prefixClassName='training-catalog' trainingId={id} key={id} />;
                      }
                    )
                  }
                </ul>
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

export default TrainingCatalog;
