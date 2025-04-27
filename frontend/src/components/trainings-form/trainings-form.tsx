import { Specialization, SortType, Duration, ITrainingQuery } from '@backend/shared/core';
import { deleteItem } from '@backend/shared/helpers';

import BackButton from '../back-button/back-button';
import FilterEnumCheckboxes from '../filter-enum-checkboxes/filter-enum-checkboxes';
import FilterMinMaxRange from '../filter-min-max-range/filter-min-max-range';
import TrainingsFormSort from '../trainings-form-sort/trainings-form-sort';

import { MinMaxRange } from '../../types/types';
import { DURATIONS, SPECIALISATIONS } from '../../const';
import { FormEvent } from 'react';
import { getMin } from '../../utils/min-max';

const Limit = {
  RATING_ZERO: 0,
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
  const { priceMin, priceMax, ratingMin, ratingMax, caloriesWasteMin, caloriesWasteMax, specializations, durations, sortType } = trainingsFilter;
  const newPriceMax = getMin(priceMax, trainingsMaxPrice);
  const ratingLimitValue: MinMaxRange = {
    min: (startOnZeroRating) ? Limit.RATING_ZERO : Limit.RATING_MIN,
    max: Limit.RATING_MAX
  };
  const ratingValue: MinMaxRange = {
    min: ratingMin,
    max: ratingMax
  };

  console.log('TrainingsForm - priceMin', priceMin);
  console.log('TrainingsForm - priceMax', priceMax);
  console.log('TrainingsForm - trainingsMaxPrice', trainingsMaxPrice);

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const handlePriceFilterMinMaxRangeChange = (value: MinMaxRange) => {
    onTrainingsFilterChange({ priceMin: value.min, priceMax: value.max });
  };

  const handleCaloriesWasteFilterMinMaxRangeChange = (value: MinMaxRange) => {
    onTrainingsFilterChange({ caloriesWasteMin: value.min, caloriesWasteMax: value.max });
  };

  const handleRatingFilterMinMaxRangeChange = (value: MinMaxRange) => {
    onTrainingsFilterChange({ ratingMin: value.min, ratingMax: value.max });
  };

  const handleSpecializationsChange = (specialization: Specialization) => {
    if (specializations?.includes(specialization)) {
      onTrainingsFilterChange({ specializations: deleteItem(specializations, specialization) });
    } else {
      specializations?.push(specialization);
      onTrainingsFilterChange({ specializations });
    }
  };

  const handleDurationsChange = (duration: Duration) => {
    if (durations?.includes(duration)) {
      onTrainingsFilterChange({ durations: deleteItem(durations, duration) });
    } else {
      durations?.push(duration);
      onTrainingsFilterChange({ durations });
    }
  };

  const handleTrainingCatalogFormSortChange = (newSortType: SortType) => {
    onTrainingsFilterChange({ sortType: newSortType });
  };

  return (
    <div className={className}>
      <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
      <div className={`${className}__wrapper`}>
        <BackButton className={className} classPrefix />
        <h3 className={`${className}__title`}>Фильтры</h3>
        <form className={`${className}__form`} onSubmit={handleFormSubmit}>
          <FilterMinMaxRange
            title='Цена, ₽'
            nameMin='text-min'
            nameMax='text-max'
            className={className}
            prefixClassName='price'
            value={{
              min: priceMin,
              max: newPriceMax
            }}
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
            value={{
              min: caloriesWasteMin,
              max: caloriesWasteMax
            }}
            showInputs
            onChange={handleCaloriesWasteFilterMinMaxRangeChange}
          />
          <FilterMinMaxRange
            title='Рейтинг'
            className={className}
            prefixClassName={ratingPrefixClassName} // Немного разные классы в css у каталога и моих
            prefixLabelClassName='raiting'
            value={ratingValue}
            limitValue={ratingLimitValue}
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
