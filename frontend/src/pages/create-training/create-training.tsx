import { FormEvent, Fragment, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BackgroundPaths, Duration, Gender, ICreateTrainingDto, Specialization, TrainingLevel } from '@backend/shared/core';
import { getRandomItem } from '@backend/shared/helpers';

import Header from '../../components/header/header';
import Block from '../../components/block/block';
import CustomInput from '../../components/custom-input/custom-input';
import CustomSelect from '../../components/custom-select/custom-select';
import CustomToggleRadio from '../../components/custom-toggle-radio/custom-toggle-radio';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { setPrevLocation } from '../../store/user-process';
import { getIsCreatedTraining, getIsCreateTrainingExecuting } from '../../store/training-process/selectors';
import { createTraining } from '../../store/actions/training-action';
import { Option } from '../../types/types';
import { AppRoute, DURATIONS, PageTitle, SPECIALISATIONS, TRAINING_GENDERS, TRAINING_LEVELS } from '../../const';

const DEFAULT_GENDER = Gender.Female;

enum FormFieldName {
  Title = 'training-name',
  Spec = 'specialization',
  CaloriesWaste = 'calories',
  Time = 'time',
  Price = 'price',
  Level = 'level',
  TrainingGender = 'gender',
  Background = 'background',
  Description = 'description',
  File = 'import'
}

function CreateTraining(): JSX.Element {
  //! файл с тренирорвкой вынести отдельно, попробовать объеденить с QuestionnaireFormFiles
  //! форма похожа на PopupForm, только с верхним меню, выделить все отдельно, если еще будет использоватся в похожем виде
  //    или когда переделаю PopupForm на форму и страницу
  // специализации все оставил, можно сделать только те что есть в опроснике у тренера
  //   если из личного кабинета, то он есть, а если по ссылке сразу на добавление, то нужно получить опросник и для личного кабинета тоже бы обновить

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreateTrainingExecuting = useAppSelector(getIsCreateTrainingExecuting);
  const isCreatedTraining = useAppSelector(getIsCreatedTraining);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileCaption, setFileCaption] = useState<string>('Загрузите сюда файлы формата MOV, AVI или MP4');
  const [isSelectedFile, setIsSelectedFile] = useState(false);

  useEffect(() => {
    if (isCreatedTraining) {
      navigate(AppRoute.MyTrainings);
    }
  }, [navigate, isCreatedTraining]);

  const handleFileInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;

    if (files && files.length) {
      setFileCaption(files[0].name);
      setIsSelectedFile(true);
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const files = fileInputRef.current?.files;
    const videoFile = (files?.length) ? files[0] : null;

    if (!videoFile) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const title = formData.get(FormFieldName.Title)?.toString() || '';
    const specialization = (formData.get(FormFieldName.Spec)?.toString() || '') as Specialization;
    const caloriesWaste = parseInt(formData.get(FormFieldName.CaloriesWaste)?.toString() || '', 10);
    const duration = (formData.get(FormFieldName.Time)?.toString() || '') as Duration;
    const price = parseInt(formData.get(FormFieldName.Price)?.toString() || '', 10);
    const trainingLevel = (formData.get(FormFieldName.Level)?.toString() || '') as TrainingLevel;
    const gender = (formData.get(FormFieldName.TrainingGender)?.toString() || '') as Gender;
    const backgroundPath = formData.get(FormFieldName.Background)?.toString() || '';
    const description = formData.get(FormFieldName.Description)?.toString() || '';

    const dto: ICreateTrainingDto = {
      title,
      specialization,
      caloriesWaste,
      duration,
      price,
      trainingLevel,
      gender,
      backgroundPath,
      description,
      videoFile
    };

    //! попробовать добавить в начало новую тренировку, но фильтры могут быть не те, проще заново обновить список тренирорвок и фильтры скинуть
    //! должен быть в начале, т.к. начальная сортировка по дате
    dispatch(setPrevLocation(AppRoute.CreateTraining));

    dispatch(createTraining(dto));
  };

  const optionBackgroundPaths: Option[] = BackgroundPaths.TRAININGS.map((item) => ({ value: item, title: item }));
  const backgroundPath = getRandomItem(optionBackgroundPaths).value;
  const mainClassNamePrefix = 'create-training';

  return (
    <Fragment>
      <Header title={PageTitle.CreateTraining} />
      <main>
        <div className={`popup-form popup-form--${mainClassNamePrefix}`}>
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
                          name={FormFieldName.Title}
                          type='text'
                          divExtraClassName={mainClassNamePrefix}
                        />
                      </Block>
                      <Block legend='Характеристики тренировки' className={mainClassNamePrefix} isHeaderLegend>
                        <div className={`${mainClassNamePrefix}__info`}>
                          <CustomSelect
                            name={FormFieldName.Spec}
                            caption='Выберите тип тренировки'
                            options={SPECIALISATIONS}
                            extraClassName={mainClassNamePrefix}
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
                          />
                          <div className={`${mainClassNamePrefix}__radio-wrapper`}>
                            <span className={`${mainClassNamePrefix}__label`}>Кому подойдет тренировка</span>
                            <br />
                            <CustomToggleRadio //! добавить во внутрь заголовок-div и текст-span и br
                              divExtraClassName={mainClassNamePrefix}
                              name={FormFieldName.TrainingGender}
                              value={DEFAULT_GENDER}
                              options={TRAINING_GENDERS}
                              isSmall
                            />
                          </div>
                        </div>
                      </Block>
                      <Block legend='Описание тренировки' className={mainClassNamePrefix} isHeaderLegend>
                        <div className={`custom-textarea ${mainClassNamePrefix}__textarea`} /* //! можно использовать CustomInput но там нужно убрать span */>
                          <label>
                            <textarea name={FormFieldName.Description} placeholder=" "></textarea>
                          </label>
                        </div>
                      </Block>
                      <Block legend='Загрузите видео-тренировку' className={mainClassNamePrefix} isHeaderLegend>
                        <div className={`drag-and-drop ${mainClassNamePrefix}__drag-and-drop`}>
                          <label>
                            <span className="drag-and-drop__label" tabIndex={0}>
                              {fileCaption}
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlinkHref="#icon-import-video"></use>
                              </svg>
                            </span>
                            <input
                              type="file"
                              name={FormFieldName.File}
                              tabIndex={-1}
                              accept=".mov, .avi, .mp4"
                              ref={fileInputRef}
                              onChange={handleFileInputChange}
                            />
                          </label>
                        </div>
                      </Block>
                      {/*//! добавил в разметку фоновую картинку */}
                      <Block legend='Фоновая картика' className={mainClassNamePrefix} isHeaderLegend>
                        <div className={`custom-textarea ${mainClassNamePrefix}__textarea`}>
                          <CustomSelect
                            name={FormFieldName.Background}
                            value={backgroundPath}
                            caption=' '
                            options={optionBackgroundPaths}
                          />
                        </div>
                      </Block>
                    </div>
                    <button className={`btn ${mainClassNamePrefix}__button`} type="submit" disabled={!isSelectedFile || isCreateTrainingExecuting}>Опубликовать</button>
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
