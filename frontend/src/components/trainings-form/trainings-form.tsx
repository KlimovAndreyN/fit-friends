import { JSX, FormEvent } from 'react';

import { Specialization, SortType, Duration, ITrainingQuery, isForFreeSortType } from '@backend/shared/core';
import { deleteItem } from '@backend/shared/helpers';

import BackButton from '../back-button/back-button';
import FilterEnumCheckboxes from '../filter-enum-checkboxes/filter-enum-checkboxes';
import FilterMinMaxRange from '../filter-min-max-range/filter-min-max-range';
import TrainingsFormSort from '../trainings-form-sort/trainings-form-sort';

import { TRAINIG_FILTER_DURATIONS, SPECIALISATIONS } from '../../const';

const Limit = {
  PRICE_MIN: 0,
  RATING_ZERO: 0,
  RATING_MIN: 1,
  RATING_MAX: 5,
  CALORIES_WASTE_MIN: 1,
  CALORIES_WASTE_MAX: 5000 // то ТЗ в фильтре нет ограничения, но в ДТО есть, а для слайдера нужно
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

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const handlePriceFilterMinMaxRangeChange = (newValueMin: number | undefined, newValueMax: number | undefined) => {
    onTrainingsFilterChange({ priceMin: newValueMin, priceMax: newValueMax });
  };

  const handleCaloriesWasteFilterMinMaxRangeChange = (newValueMin: number | undefined, newValueMax: number | undefined) => {
    onTrainingsFilterChange({ caloriesWasteMin: newValueMin, caloriesWasteMax: newValueMax });
  };

  const handleRatingFilterMinMaxRangeChange = (newValueMin: number | undefined, newValueMax: number | undefined) => {
    onTrainingsFilterChange({ ratingMin: newValueMin, ratingMax: newValueMax });
  };

  const handleSpecializationsChange = (specialization: Specialization) => {
    if (specializations?.includes(specialization)) {
      onTrainingsFilterChange({ specializations: deleteItem(specializations, specialization) });
    } else {
      onTrainingsFilterChange({ specializations: [...((specializations) ? specializations : []), specialization] });
    }
  };

  const handleDurationsChange = (duration: Duration) => {
    if (durations?.includes(duration)) {
      onTrainingsFilterChange({ durations: deleteItem(durations, duration) });
    } else {
      onTrainingsFilterChange({ durations: [...((durations) ? durations : []), duration] });
    }
  };

  const handleTrainingCatalogFormSortChange = (newSortType: SortType) => {
    onTrainingsFilterChange({ sortType: newSortType });
  };

  return (
    <div className={className}>
      <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
      <div className={`${className}__wrapper`}>
        <BackButton className={className} classPrefix underlined />
        <h3 className={`${className}__title`}>Фильтры</h3>
        <form className={`${className}__form`} onSubmit={handleFormSubmit}>
          <FilterMinMaxRange
            title='Цена, ₽'
            nameMin='text-min'
            nameMax='text-max'
            className={className}
            prefixClassName='price'
            valueMin={priceMin}
            valueMax={priceMax}
            limitValueMin={Limit.PRICE_MIN}
            limitValueMax={trainingsMaxPrice || Limit.PRICE_MIN}
            showInputs
            onChange={handlePriceFilterMinMaxRangeChange}
            disabled={isForFreeSortType(sortType)}
          />
          <FilterMinMaxRange
            title='Калории'
            className={className}
            nameMin='text-min-cal'
            nameMax='text-max-cal'
            prefixClassName='calories'
            valueMin={caloriesWasteMin}
            valueMax={caloriesWasteMax}
            limitValueMin={Limit.CALORIES_WASTE_MIN}
            limitValueMax={Limit.CALORIES_WASTE_MAX}
            showInputs
            onChange={handleCaloriesWasteFilterMinMaxRangeChange}
          />
          <FilterMinMaxRange
            title='Рейтинг'
            className={className}
            prefixClassName={ratingPrefixClassName} // Немного разные классы в css у каталога и моих
            prefixLabelClassName='raiting'
            valueMin={ratingMin}
            valueMax={ratingMax}
            limitValueMin={(startOnZeroRating) ? Limit.RATING_ZERO : Limit.RATING_MIN}
            limitValueMax={Limit.RATING_MAX}
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
              options={TRAINIG_FILTER_DURATIONS}
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
