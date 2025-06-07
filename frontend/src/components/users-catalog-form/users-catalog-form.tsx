import { FormEvent, JSX } from 'react';

import { IUserProfileQuery, Location, Specialization, TrainingLevel, UserSortType } from '@backend/shared/core';
import { convertEnumToArray, deleteItem } from '@backend/shared/helpers';

import BackButton from '../back-button/back-button';
import FilterEnumCheckboxes from '../filter-enum-checkboxes/filter-enum-checkboxes';
import CustomToggleRadio from '../custom-toggle-radio/custom-toggle-radio';
import FilterFormSort from '../filter-form-sort/filter-form-sort';

import { Option } from '../../types/types';
import { LOCATIONS, SPECIALISATIONS, TRAINING_LEVELS } from '../../const';

const SortTypeTitle: { [key in UserSortType]: string } = {
  [UserSortType.OnlyCoach]: 'Тренеры',
  [UserSortType.OnlySportsman]: 'Пользователи'
} as const;

const USER_SORTS: Option[] = convertEnumToArray(UserSortType).map(
  (sortType) => ({ value: sortType, title: SortTypeTitle[sortType] })
);

type UsersCatalogFormProps = {
  usersFilter: IUserProfileQuery;
  onUsersFilterChange: (newFilter: IUserProfileQuery) => void;
}

function UsersCatalogForm({ usersFilter, onUsersFilterChange }: UsersCatalogFormProps): JSX.Element {
  const { locations, specializations, trainingLevel, sortType } = usersFilter;
  const className = 'user-catalog-form';

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const handleLocationsChange = (location: Location) => {
    if (locations?.includes(location)) {
      onUsersFilterChange({ locations: deleteItem(locations, location) });
    } else {
      onUsersFilterChange({ locations: [...((locations) ? locations : []), location] });
    }
  };

  const handleSpecializationsChange = (specialization: Specialization) => {
    if (specializations?.includes(specialization)) {
      onUsersFilterChange({ specializations: deleteItem(specializations, specialization) });
    } else {
      onUsersFilterChange({ specializations: [...((specializations) ? specializations : []), specialization] });
    }
  };

  const handleLevelChange = (newValue: string) => {
    onUsersFilterChange({ trainingLevel: newValue as TrainingLevel });
  };

  const handleSortChange = (newSortType: UserSortType | undefined) => {
    onUsersFilterChange({ sortType: newSortType });
  };

  return (
    <div className={className}>
      <h2 className="visually-hidden">Каталог пользователя</h2>
      <div className={`${className}__wrapper`}>
        <BackButton className={`${className}__btnback`} underlined />
        <h3 className={`${className}__title`}>Фильтры</h3>
        <form className={`${className}__form`} onSubmit={handleFormSubmit}>
          <FilterEnumCheckboxes<Location>
            caption='Локация, станция метро'
            name='location'
            items={locations}
            options={LOCATIONS}
            className={className}
            isShowAllButton
            onChange={handleLocationsChange}
          />
          <FilterEnumCheckboxes<Specialization>
            caption='Специализация'
            name='spezialization'
            items={specializations}
            options={SPECIALISATIONS}
            className={className}
            isShowAllButton
            onChange={handleSpecializationsChange}
          />
          <div className={`${className}__block ${className}__block--level`}>
            <h4 className={`${className}__block-title`}>Уровень</h4> {/* //! в маркапе видимо опечатка "Ваш уровень", но мы ищем пользоватлей с каким то уровнем...*/}
            <CustomToggleRadio
              name='level'
              options={TRAINING_LEVELS}
              value={trainingLevel}
              isSmall
              onChange={handleLevelChange}
            />
          </div>
          <FilterFormSort
            value={sortType}
            options={USER_SORTS}
            className={className}
            isUseButtonRatioClassName={false}
            onChange={handleSortChange}
          />
        </form>
      </div>
    </div>
  );
}

export default UsersCatalogForm;
