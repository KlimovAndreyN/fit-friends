import { JSX, Fragment, useEffect } from 'react';

import { ITrainingQuery } from '@backend/shared/core';

import Header from '../header/header';
import TrainingsForm from '../trainings-form/trainings-form';
import Spinner from '../spinner/spinner';
import ResultList from '../result-list/result-list';
import ThumbnailTraining from '../thumbnail-training/thumbnail-training';

import useScrollToTop from '../../hooks/use-scroll-to-top';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getIsFetchTrainingsExecuting, getTrainings, getIsTrainingsFilterActivate,
  getTrainingsMaxPrice, getIsHaveMoreTrainings, getTrainingsFilter,
} from '../../store/training-process/selectors';
import { fetchTrainings } from '../../store/actions/training-action';
import { clearDetailTraining, getNextPage, setIsTrainingsFilterActivate, setTrainingsFilter } from '../../store/training-process';
import { setPrevLocation } from '../../store/user-process';
import { getPrevLocation } from '../../store/user-process/selectors';
import { hasPriceMaxPropertyKey } from '../../utils/common';
import { AppRoute } from '../../const';

type TrainingsProps = {
  title: string;
  location: string;
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
  //  а снизу дописывать "загрузка", т.к. прокручивает наверх, если по обычному лоадер поставить
  //  пока добавил (page === 1)
  //! может добавить задержку на изменения числовых по времени?
  //! прокрутить на вверх при переходе с главной... может всегда?
  //! показать еще - прокрутить вниз, т.к. чтобы посмотреть нужно прокручивать вниз, что по ТЗ?
  //! проверить еще логику по ТЗ и разметку
  //! проверить консоль браузера на ошибки
  //! востановление состояния страницы через параметры в адресной строке? по ТЗ требуется?

  const { title, location, formClassName, listClassName, ratingPrefixClassName, startOnZeroRating, showedFilterSpecializations, showedFilterDurations, showedSorting, showedAdditionalDiv } = props;
  const dispatch = useAppDispatch();
  const trainingsFilter = useAppSelector(getTrainingsFilter);
  const trainings = useAppSelector(getTrainings);
  const isTrainingsFilterActivate = useAppSelector(getIsTrainingsFilterActivate);
  const isFetchTrainingsExecuting = useAppSelector(getIsFetchTrainingsExecuting);
  const isHaveMoreTrainings = useAppSelector(getIsHaveMoreTrainings);
  const trainingsMaxPrice = useAppSelector(getTrainingsMaxPrice);
  const prevLocation = useAppSelector(getPrevLocation);

  const { priceMax, page } = trainingsFilter;
  let limitPriceMax: number | undefined = undefined;

  if (trainingsMaxPrice !== undefined) {
    if (priceMax !== undefined) {
      limitPriceMax = Math.min(priceMax, trainingsMaxPrice);
    } else {
      limitPriceMax = priceMax;
    }
  }

  const currentTrainingsFilter: ITrainingQuery = {
    ...trainingsFilter,
    priceMax: hasPriceMaxPropertyKey(trainingsFilter) ? limitPriceMax : trainingsMaxPrice
  };

  useScrollToTop(); //! а если в useEffect?

  useEffect(() => {
    if (!isTrainingsFilterActivate) {
      dispatch(setTrainingsFilter({ ratingMin: (startOnZeroRating) ? 0 : 1 }));
      dispatch(setIsTrainingsFilterActivate(true));
    } else {
      if (prevLocation && (prevLocation !== location) && (prevLocation !== AppRoute.TrainingDetail)) {
        dispatch(setPrevLocation(location));
        dispatch(setIsTrainingsFilterActivate(false)); // происходит сброс фильтров, можно и не сбрасывать
      } else if (!prevLocation || (prevLocation === location)) {
        dispatch(fetchTrainings(trainingsFilter));
      }
    }

    dispatch(clearDetailTraining());
  }, [dispatch, location, trainingsFilter, isTrainingsFilterActivate, startOnZeroRating, prevLocation]);

  const handleFilterOnChange = (newFilter: ITrainingQuery) => {
    dispatch(setPrevLocation(location));
    dispatch(setTrainingsFilter({ ...currentTrainingsFilter, ...newFilter }));
  };

  const handleNextPageClick = () => {
    dispatch(setPrevLocation(location));
    dispatch(getNextPage());
  };

  return (
    <Fragment>
      <Header title={title} />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">{title}</h1>
              <TrainingsForm
                className={formClassName}
                ratingPrefixClassName={ratingPrefixClassName}
                trainingsFilter={currentTrainingsFilter}
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
                  <Spinner />
                  :
                  <ResultList
                    mainClassName={listClassName}
                    childrens={trainings.map(
                      (training) => (<ThumbnailTraining key={training.id} training={training} />)
                    )}
                    isHaveMoreData={isHaveMoreTrainings}
                    onNextPageClick={handleNextPageClick}
                    textOnEmpty='Тренировки не найдены'
                    showedAdditionalDiv={showedAdditionalDiv}
                  />
              }
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export default Trainings;
