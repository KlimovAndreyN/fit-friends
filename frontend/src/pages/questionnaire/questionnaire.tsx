import { FormEvent, Fragment } from 'react';
import classNames from 'classnames';

import PopupForm from '../../components/popup-form/popup-form';
import QuestionnairebBlock from '../../components/questionnaire-block/questionnaire-block';
import SpecializationsCheckbox from '../../components/specializations-checkbox/specializations-checkbox';
import CustomToggleRadio from '../../components/custom-toggle-radio/custom-toggle-radio';
import CalorieInput from '../../components/calorie-input/calorie-input';

import { Duration, ICreateQuestionnaireSportsmanDto, Role, Specialization, TrainingLevel } from '@backend/shared/core';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserRole } from '../../store/user-process/selectors';
import { getIsCreateQuestionnaireExecuting } from '../../store/user-profile-process/selectors';
import { createQuestionnaire } from '../../store/user-profile-action';
import { DefaultUser, PageTitle, TRAINING_LEVELS, USER_DURATIONS } from '../../const';

enum FormFieldName {
  Spec = 'specialization',
  Time = 'time',
  UserTrainingLevel = 'level',
  CaloriesLose = 'calories-lose',
  CaloriesWaste = 'calories-waste'
}

function Questionnaire(): JSX.Element | null {
  const isCreateExistQuestionnaireExecuting = useAppSelector(getIsCreateQuestionnaireExecuting);
  const userRole = useAppSelector(getUserRole);
  const dispatch = useAppDispatch();

  if (!userRole) {
    //! сделать компонет с ошибкой и вывести ошибку или 404 с текстом
    return null;
  }

  const endingClassName = (userRole === Role.Sportsman) ? 'user' : 'coath';
  const divClassName = `questionnaire-${endingClassName}`;
  const submitClassName = classNames(`btn questionnaire-${endingClassName}__button`, { 'is-disabled': isCreateExistQuestionnaireExecuting });

  const handlePopupFormSubmit = (event: FormEvent<HTMLFormElement>) => {

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

    dispatch(createQuestionnaire({ dto, userRole }));
  };

  const popupFormProps = {
    title: PageTitle.Questionnaire,
    extraClass: `popup-form--questionnaire-${endingClassName}`,
    onSubmit: handlePopupFormSubmit
  };

  return (
    <PopupForm {...popupFormProps} >
      <div className={divClassName}>
        <h1 className="visually-hidden">Опросник</h1>
        <div className={`questionnaire-${endingClassName}__wrapper`}>
          <QuestionnairebBlock legend='Ваша специализация (тип) тренировок' divExtraClassName={endingClassName} >
            <SpecializationsCheckbox
              name={FormFieldName.Spec}
              values={[...DefaultUser.SPECIALISATIONS]}
              divExtraClassName={`questionnaire-${endingClassName}__specializations`}
            />
          </QuestionnairebBlock>
          <QuestionnairebBlock legend='Сколько времени вы готовы уделять на тренировку в день' divExtraClassName={endingClassName} >
            <CustomToggleRadio
              name={FormFieldName.Time}
              divExtraClassName={`questionnaire-${endingClassName}__radio`}
              options={USER_DURATIONS}
              value={DefaultUser.DURATION}
            />
          </QuestionnairebBlock>
          <QuestionnairebBlock legend='Ваш уровень' divExtraClassName={endingClassName} >
            <CustomToggleRadio
              name={FormFieldName.UserTrainingLevel}
              divExtraClassName={`questionnaire-${endingClassName}__radio`}
              options={TRAINING_LEVELS}
              value={DefaultUser.TRAINING_LEVEL}
            />
          </QuestionnairebBlock>
          <QuestionnairebBlock divExtraClassName={endingClassName} >
            <Fragment>
              <CalorieInput name={FormFieldName.CaloriesLose} caption='Сколько калорий хотите сбросить' />
              <CalorieInput name={FormFieldName.CaloriesWaste} caption='Сколько калорий тратить в день' />
            </Fragment>
          </QuestionnairebBlock>
        </div>
        <button className={submitClassName} type="submit">Продолжить</button>
      </div>
    </PopupForm>
  );
}

export default Questionnaire;
