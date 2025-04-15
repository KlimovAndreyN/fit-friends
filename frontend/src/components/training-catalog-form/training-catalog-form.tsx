import { FormEvent, useEffect, useState } from 'react';

import { Specialization } from '@backend/shared/core';

import BackButton from '../back-button/back-button';
import FilterSpecializations from '../filter-specializations/filter-specializations';
import FilterMinMaxRange from '../filter-min-max-range/filter-min-max-range';

import { useAppDispatch } from '../../hooks';
import { fetchTrainings } from '../../store/training-action';
import { parseStringNumber } from '../../utils/common';

function TrainingCatalogForm(): JSX.Element {
  //! вынести обработку элементов отдельно, но стате оставлять здесь
  //! добавить перечисление для сортировки, пока выставил sort1, sort2, sort3
  //! проверить консоль браузера на ошибки

  const dispatch = useAppDispatch();
  const [specializations, setSpecializations] = useState(new Set<Specialization>());
  const [priceMin, setPriceMin] = useState<number | undefined>(0);
  const [priceMax, setPriceMax] = useState<number | undefined>(100000); //! 100000 временно! нужно получить максимальную цену? что по ТЗ?
  const [caloriesLoseMin, setCaloriesLoseMin] = useState<number | undefined>();
  const [caloriesLoseMax, setCaloriesLoseMax] = useState<number | undefined>();
  const [sortType, setSortType] = useState('sort1'); //! временно

  useEffect(() => {
    //! отладка
    // eslint-disable-next-line no-console
    console.log('TrainingCatalogForm - priceMin', priceMin);
    // eslint-disable-next-line no-console
    console.log('TrainingCatalogForm - specializations', specializations);

    dispatch(fetchTrainings());
  }, [dispatch, specializations, priceMin]);

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

  return (
    <div className="gym-catalog-form">
      <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
      <div className="gym-catalog-form__wrapper">
        <BackButton className='gym-catalog-form' classPrefix />
        <h3 className="gym-catalog-form__title">Фильтры</h3>
        <form className="gym-catalog-form__form" >
          <div className="gym-catalog-form__block gym-catalog-form__block--price">
            <h4 className="gym-catalog-form__block-title">Цена, ₽</h4>
            <div className="filter-price">
              <div className="filter-price__input-text filter-price__input-text--min">
                <input
                  type="number"
                  id="text-min"
                  name="text-min"
                  defaultValue={priceMin}
                  onInput={(event: FormEvent<HTMLInputElement>) => {
                    event.preventDefault();

                    setPriceMin(parseStringNumber(event.currentTarget.value));
                  }}
                />
                <label htmlFor="text-min">от</label>
              </div>
              <div className="filter-price__input-text filter-price__input-text--max">
                <input type="number" id="text-max" name="text-max" defaultValue="3200" />
                <label htmlFor="text-max">до</label>
              </div>
            </div>
            <div className="filter-range">
              <div className="filter-range__scale">
                <div className="filter-range__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
              </div>
              <div className="filter-range__control">
                <button className="filter-range__min-toggle"><span className="visually-hidden">Минимальное значение</span></button>
                <button className="filter-range__max-toggle"><span className="visually-hidden">Максимальное значение</span></button>
              </div>
            </div>
          </div>

          <FilterMinMaxRange
            title='Калории'
            prefixClassName='calories'
            minValue={caloriesLoseMin}
            maxValue={caloriesLoseMax}
            onChange={(min, max) => {
              // eslint-disable-next-line no-console
              console.log(min, max);//! временно!
            }}
          />

          <div className="gym-catalog-form__block gym-catalog-form__block--rating">
            <h4 className="gym-catalog-form__block-title">Рейтинг</h4>
            <div className="filter-raiting">
              <div className="filter-raiting__scale">
                <div className="filter-raiting__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
              </div>
              <div className="filter-raiting__control">
                <button className="filter-raiting__min-toggle"><span className="visually-hidden">Минимальное значение</span></button><span>1</span>
                <button className="filter-raiting__max-toggle"><span className="visually-hidden">Максимальное значение</span></button><span>5</span>
              </div>
            </div>
          </div>
          <div className="gym-catalog-form__block gym-catalog-form__block--type">
            <h4 className="gym-catalog-form__block-title">Тип</h4>
            <ul className="gym-catalog-form__check-list">
              <FilterSpecializations specializations={specializations} onChange={handleSpecializationsChange} />
            </ul>
          </div>
          <div className="gym-catalog-form__block gym-catalog-form__block--sort">
            <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
            <div className="btn-radio-sort gym-catalog-form__radio">
              <label>
                <input type="radio" name="sort" defaultChecked value='sort1' /><span className="btn-radio-sort__label">Дешевле</span>
              </label>
              <label>
                <input type="radio" name="sort" value='sort2' /><span className="btn-radio-sort__label">Дороже</span>
              </label>
              <label>
                <input type="radio" name="sort" value='sort3' /><span className="btn-radio-sort__label">Бесплатные</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TrainingCatalogForm;
