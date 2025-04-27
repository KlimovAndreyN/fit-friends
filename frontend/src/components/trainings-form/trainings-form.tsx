import { useState } from 'react';

import { Specialization, SortType, Duration, ITrainingQuery } from '@backend/shared/core';

import BackButton from '../back-button/back-button';
import FilterEnumCheckboxes from '../filter-enum-checkboxes/filter-enum-checkboxes';
import FilterMinMaxRange from '../filter-min-max-range/filter-min-max-range';
import TrainingsFormSort from '../trainings-form-sort/trainings-form-sort';

import { MinMaxRange } from '../../types/types';
import { DURATIONS, SPECIALISATIONS } from '../../const';

const Limit = {
  //PRICE_MIN: 0,
  RATING_MIN: 1,
  RATING_MAX: 5
} as const;

type TrainingsFormProps = {
  className: string;
  ratingPrefixClassName: string;
  trainingsFilter: ITrainingQuery;
  trainingsMaxPrice?: number;
  startOnZeroRating?: boolean;
  onTrainingsFilterChange: (newFilter: ITrainingQuery) => void;
  showedFilterSpecializations?: boolean;
  showedFilterDurations?: boolean;
  showedSorting?: boolean;
}

function TrainingsForm(props: TrainingsFormProps): JSX.Element {
  const { className, ratingPrefixClassName, trainingsFilter, trainingsMaxPrice, startOnZeroRating, onTrainingsFilterChange, showedFilterSpecializations, showedFilterDurations, showedSorting } = props;

  const { priceMin, priceMax, ratingMin, ratingMax } = trainingsFilter;
  const [caloriesWaste, setCaloriesWaste] = useState<MinMaxRange>({ min: undefined, max: undefined });
  const [rating, setRating] = useState<MinMaxRange>({ min: ratingMin, max: ratingMax });
  const [specializations, setSpecializations] = useState(new Set<Specialization>());
  const [durations, setDurations] = useState(new Set<Duration>());
  const [sortType, setSortType] = useState<SortType>();

  const handlePriceFilterMinMaxRangeChange = (value: MinMaxRange) => {
    onTrainingsFilterChange({ priceMin: value.min, priceMax: value.max });
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
            value={{ min: priceMin, max: priceMax }}
            limitValue={{
              min: 0,
              max: trainingsMaxPrice
            }}
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
            limitValue={{
              min: (startOnZeroRating) ? 0 : Limit.RATING_MIN,
              max: Limit.RATING_MAX
            }}
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
