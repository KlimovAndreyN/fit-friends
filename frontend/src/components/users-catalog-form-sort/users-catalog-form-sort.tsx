import { JSX, FormEvent } from 'react';
import classNames from 'classnames';

import { UserSortType } from '@backend/shared/core';
import { convertEnumToArray } from '@backend/shared/helpers';

const SortTypeTitle: { [key in UserSortType]: string } = {
  [UserSortType.OnlyCoach]: 'Тренеры',
  [UserSortType.OnlySportsman]: 'Пользователи'
} as const;

type UsersCatalogFormSortProps = {
  sortType?: UserSortType;
  className: string;
  isUseButtonRatioClassName: boolean;
  onChange: (sort: UserSortType | undefined) => void;
}

function UsersCatalogFormSort({ sortType, className, isUseButtonRatioClassName, onChange }: UsersCatalogFormSortProps): JSX.Element {
  //! попробовать сделать дженериком с TrainingsFormSort
  //   добавил isUseButtonRatioClassName

  return (
    <div className={`${className}__block ${className}__block--sort`}>
      <h4 className={`${className}__title ${className}__title--sort`}>Сортировка</h4>
      <div className={classNames('btn-radio-sort', { [`${className}__radio`]: isUseButtonRatioClassName })}>
        {
          convertEnumToArray(UserSortType).map(
            (sort) => {
              const handleLabelClick = (event: FormEvent) => {
                event.preventDefault();

                if (sort !== sortType) {
                  onChange(sort);
                } else {
                  onChange(undefined);
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
