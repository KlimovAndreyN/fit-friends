import { FormEvent } from 'react';

import { enumToArray } from '@backend/shared/helpers';

import { SortType, SortTypeTitle } from '../../const';

type TrainingCatalogFormSortProps = {
  sortType: SortType;
  onChange: (sort: SortType) => void;
}

function TrainingCatalogFormSort({ sortType, onChange }: TrainingCatalogFormSortProps): JSX.Element {
  return (
    <div className="gym-catalog-form__block gym-catalog-form__block--sort">
      <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
      <div className="btn-radio-sort gym-catalog-form__radio">
        {
          enumToArray(SortType).map(
            (sort) => (
              <label
                key={sort}
                onClick={
                  (event: FormEvent<HTMLLabelElement>) => {
                    event.preventDefault();

                    onChange(sort);
                  }
                }
              >
                <input type="radio" name="sort" checked={sort === sortType} readOnly />
                <span className="btn-radio-sort__label">{SortTypeTitle[sort]}</span>
              </label>
            )
          )
        }
      </div>
    </div>
  );
}

export default TrainingCatalogFormSort;
