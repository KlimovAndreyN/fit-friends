import { Fragment, useEffect } from 'react';

import { ITrainingQuery } from '@backend/shared/core';

import Header from '../header/header';
import TrainingsForm from '../trainings-form/trainings-form';
import TrainingsList from '../trainings-list/trainings-list';
import Spinner from '../spinner/spinner';

import useScrollToTop from '../../hooks/use-scroll-to-top';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getTrainingsMaxPrice, getIsHaveMoreTrainings, getTrainingsFilter, getTrainings,
  getIsFetchTrainingsExecuting, getIsTrainingsFilterActivate, getShowDetailTraining
} from '../../store/training-process/selectors';
import { fetchTrainings } from '../../store/actions/training-action';
import { clearDetailTraining, getNextPage, setIsTrainingsFilterActivate, setShowDetailTraining, setTrainingsFilter } from '../../store/training-process';
import { setPrevLocation } from '../../store/user-process';
import { getPrevLocation } from '../../store/user-process/selectors';
import { hasPriceMaxPropertyKey } from '../../utils/common';
import { AppRoute } from '../../const';

type TrainingsProps = {
  headerTitle: string;
  location: string;
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

  //! возможно вместо лоадера нужно блокировать форму по isFetchTrainingsExecuting и список тернировок не очищать...
  //! а снизу дописывать "загрузка", т.к. прокручивает наверх, если по обычному лоадер поставить
  //! пока добавил (page === 1)
  //! может добавить задержку на изменения числовых по времени?
  //! прокрутить на вверх при переходе с главной... может всегда?
  //! показать еще - проанализировать сколько страниц еще есть, навернео добавить селектор
  //! если последняя страница, то показать еще прячем и показываем кнопку наверх
  //! нет черты на фильтре калории - масшаб в мозилле...
  //! проверить еще логику по ТЗ и разметку
  //! проверить консоль браузера на ошибки
  //! востановление состояния страницы через параметры в адресной строке? по ТЗ требуется?

  const { headerTitle, location, title, formClassName, listClassName, ratingPrefixClassName, startOnZeroRating, showedFilterSpecializations, showedFilterDurations, showedSorting, showedAdditionalDiv } = props;
  const dispatch = useAppDispatch();
  const trainingsFilter = useAppSelector(getTrainingsFilter);
  const trainings = useAppSelector(getTrainings);
  const isTrainingsFilterActivate = useAppSelector(getIsTrainingsFilterActivate);
  const isFetchTrainingsExecuting = useAppSelector(getIsFetchTrainingsExecuting);
  const isHaveMoreTrainings = useAppSelector(getIsHaveMoreTrainings);
  const trainingsMaxPrice = useAppSelector(getTrainingsMaxPrice);
  const showDetailTraining = useAppSelector(getShowDetailTraining);
  const prevLocation = useAppSelector(getPrevLocation);
  console.log('prevLocation', prevLocation);
  console.log('isTrainingsFilterActivate', isTrainingsFilterActivate);

  const { priceMax, page } = trainingsFilter;
  let limitPriceMax: number | undefined = undefined;

  if (trainingsMaxPrice !== undefined) {
    if (priceMax !== undefined) {
      limitPriceMax = Math.min(priceMax, trainingsMaxPrice);
    } else {
      limitPriceMax = priceMax;
    }
  }

  const newTrainingsFilter = {
    ...trainingsFilter,
    priceMax: hasPriceMaxPropertyKey(trainingsFilter) ? limitPriceMax : trainingsMaxPrice
  };

  useScrollToTop(); //! а если в useEffect?

  useEffect(() => {
    if (!isTrainingsFilterActivate) {
      console.log('!isTrainingsFilterActivate');

      dispatch(setPrevLocation(location)); //!
      dispatch(setTrainingsFilter({ ratingMin: (startOnZeroRating) ? 0 : 1 }));
      dispatch(setIsTrainingsFilterActivate(true)); //! при переходе с других страниц можно false
    } else {
      console.log('isTrainingsFilterActivate');

      if (!showDetailTraining && (!prevLocation || (prevLocation !== AppRoute.TrainingDetail))) {
        console.log('fetchTrainings');

        dispatch(fetchTrainings(trainingsFilter));
      } else if (prevLocation !== location) {
        dispatch(setPrevLocation(location)); //!
        dispatch(setTrainingsFilter({
          page: 1
        }));
        dispatch(setIsTrainingsFilterActivate(false)); //! при переходе с других страниц можно false
      }
    }

    dispatch(clearDetailTraining());
  }, [dispatch, location, trainingsFilter, isTrainingsFilterActivate, startOnZeroRating, showDetailTraining, prevLocation]);

  const handleFilterOnChange = (newFilter: ITrainingQuery) => {
    console.log('handleFilterOnChange');

    //dispatch(setShowDetailTraining(false));
    dispatch(setPrevLocation(location));
    dispatch(setTrainingsFilter({ ...newTrainingsFilter, ...newFilter }));
  };

  const handleNextPageClick = () => {
    //dispatch(setShowDetailTraining(false));
    dispatch(setPrevLocation(location));
    dispatch(getNextPage());
  };

  const handleShowDetailTraining = () => {
    //dispatch(setShowDetailTraining(true));
  };

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
                trainingsFilter={newTrainingsFilter}
                trainingsMaxPrice={trainingsMaxPrice}
                startOnZeroRating={startOnZeroRating}
                onTrainingsFilterChange={handleFilterOnChange}
                showedFilterSpecializations={showedFilterSpecializations}
                showedFilterDurations={showedFilterDurations}
                showedSorting={showedSorting}
              />
              {
                (isFetchTrainingsExecuting && (page === 1))
                  ?
                  (<Spinner />)
                  :
                  (
                    <TrainingsList
                      className={listClassName}
                      trainings={trainings}
                      isHaveMoreTrainings={isHaveMoreTrainings}
                      onNextPageClick={handleNextPageClick}
                      onShowDetailTraining={handleShowDetailTraining}
                      showedAdditionalDiv={showedAdditionalDiv}
                    />
                  )
              }
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export default Trainings;
