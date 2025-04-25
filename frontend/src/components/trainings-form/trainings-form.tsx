import { useEffect, useState } from 'react';

import { Specialization, SortType, ITrainingQuery, Duration } from '@backend/shared/core';

import BackButton from '../back-button/back-button';
import FilterEnumCheckboxes from '../filter-enum-checkboxes/filter-enum-checkboxes';
import FilterMinMaxRange from '../filter-min-max-range/filter-min-max-range';
import TrainingsFormSort from '../trainings-form-sort/trainings-form-sort';

import { useAppDispatch } from '../../hooks';
import { fetchTrainings } from '../../store/actions/training-action';
import { MinMaxRange } from '../../types/types';
import { DURATIONS, SPECIALISATIONS } from '../../const';

const Default = {
  PAGE: 1,
  PRICE_MIN: 0,
  RATING: { min: 1, max: 5 }
} as const;

type TrainingsFormProps = {
  className: string;
  ratingPrefixClassName: string;
  startOnZeroRating?: boolean;
  showedFilterSpecializations?: boolean;
  showedFilterDurations?: boolean;
  showedSorting?: boolean;
}

function TrainingsForm(props: TrainingsFormProps): JSX.Element {
  const { className, ratingPrefixClassName, startOnZeroRating, showedFilterSpecializations, showedFilterDurations, showedSorting } = props;
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(Default.PAGE); //! задействовать setPage
  //! временно
  // eslint-disable-next-line no-console
  console.log('page', page, 'setPage', setPage);
  const [price, setPrice] = useState<MinMaxRange>({ min: Default.PRICE_MIN, max: 100000 }); //! 100000 временно, что по ТЗ нужно считать максимальную цену?
  const [caloriesWaste, setCaloriesWaste] = useState<MinMaxRange>({ min: undefined, max: undefined });
  const minRating = (startOnZeroRating) ? 0 : Default.RATING.min;
  const [rating, setRating] = useState<MinMaxRange>({ min: minRating, max: Default.RATING.max });
  const [specializations, setSpecializations] = useState(new Set<Specialization>());
  const [durations, setDurations] = useState(new Set<Duration>());
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
      durations: Array.from(durations),
      sortType
    };

    dispatch(fetchTrainings(query));
  }, [dispatch, page, price, caloriesWaste, rating, specializations, durations, sortType]);

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

  const handleDurationsChange = (duration: Duration) => {
    setDurations((prevItems) => {
      const newItems = new Set(prevItems);

      if (newItems.has(duration)) {
        newItems.delete(duration);
      } else {
        newItems.add(duration);
      }

      return newItems;
    });
  };

  const handleTrainingCatalogFormSortChange = (sort: SortType) => {
    setSortType(sort);
  };

  return (
    <div className={className}>
      <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
      <div className={`${className}__wrapper`}>
        <BackButton className={className} classPrefix />
        <h3 className={`${className}__title`}>Фильтры</h3>
        <form className={`${className}__form`}>
          <FilterMinMaxRange
            title='Цена, ₽'
            nameMin='text-min'
            nameMax='text-max'
            className={className}
            prefixClassName='price'
            value={price}
            showInputs
            onChange={handlePriceFilterMinMaxRangeChange}
          />
          <FilterMinMaxRange
            title='Калории'
            className={className}
            nameMin='text-min-cal'
            nameMax='text-max-cal'
            prefixClassName='calories'
            value={caloriesWaste}
            showInputs
            onChange={handleCaloriesWasteFilterMinMaxRangeChange}
          />
          <FilterMinMaxRange
            title='Рейтинг'
            className={className}
            prefixClassName={ratingPrefixClassName} // Немного разные классы в css у каталога и моих
            prefixLabelClassName='raiting'
            value={rating}
            onChange={handleRatingFilterMinMaxRangeChange}
          />
          {
            showedFilterSpecializations &&
            <FilterEnumCheckboxes<Specialization>
              caption='Тип'
              name='type'
              items={specializations}
              options={SPECIALISATIONS}
              className={className}
              onChange={handleSpecializationsChange}
            />
          }
          {
            showedFilterDurations &&
            <FilterEnumCheckboxes<Duration>
              caption='Длительность'
              name='duration'
              items={durations}
              options={DURATIONS}
              className={className}
              onChange={handleDurationsChange}
            />
          }
          {
            showedSorting &&
            <TrainingsFormSort
              sortType={sortType}
              className={className}
              onChange={handleTrainingCatalogFormSortChange}
            />
          }
        </form>
      </div >
    </div >
  );
}

export default TrainingsForm;
