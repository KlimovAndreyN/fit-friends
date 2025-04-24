import { useEffect, useState } from 'react';

import { Specialization, SortType, ITrainingQuery } from '@backend/shared/core';

import BackButton from '../back-button/back-button';
import FilterSpecializations from '../filter-specializations/filter-specializations';
import FilterMinMaxRange from '../filter-min-max-range/filter-min-max-range';
import TrainingsFormSort from '../trainings-form-sort/trainings-form-sort';

import { useAppDispatch } from '../../hooks';
import { fetchTrainings } from '../../store/actions/training-action';
import { MinMaxRange } from '../../types/types';

const Default = {
  PAGE: 1,
  PRICE_MIN: 0,
  RATING: { min: 1, max: 5 }
} as const;

type TrainingsFormProps = {
  className: string;
}

function TrainingsForm({ className }: TrainingsFormProps): JSX.Element {
  //! может на изменения добавить задержку по времени?
  //! показать еще - проанализировать сколько страниц еще есть, навернео добавить селектор
  //! если последняя страница, то показать еще прячем и показываем кнопку наверх
  //! добавить range - двигать мышкой в FilterMinMaxRange
  //! нет черты на фильтре калории - масшаб в мозилле...
  //! проверить еще логику по ТЗ и разметку
  //! проверить консоль браузера на ошибки

  const dispatch = useAppDispatch();
  const [page, setPage] = useState(Default.PAGE); //! задействовать setPage
  //! временно
  // eslint-disable-next-line no-console
  console.log('page', page, 'setPage', setPage);
  const [price, setPrice] = useState<MinMaxRange>({ min: Default.PRICE_MIN, max: 100000 }); //! 100000 временно, что по ТЗ нужно считать максимальную цену?
  const [caloriesWaste, setCaloriesWaste] = useState<MinMaxRange>({ min: undefined, max: undefined });
  const [rating, setRating] = useState<MinMaxRange>(Default.RATING);
  const [specializations, setSpecializations] = useState(new Set<Specialization>());
  const [sortType, setSortType] = useState<SortType>();

  useEffect(() => {
    const query: ITrainingQuery = {
      page,
      priceMin: price.min,
      priceMax: price.max,
      caloriesWasteMin: caloriesWaste.min,
      caloriesWasteMax: caloriesWaste.max,
      ratingMin: rating.min,
      ratingMax: rating.max,
      specializations: Array.from(specializations),
      sortType
    };

    dispatch(fetchTrainings(query));
  }, [dispatch, page, price, caloriesWaste, rating, specializations, sortType]);

  const handlePriceFilterMinMaxRangeChange = (value: MinMaxRange) => {
    setPrice(value);
  };

  const handleCaloriesWasteFilterMinMaxRangeChange = (value: MinMaxRange) => {
    setCaloriesWaste(value);
  };

  const handleRatingFilterMinMaxRangeChange = (value: MinMaxRange) => {
    setRating(value);
  };

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

  const handleTrainingCatalogFormSortChange = (sort: SortType) => {
    setSortType(sort);
  };

  //!
  // eslint-disable-next-line no-console
  console.log('className', className);

  return (
    <div className={className}>
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
            onChange={handlePriceFilterMinMaxRangeChange}
          />
          <FilterMinMaxRange
            title='Калории'
            nameMin='text-min-cal'
            nameMax='text-max-cal'
            prefixClassName='calories'
            value={caloriesWaste}
            showInputs
            onChange={handleCaloriesWasteFilterMinMaxRangeChange}
          />
          <FilterMinMaxRange
            title='Рейтинг'
            prefixClassName='rating'
            prefixLabelClassName='raiting' // опечатка в css
            value={rating}
            onChange={handleRatingFilterMinMaxRangeChange}
          />
          <FilterSpecializations
            specializations={specializations}
            onChange={handleSpecializationsChange}
          />
          <TrainingsFormSort
            sortType={sortType}
            onChange={handleTrainingCatalogFormSortChange}
          />
        </form>
      </div >
    </div >
  );
}

export default TrainingsForm;
