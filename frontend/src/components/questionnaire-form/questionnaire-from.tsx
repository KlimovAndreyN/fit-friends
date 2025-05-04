import { FormEvent, Fragment, useRef, useState } from 'react';
import classNames from 'classnames';

import PopupForm from '../popup-form/popup-form';
import Block from '../block/block';
import SpecializationsCheckbox from '../specializations-checkbox/specializations-checkbox';
import CustomToggleRadio from '../custom-toggle-radio/custom-toggle-radio';
import QuestionnaireUserCalorie from '../questionnaire-user-calorie/questionnaire-user-calorie';
import CustomInput from '../custom-input/custom-input';
import CustomCheckbox from '../custom-checkbox/custom-checkbox';
import QuestionnaireFormFiles from '../questionnaire-form-files/questionnaire-from-files';

import {
  Duration, isSportsmanRole, Role, Specialization, TrainingLevel,
  ICreateQuestionnaireCoachDto, ICreateQuestionnaireSportsmanDto
} from '@backend/shared/core';
import { convertEnumToArray } from '@backend/shared/helpers';

import { CreateQuestionnaireDto, Option } from '../../types/types';
import { DefaultUser, PageTitle, TRAINING_LEVELS } from '../../const';

const DEFAULT_INDIVIDUAL_TRAINING = true;

const UserDurationTitle: { [key in Duration]: string } = {
  [Duration.Minutes_10_30]: '10-30',
  [Duration.Minutes_30_50]: '30-50',
  [Duration.Minutes_50_80]: '50-80',
  [Duration.Minutes_80_100]: '80-100'
} as const;

const USER_DURATIONS: Option[] = convertEnumToArray(Duration).map(
  (duration) => ({ value: duration, title: `${UserDurationTitle[duration]} мин` })
);

enum FormFieldName {
  Spec = 'specialization',
  Time = 'time',
  UserTrainingLevel = 'level',
  CaloriesLose = 'calories-lose',
  CaloriesWaste = 'calories-waste',
  Files = 'import',
  Description = 'description',
  IndividualTraining = 'individual-training'
}

type QuestionnaireFormProps = {
  userRole: Role;
  onSubmit: (dto: CreateQuestionnaireDto) => void;
  isDisabled: boolean;
}

function QuestionnaireForm({ userRole, onSubmit, isDisabled }: QuestionnaireFormProps): JSX.Element | null {
  //! может еще можно разбить файл...

  const filesInputRef = useRef<HTMLInputElement | null>(null);
  const [currentSpecializations, setCurrentSpecializations] = useState([...DefaultUser.SPECIALISATIONS]);
  const isSportsman = isSportsmanRole(userRole);

  const handlePopupFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const trainingLevel = (formData.get(FormFieldName.UserTrainingLevel)?.toString() || '') as TrainingLevel; //! одинаковый код - в хелпер
    const specializations = formData.getAll(FormFieldName.Spec).map((specialization) => (specialization as Specialization)); //! одинаковый код - в хелпер
    setCurrentSpecializations(specializations);
    const duration = (formData.get(FormFieldName.Time)?.toString() || '') as Duration; //! одинаковый код - в хелпер
    const caloriesLose = parseInt(formData.get(FormFieldName.CaloriesLose)?.toString() || '', 10);
    const caloriesWaste = parseInt(formData.get(FormFieldName.CaloriesWaste)?.toString() || '', 10);
    const description = formData.get(FormFieldName.Description)?.toString() || '';
    const individualTraining = formData.get(FormFieldName.IndividualTraining)?.toString() === 'on';
    const fileList = filesInputRef.current?.files;
    const files = (fileList) ? Array.from(fileList) : undefined;

    if (isSportsman) {
      const dto: ICreateQuestionnaireSportsmanDto = {
        trainingLevel,
        specializations,
        duration,
        caloriesLose,
        caloriesWaste
      };

      onSubmit(dto);
    } else {
      const dto: ICreateQuestionnaireCoachDto = {
        trainingLevel,
        specializations,
        files,
        description,
        individualTraining
      };

      onSubmit(dto);
    }
  };

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
              values={currentSpecializations}
              divExtraClassName={divClassName}
              readOnly={isDisabled}
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
              <QuestionnaireFormFiles name={FormFieldName.Files} inputRef={filesInputRef} />
            </Block>
          }
          {
            !isSportsman &&
            <Block legend='Расскажите о своём опыте, который мы сможем проверить' className={divClassName} >
              <Fragment>
                <CustomInput name={FormFieldName.Description} type='textarea' divExtraClassName={divClassName} />
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
