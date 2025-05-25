import { FormEvent, JSX } from 'react';

import { Specialization, TrainingLevel } from '@backend/shared/core';

import FilterEnumCheckboxes from '../filter-enum-checkboxes/filter-enum-checkboxes';
import CustomToggleRadio from '../custom-toggle-radio/custom-toggle-radio';
import UsersCatalogFormSort from '../users-catalog-form-sort/users-catalog-form-sort';

import { LOCATIONS, SPECIALISATIONS, TRAINING_LEVELS } from '../../const';

const DEFAULT_TRAINING_LEVEL = TrainingLevel.Amateur;

/*
type UsersCatalogFormProps = {
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
*/

//function UsersCatalogForm(props: UsersCatalogFormProps): JSX.Element {
function UsersCatalogForm(): JSX.Element {
  //! CustomToggleRadioнужно сделать в управляемый

  /*
  const { className, ratingPrefixClassName, trainingsFilter, trainingsMaxPrice, startOnZeroRating, onTrainingsFilterChange, showedFilterSpecializations, showedFilterDurations, showedSorting } = props;
  const { priceMin, priceMax, ratingMin, ratingMax, caloriesWasteMin, caloriesWasteMax, specializations, durations, sortType } = trainingsFilter;
  */

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  /*
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
  */

  return (
    <div className="user-catalog-form">
      <h2 className="visually-hidden">Каталог пользователя</h2>
      <div className="user-catalog-form__wrapper">
        <button className="btn-flat btn-flat--underlined user-catalog-form__btnback" type="button">
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="#arrow-left"></use>
          </svg><span>Назад</span>
        </button>
        <h3 className="user-catalog-form__title">Фильтры</h3>
        <form className="user-catalog-form__form" onSubmit={handleFormSubmit}>
          <FilterEnumCheckboxes<Location>
            caption='Локация, станция метро'
            name='location'
            items={[]}
            options={LOCATIONS}
            className='user-catalog-form'
            isShowAllButton
            onChange={() => {
              // eslint-disable-next-line no-console
              console.log('onChange - Location');
            }}
          />
          <FilterEnumCheckboxes<Specialization>
            caption='Специализация'
            name='spezialization'
            items={[]}
            options={SPECIALISATIONS}
            className='user-catalog-form'
            isShowAllButton
            onChange={() => {
              // eslint-disable-next-line no-console
              console.log('onChange - Specialization');
            }}
          />
          <div className="user-catalog-form__block user-catalog-form__block--level">
            <h4 className="user-catalog-form__block-title">Уровень</h4> {/* //! в маркапе видимо опечатка "Ваш уровень", но мы ищем пользоватлей с каким то уровнем...*/}
            <CustomToggleRadio
              name='level'
              options={TRAINING_LEVELS}
              value={DEFAULT_TRAINING_LEVEL}
              isSmall
            />
          </div>
          <UsersCatalogFormSort
            sortType={undefined} // временно
            className='user-catalog-form'
            isUseButtonRatioClassName={false}
            onChange={() => {
              // eslint-disable-next-line no-console
              console.log('onChange - UsersCatalogFormSort');
            }}
          />
        </form>
      </div>
    </div>
  );
}

export default UsersCatalogForm;
