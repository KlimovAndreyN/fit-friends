import { useEffect, useState } from 'react';

import { Specialization } from '@backend/shared/core';

import BackButton from '../back-button/back-button';
import FilterSpecializations from '../filter-specializations/filter-specializations';
import FilterMinMaxRange from '../filter-min-max-range/filter-min-max-range';
import TrainingCatalogFormSort from '../training-catalog-form-sort/training-catalog-form-sort';

import { useAppDispatch } from '../../hooks';
import { fetchTrainings } from '../../store/training-action';
import { MinMaxRange } from '../../types/types';
import { SortType } from '../../const';

const DEFAULT_SORT_TYPE = SortType.LowPrice;

function TrainingCatalogForm(): JSX.Element {
  //! может на изменения добавить задержку по времени?
  //! показать еще - добавить в стейт номер страницы
  //! если последняя страница, то показать еще прячем и показываем кнопку наверх
  //! проверить еще логику по ТЗ и разметку
  //! проверить консоль браузера на ошибки

  const dispatch = useAppDispatch();
  const [price, setPrice] = useState<MinMaxRange>({ min: 0, max: 100000 }); //! 100000 времнно, что по ТЗ выщитывать максимальную цену?
  const [caloriesLose, setCaloriesLose] = useState<MinMaxRange>({ min: undefined, max: undefined });
  const [rating, setRating] = useState<MinMaxRange>({ min: 1, max: 5 }); //!
  const [specializations, setSpecializations] = useState(new Set<Specialization>());
  const [sortType, setSortType] = useState(DEFAULT_SORT_TYPE);

  useEffect(() => {
    //! отладка
    // eslint-disable-next-line no-console
    console.log('TrainingCatalogForm - useEffect', { price, caloriesLose, rating, specializations, sortType });

    dispatch(fetchTrainings());
  }, [dispatch, price, caloriesLose, rating, specializations, sortType]);

  const handleSpecializationsChange = (specialization: Specialization) => {
    setSpecializations((prevItems) => {
      const newItems = new Set(prevItems);

      if (newItems.has(specialization)) {
        newItems.delete(specialization);
      } else {
        newItems.add(specialization);
      }

      return newItems;
    });
  };

  return (
    <div className="gym-catalog-form">
      <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
      <div className="gym-catalog-form__wrapper">
        <BackButton className='gym-catalog-form' classPrefix />
        <h3 className="gym-catalog-form__title">Фильтры</h3>
        <form className="gym-catalog-form__form" >
          <FilterMinMaxRange
            title='Цена, ₽'
            nameMin='text-min'
            nameMax='text-max'
            prefixClassName='price'
            value={price}
            showInputs
            onChange={(value) => {
              setPrice(value);
            }}
          />
          <FilterMinMaxRange
            title='Калории'
            nameMin='text-min-cal'
            nameMax='text-max-cal'
            prefixClassName='calories'
            value={caloriesLose}
            showInputs
            onChange={(value) => {
              setCaloriesLose(value);
            }}
          />
          <FilterMinMaxRange
            title='Рейтинг'
            prefixClassName='rating'
            value={rating}
            onChange={(value) => {
              setRating(value);
            }}
          />
          <FilterSpecializations
            specializations={specializations}
            onChange={handleSpecializationsChange}
          />
          <TrainingCatalogFormSort
            sortType={sortType}
            onChange={
              (sort) => {
                setSortType(sort);
              }
            }
          />
        </form>
      </div >
    </div >
  );
}

export default TrainingCatalogForm;
