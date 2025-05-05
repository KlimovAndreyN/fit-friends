import { FormEvent, Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Duration, Gender, Specialization, TrainingLevel } from '@backend/shared/core';

import Header from '../../components/header/header';
import Block from '../../components/block/block';
import CustomInput from '../../components/custom-input/custom-input';
import CustomSelect from '../../components/custom-select/custom-select';
import CustomToggleRadio from '../../components/custom-toggle-radio/custom-toggle-radio';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setPrevLocation } from '../../store/user-process';
import { getIsCreatedTraining, getIsCreateTrainingExecuting } from '../../store/training-process/selectors';
import { createTraining } from '../../store/actions/training-action';
import { AppRoute, DURATIONS, PageTitle, SPECIALISATIONS, TRAINING_GENDERS, TRAINING_LEVELS } from '../../const';

const DEFAULT_GENDER = Gender.Female;

enum FormFieldName {
  Name = 'training-name',
  Spec = 'specialization',
  CaloriesWaste = 'calories',
  Time = 'time',
  Price = 'price',
  Level = 'level',
  TrainingGender = 'gender',

  //!----
  Files = 'import',
  Description = 'description'
}

function CreateTraining(): JSX.Element {
  //! форма похожа на PopupForm, только с верхним меню, выделить все отдельно, если еще будет использоватся в похожем виде
  //    или когда переделаю PopupForm на форму и страницу
  // специализации все оставил, можно сделать только те что есть в опроснике у тренера
  //   если из личного кабинета, то он есть, а если по ссылке сразу на добавление, то нужно получить опросник и для личного кабинета тоже бы обновить

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreateTrainingExecuting = useAppSelector(getIsCreateTrainingExecuting);
  const isCreatedTraining = useAppSelector(getIsCreatedTraining);

  useEffect(() => {
    if (isCreatedTraining) {
      navigate(AppRoute.MyTrainings);
    }
  }, [navigate, isCreatedTraining]);

  //! отладка
  // eslint-disable-next-line no-console
  console.log('CreateTraining');
  // eslint-disable-next-line no-console
  console.log('isCreateTrainingExecuting', isCreateTrainingExecuting);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const title = formData.get(FormFieldName.Name)?.toString() || '';
    const specialization = (formData.get(FormFieldName.Spec)?.toString() || '') as Specialization;
    const caloriesWaste = parseInt(formData.get(FormFieldName.CaloriesWaste)?.toString() || '', 10);
    const duration = (formData.get(FormFieldName.Time)?.toString() || '') as Duration;
    const price = parseInt(formData.get(FormFieldName.Price)?.toString() || '', 10);
    const trainingLevel = (formData.get(FormFieldName.Level)?.toString() || '') as TrainingLevel;
    const gender = (formData.get(FormFieldName.TrainingGender)?.toString() || '') as Gender;

    // eslint-disable-next-line no-console
    console.log('handlePopupFormSubmit');
    // eslint-disable-next-line no-console
    console.log('title', title);
    // eslint-disable-next-line no-console
    console.log('specialization', specialization);
    // eslint-disable-next-line no-console
    console.log('caloriesWaste', caloriesWaste);
    // eslint-disable-next-line no-console
    console.log('duration', duration);
    // eslint-disable-next-line no-console
    console.log('price', price);
    // eslint-disable-next-line no-console
    console.log('trainingLevel', trainingLevel);
    // eslint-disable-next-line no-console
    console.log('gender', gender);

    //! попробовать добавить в начало новую тренировку, но фильтры могут быть не те, проще заново обновить список тренирорвок и фильтры скинуть
    //! должен быть в начале, т.к. начальная сортировка по дате
    dispatch(setPrevLocation(AppRoute.CreateTraining));

    //! временно
    //dispatch(createTraining('test'));
  };

  const mainClassNamePrefix = 'create-training'; //! заменить везде
  const isDisabled = isCreateTrainingExecuting;

  return (
    <Fragment>
      <Header title={PageTitle.CreateTraining} />
      <main>
        <div className="popup-form popup-form--create-training">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Создание тренировки</h1>
              </div>
              <div className="popup-form__form">
                <form method="post" onSubmit={handleFormSubmit}>
                  <div className={mainClassNamePrefix}>
                    <div className={`${mainClassNamePrefix}__wrapper`}>
                      <Block legend='Название тренировки' className={mainClassNamePrefix} isHeaderLegend>
                        <CustomInput
                          name={FormFieldName.Name}
                          type='text'
                          divExtraClassName={mainClassNamePrefix}
                          readOnly={isDisabled}
                        />
                      </Block>
                      <Block legend='Характеристики тренировки' className={mainClassNamePrefix} isHeaderLegend>
                        <div className={`${mainClassNamePrefix}__info`}>
                          <CustomSelect
                            name={FormFieldName.Spec}
                            caption='Выберите тип тренировки'
                            options={SPECIALISATIONS}
                            extraClassName={mainClassNamePrefix}
                            readOnly={isDisabled}
                          />
                          <CustomInput
                            name={FormFieldName.CaloriesWaste}
                            type='number'
                            divClassNamePostfix='with-text-right'
                            label='Сколько калорий потратим'
                            spanText='ккал'
                          />
                          <CustomSelect
                            name={FormFieldName.Time}
                            caption='Сколько времени потратим'
                            options={DURATIONS}
                            extraClassName={mainClassNamePrefix}
                            readOnly={isDisabled}
                          />
                          <CustomInput
                            name={FormFieldName.Price}
                            type='number'
                            divClassNamePostfix='with-text-right'
                            label='Стоимость тренировки'
                            spanText='₽'
                          />
                          <CustomSelect
                            name={FormFieldName.Level}
                            caption='Выберите уровень тренировки'
                            options={TRAINING_LEVELS}
                            extraClassName={mainClassNamePrefix}
                            readOnly={isDisabled}
                          />
                          <div className="create-training__radio-wrapper">
                            <span className="create-training__label">Кому подойдет тренировка</span>
                            <br />
                            <CustomToggleRadio
                              divExtraClassName={mainClassNamePrefix}
                              name={FormFieldName.TrainingGender}
                              value={DEFAULT_GENDER}
                              options={TRAINING_GENDERS}
                              readOnly={isDisabled}
                              isSmall
                            />
                          </div>
                        </div>
                      </Block>
                      <Block legend='Описание тренировки' className={mainClassNamePrefix} isHeaderLegend>
                        <div className="custom-textarea create-training__textarea">
                          <label>
                            <textarea name="description" placeholder=" "></textarea>
                          </label>
                        </div>
                      </Block>
                      <Block legend='Загрузите видео-тренировку' className={mainClassNamePrefix} isHeaderLegend>
                        <div className="drag-and-drop create-training__drag-and-drop">
                          <label>
                            <span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата MOV, AVI или MP4
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlinkHref="#icon-import-video"></use>
                              </svg>
                            </span>
                            <input type="file" name="import" tabIndex={-1} accept=".mov, .avi, .mp4" />
                          </label>
                        </div>
                      </Block>
                    </div>
                    <button className="btn create-training__button" type="submit">Опубликовать</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main >
    </Fragment >
  );
}

export default CreateTraining;
