import { Fragment, useEffect } from 'react';

import Header from '../../components/header/header';
import TrainingCatalogForm from '../../components/training-catalog-form/training-catalog-form';
import TrainingCard from '../../components/training-card/training-card';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getTrainings } from '../../store/training-process/selectors';
import { fetchTrainings } from '../../store/training-action';
import { PageTitle } from '../../const';

function TrainingCatalog(): JSX.Element {
  //! прокрутить на вверх при переходе с главной... может всегда?
  //! проверить консоль браузера на ошибки
  //! заголовок в нижнем регистре? или или там стили?

  const dispatch = useAppDispatch();
  const trainings = useAppSelector(getTrainings);

  useEffect(() => {
    dispatch(fetchTrainings());
  }, [dispatch]);

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
                    trainings.map(
                      (training) => {
                        //! временно, потом передать training и в одну строку
                        const { id } = training;

                        return (
                          <li className='training-catalog__item' key={id}>
                            <TrainingCard trainingId={id} />
                          </li>
                        );
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
