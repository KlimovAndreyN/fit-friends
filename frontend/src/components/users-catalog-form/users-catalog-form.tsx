import { FormEvent, JSX } from 'react';

import { IUserQuery, Location, Specialization, TrainingLevel, UserSortType } from '@backend/shared/core';
import { deleteItem } from '@backend/shared/helpers';

import FilterEnumCheckboxes from '../filter-enum-checkboxes/filter-enum-checkboxes';
import CustomToggleRadio from '../custom-toggle-radio/custom-toggle-radio';
import UsersCatalogFormSort from '../users-catalog-form-sort/users-catalog-form-sort';

import { LOCATIONS, SPECIALISATIONS, TRAINING_LEVELS } from '../../const';

const DEFAULT_TRAINING_LEVEL = TrainingLevel.Amateur; //! наверное перенести в store

type UsersCatalogFormProps = {
  usersFilter: IUserQuery;
  onUsersFilterChange: (newFilter: IUserQuery) => void;
}

function UsersCatalogForm({ usersFilter, onUsersFilterChange }: UsersCatalogFormProps): JSX.Element {
  //! CustomToggleRadioнужно сделать в управляемый

  const { locations, specializations, level, sortType } = usersFilter;

  // eslint-disable-next-line no-console
  console.log(level, sortType);

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const handleLocationsChange = (location: Location) => {
    // eslint-disable-next-line no-console
    console.log('handleLocationsChange - Location', location);

    if (locations?.includes(location)) {
      onUsersFilterChange({ locations: deleteItem(locations, location) });
    } else {
      onUsersFilterChange({ locations: [...((locations) ? locations : []), location] });
    }
  };

  const handleSpecializationsChange = (specialization: Specialization) => {
    // eslint-disable-next-line no-console
    console.log('handleSpecializationsChange - Specialization', specialization);

    if (specializations?.includes(specialization)) {
      onUsersFilterChange({ specializations: deleteItem(specializations, specialization) });
    } else {
      onUsersFilterChange({ specializations: [...((specializations) ? specializations : []), specialization] });
    }
  };

  /*
    const handleLevelChange = (newLevel: TrainingLevel) => {
      // eslint-disable-next-line no-console
      console.log('handleLevelChange - newLevel', newLevel);
      onUsersFilterChange({ level: newLevel });
    };
  */

  const handleSortChange = (newSortType: UserSortType) => {
    // eslint-disable-next-line no-console
    console.log('handleSortChange - sortType', sortType);
    onUsersFilterChange({ sortType: newSortType });
  };

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
            items={locations}
            options={LOCATIONS}
            className='user-catalog-form'
            isShowAllButton
            onChange={handleLocationsChange}
          />
          <FilterEnumCheckboxes<Specialization>
            caption='Специализация'
            name='spezialization'
            items={specializations}
            options={SPECIALISATIONS}
            className='user-catalog-form'
            isShowAllButton
            onChange={handleSpecializationsChange}
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
            sortType={sortType}
            className='user-catalog-form'
            isUseButtonRatioClassName={false}
            onChange={handleSortChange}
          />
        </form>
      </div>
    </div>
  );
}

export default UsersCatalogForm;
