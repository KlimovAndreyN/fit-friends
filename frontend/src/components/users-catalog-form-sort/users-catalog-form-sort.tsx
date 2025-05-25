import { JSX, FormEvent } from 'react';

import { UserSortType } from '@backend/shared/core';
import { convertEnumToArray } from '@backend/shared/helpers';

const SortTypeTitle: { [key in UserSortType]: string } = {
  [UserSortType.OnlyCoach]: 'Тренеры',
  [UserSortType.OnlySportsman]: 'Пользователи'
} as const;

type UsersCatalogFormSortProps = {
  sortType?: UserSortType;
  className: string;
  onChange: (sort: UserSortType) => void;
}

function UsersCatalogFormSort({ sortType, className, onChange }: UsersCatalogFormSortProps): JSX.Element {
  return (
    <div className={`${className}__block ${className}__block--sort`}>
      <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
      <div className="btn-radio-sort">
        <label>
          <input type="radio" name="sort" /><span className="btn-radio-sort__label">Тренеры</span>
        </label>
        <label>
          <input type="radio" name="sort" /><span className="btn-radio-sort__label">Пользователи</span>
        </label>
      </div>

      <h4 className={`${className}__title ${className}__title--sort`}>Сортировка</h4>
      <div className={`btn-radio-sort ${className}__radio`}>
        {
          convertEnumToArray(UserSortType).map(
            (sort) => {
              const handleLabelClick = (event: FormEvent) => {
                event.preventDefault();

                if (sort !== sortType) {
                  onChange(sort);
                }
              };

              return (
                <label key={sort} onClick={handleLabelClick}>
                  <input type="radio" name="sort" checked={sort === sortType} readOnly />
                  <span className="btn-radio-sort__label">{SortTypeTitle[sort]}</span>
                </label>
              );
            }
          )
        }
      </div>
    </div>
  );
}

export default UsersCatalogFormSort;
