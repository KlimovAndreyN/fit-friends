import { useEffect, useState } from 'react';

import { Specialization } from '@backend/shared/core';

import BackButton from '../back-button/back-button';
import FilterSpecializations from '../filter-specializations/filter-specializations';
import FilterMinMaxRange from '../filter-min-max-range/filter-min-max-range';

import { useAppDispatch } from '../../hooks';
import { fetchTrainings } from '../../store/training-action';

function TrainingCatalogForm(): JSX.Element {
  //! может на изменения добавить задержку по времени?
  //! добавить перечисление для сортировки, пока выставил sort1, sort2, sort3
  //! проверить консоль браузера на ошибки

  const dispatch = useAppDispatch();
  //! может парами в стейт закидывать?
  const [priceMin, setPriceMin] = useState<number | undefined>(0);
  const [priceMax, setPriceMax] = useState<number | undefined>(100000); //! 100000 временно! нужно получить максимальную цену? что по ТЗ?
  //! может парами в стейт закидывать?
  const [caloriesLoseMin, setCaloriesLoseMin] = useState<number | undefined>();
  const [caloriesLoseMax, setCaloriesLoseMax] = useState<number | undefined>();
  //! может парами в стейт закидывать?
  const [ratingMin, setRatingMin] = useState<number | undefined>(1); //!
  const [ratingMax, setRatingMax] = useState<number | undefined>(5); //!
  const [specializations, setSpecializations] = useState(new Set<Specialization>());
  const [sortType, setSortType] = useState('sort1'); //! временно

  useEffect(() => {
    //! отладка
    // eslint-disable-next-line no-console
    console.log('TrainingCatalogForm - useEffect', { priceMin, priceMax, caloriesLoseMin, caloriesLoseMax, ratingMin, ratingMax, specializations, sortType });

    dispatch(fetchTrainings());
  }, [dispatch, priceMin, priceMax, caloriesLoseMin, caloriesLoseMax, ratingMin, ratingMax, specializations, sortType]);

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
          <FilterMinMaxRange
            title='Цена, ₽'
            nameMin='text-min'
            nameMax='text-max'
            prefixClassName='price'
            minValue={priceMin}
            maxValue={priceMax}
            showInputs
            onChange={(min, max) => {
              // eslint-disable-next-line no-console
              console.log(min, max);//! временно!
              setPriceMin(min);
              setPriceMax(max);
            }}
          />
          <FilterMinMaxRange
            title='Калории'
            nameMin='text-min-cal'
            nameMax='text-max-cal'
            prefixClassName='calories'
            minValue={caloriesLoseMin}
            maxValue={caloriesLoseMax}
            showInputs
            onChange={(min, max) => {
              // eslint-disable-next-line no-console
              console.log(min, max);//! временно!
              setCaloriesLoseMin(min);
              setCaloriesLoseMax(max);
            }}
          />
          <FilterMinMaxRange
            title='Рейтинг'
            prefixClassName='rating'
            minValue={ratingMin}
            maxValue={ratingMax}
            onChange={(min, max) => {
              // eslint-disable-next-line no-console
              console.log(min, max);//! временно!
              setRatingMin(min);
              setRatingMax(max);
            }}
          />
          <FilterSpecializations
            specializations={specializations}
            onChange={handleSpecializationsChange}
          />
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
      </div >
    </div >
  );
}

export default TrainingCatalogForm;
