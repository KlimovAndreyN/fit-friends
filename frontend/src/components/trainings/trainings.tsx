import { Fragment } from 'react';

import { ITrainingQuery } from '@backend/shared/core';

import Header from '../header/header';
import TrainingsForm from '../trainings-form/trainings-form';
import TrainingsList from '../trainings-list/trainings-list';

import useScrollToTop from '../../hooks/use-scroll-to-top';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsTrainingsFilterActivate, getTrainingsFilter, getTrainingsMaxPrice } from '../../store/training-process/selectors';
import { fetchTrainings } from '../../store/actions/training-action';
import { setIsTrainingsFilterActivate, setTrainingsFilter } from '../../store/training-process';

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
  // при старте отображается только первая страница 6 карточек

  //! может добавить задержку на изменения числовых по времени?
  //! прокрутить на вверх при переходе с главной... может всегда?
  //! показать еще - проанализировать сколько страниц еще есть, навернео добавить селектор
  //! если последняя страница, то показать еще прячем и показываем кнопку наверх
  //! добавить range - двигать мышкой в FilterMinMaxRange
  //! нет черты на фильтре калории - масшаб в мозилле...
  //! проверить еще логику по ТЗ и разметку
  //! проверить консоль браузера на ошибки
  //! востановление состояния страницы через параметры в адресной строке? по ТЗ требуется?
  //! Warning по F5 - Warning: Cannot update a component (`QuestionnaireRoute`) while rendering a different component (`Trainings`). To locate the bad setState() call inside `Trainings`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render Error Component Stack

  const { headerTitle, title, formClassName, listClassName, ratingPrefixClassName, startOnZeroRating, showedFilterSpecializations, showedFilterDurations, showedSorting, showedAdditionalDiv } = props;
  const dispatch = useAppDispatch();
  const trainingsFilter = useAppSelector(getTrainingsFilter);
  const isTrainingsFilterActivate = useAppSelector(getIsTrainingsFilterActivate);
  const trainingsMaxPrice = useAppSelector(getTrainingsMaxPrice);

  useScrollToTop(); //! а если в useEffect?


  const handleFilterOnChange = (newFilter: ITrainingQuery) => {
    dispatch(setIsTrainingsFilterActivate(true)); //! при переходе с других страниц можно false
    dispatch(setTrainingsFilter(newFilter)); //! может все в одно или useEffect
    dispatch(fetchTrainings(trainingsFilter)); //! может взять из store по месту
  };

  if (!isTrainingsFilterActivate) {
    dispatch(fetchTrainings(trainingsFilter)); //! может взять из store по месту
  }

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
                trainingsFilter={trainingsFilter}
                trainingsMaxPrice={trainingsMaxPrice}
                startOnZeroRating={startOnZeroRating}
                onTrainingsFilterChange={handleFilterOnChange}
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
