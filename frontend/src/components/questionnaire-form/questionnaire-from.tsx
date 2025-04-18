import { FormEvent, Fragment } from 'react';
import classNames from 'classnames';

import PopupForm from '../popup-form/popup-form';
import Block from '../block/block';
import SpecializationsCheckbox from '../specializations-checkbox/specializations-checkbox';
import CustomToggleRadio from '../custom-toggle-radio/custom-toggle-radio';
import QuestionnaireUserCalorie from '../questionnaire-user-calorie/questionnaire-user-calorie';
import CustomInput from '../custom-input/custom-input';
import CustomCheckbox from '../custom-checkbox/custom-checkbox';

import { Duration, ICreateQuestionnaireSportsmanDto, isSportsmanRole, Role, Specialization, TrainingLevel } from '@backend/shared/core';
import { enumToArray } from '@backend/shared/helpers';

import { Option } from '../../types/types';
import { DefaultUser, PageTitle, TRAINING_LEVELS } from '../../const';

const DEFAULT_INDIVIDUAL_TRAINING = true;

const UserDurationTitle: { [key in Duration]: string } = {
  [Duration.Minutes_10_30]: '10-30',
  [Duration.Minutes_30_50]: '30-50',
  [Duration.Minutes_50_80]: '50-80',
  [Duration.Minutes_80_100]: '80-100'
} as const;

const USER_DURATIONS: Option[] = enumToArray(Duration).map(
  (duration) => ({ value: duration, title: `${UserDurationTitle[duration]} мин` })
);

enum FormFieldName {
  Spec = 'specialization',
  Time = 'time',
  UserTrainingLevel = 'level',
  CaloriesLose = 'calories-lose',
  CaloriesWaste = 'calories-waste',
  Files = 'import',
  IndividualTraining = 'individual-training'
}

type QuestionnaireFormProps = {
  userRole: Role;
  onSubmit: (dto: ICreateQuestionnaireSportsmanDto) => void;
  isDisabled: boolean;
}

function QuestionnaireForm({ userRole, onSubmit, isDisabled }: QuestionnaireFormProps): JSX.Element | null {
  //! сделать файлы-сертификаты для тренера
  //! может еще можно разбить файл...

  const handlePopupFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //! проверить! опять не было...

    const form = event.currentTarget;
    const formData = new FormData(form);

    const trainingLevel = (formData.get(FormFieldName.UserTrainingLevel)?.toString() || '') as TrainingLevel; //! одинаковый код - в хелпер
    const specializations = formData.getAll(FormFieldName.Spec).map((specialization) => (specialization as Specialization)); //! одинаковый код - в хелпер
    const duration = (formData.get(FormFieldName.Time)?.toString() || '') as Duration; //! одинаковый код - в хелпер
    const caloriesLose = parseInt(formData.get(FormFieldName.CaloriesLose)?.toString() || '', 10);
    const caloriesWaste = parseInt(formData.get(FormFieldName.CaloriesWaste)?.toString() || '', 10);
    const dto: ICreateQuestionnaireSportsmanDto = {
      trainingLevel,
      specializations,
      duration,
      caloriesLose,
      caloriesWaste
    };

    //! вызвать OnSubmit для нужно ролей, а может единый...
    onSubmit(dto);
  };

  const isSportsman = isSportsmanRole(userRole);
  const divClassName = `questionnaire-${isSportsman ? 'user' : 'coach'}`;
  const submitClassName = classNames(`btn ${divClassName}__button`, { 'is-disabled': isDisabled });
  const popupFormProps = {
    title: PageTitle.Questionnaire,
    extraClass: `popup-form--${divClassName}`,
    onSubmit: handlePopupFormSubmit
  };

  return (
    <PopupForm {...popupFormProps} >
      <div className={divClassName}>
        <h1 className="visually-hidden">Опросник</h1>
        <div className={`${divClassName}__wrapper`}>
          <Block legend='Ваша специализация (тип) тренировок' className={divClassName} >
            <SpecializationsCheckbox
              name={FormFieldName.Spec}
              values={[...DefaultUser.SPECIALISATIONS]}
              divExtraClassName={divClassName}
            />
          </Block>
          {
            isSportsman &&
            <Block legend='Сколько времени вы готовы уделять на тренировку в день' className={divClassName} >
              <CustomToggleRadio
                name={FormFieldName.Time}
                divExtraClassName={divClassName}
                options={USER_DURATIONS}
                value={DefaultUser.DURATION}
              />
            </Block>
          }
          <Block legend='Ваш уровень' className={divClassName} >
            <CustomToggleRadio
              name={FormFieldName.UserTrainingLevel}
              divExtraClassName={divClassName}
              options={TRAINING_LEVELS}
              value={DefaultUser.TRAINING_LEVEL}
            />
          </Block>
          {
            isSportsman &&
            <Block className={divClassName} >
              <Fragment>
                <QuestionnaireUserCalorie name={FormFieldName.CaloriesLose} caption='Сколько калорий хотите сбросить' />
                <QuestionnaireUserCalorie name={FormFieldName.CaloriesWaste} caption='Сколько калорий тратить в день' />
              </Fragment>
            </Block>
          }
          {
            !isSportsman &&
            <Block legend='Ваши дипломы и сертификаты' className={divClassName} >
              <div className="drag-and-drop questionnaire-coach__drag-and-drop">
                <label>
                  <span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата PDF, JPG или PNG
                    <svg width="20" height="20" aria-hidden="true">
                      <use xlinkHref="#icon-import" />
                    </svg>
                  </span>
                  <input type="file" name={FormFieldName.Files} tabIndex={-1} accept=".pdf, .jpg, .png" />
                </label>
              </div>
            </Block>
          }
          {
            !isSportsman &&
            <Block legend='Расскажите о своём опыте, который мы сможем проверить' className={divClassName} >
              <Fragment>
                <CustomInput name='description' type='textarea' divExtraClassName={divClassName} />
                <CustomCheckbox
                  name={FormFieldName.IndividualTraining}
                  spanText='Хочу дополнительно индивидуально тренировать'
                  value={DEFAULT_INDIVIDUAL_TRAINING}
                  divClassName={divClassName}
                />
              </Fragment>
            </Block>
          }
        </div>
        <button className={submitClassName} type="submit">Продолжить</button>
      </div>
    </PopupForm>
  );
}

export default QuestionnaireForm;
