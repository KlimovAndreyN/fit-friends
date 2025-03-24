import { FormEvent, Fragment } from 'react';
import classNames from 'classnames';

import PopupForm from '../../components/popup-form/popup-form';
import QuestionnairebBlock from '../../components/questionnaire-block/questionnaire-block';
import SpecializationsCheckbox from '../../components/specializations-checkbox/specializations-checkbox';
import CustomToggleRadio from '../../components/custom-toggle-radio/custom-toggle-radio';
import CalorieInput from '../../components/calorie-input/calorie-input';

import { Duration, ICreateQuestionnaireDto, Specialization, UserLevel } from '@backend/shared';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsCreateQuestionnaireExecuting, getUserRole } from '../../store/user-process/selectors';
import { createQuestionnaire } from '../../store/user-action';
import { DefaultUser, PageTitle, TIMES, USER_LEVELS, UserRoleOption } from '../../const';

enum FormFieldName {
  Spec = 'specialization',
  Time = 'time',
  Level = 'level',
  CaloriesLose = 'calories-lose',
  CaloriesWaste = 'calories-waste'
}

function Questionnaire(): JSX.Element {
  const isCreateExistQuestionnaireExecuting = useAppSelector(getIsCreateQuestionnaireExecuting);
  const userRole = useAppSelector(getUserRole);
  const dispatch = useAppDispatch();

  const endingClassName = (userRole) ? UserRoleOption[userRole].endingClassName : '';
  const divClassName = `questionnaire-${endingClassName}`;
  const submitClassName = classNames(`btn questionnaire-${endingClassName}__button`, { 'is-disabled': isCreateExistQuestionnaireExecuting });

  const handlePopupFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);

    const level = (formData.get(FormFieldName.Level)?.toString() || '') as UserLevel;
    const specializations = formData.getAll(FormFieldName.Spec).map((specialization) => (specialization as Specialization));
    const time = (formData.get(FormFieldName.Time)?.toString() || '') as Duration;
    const caloriesLose = parseInt(formData.get(FormFieldName.CaloriesLose)?.toString() || '', 10);
    const caloriesWaste = parseInt(formData.get(FormFieldName.CaloriesWaste)?.toString() || '', 10);
    const dto: ICreateQuestionnaireDto = {
      userRole,
      level,
      specializations,
      time,
      caloriesLose,
      caloriesWaste
    };

    dispatch(createQuestionnaire(dto));
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
          <QuestionnairebBlock caption='Ваша специализация (тип) тренировок' divExtraClassName={endingClassName} >
            <SpecializationsCheckbox name={FormFieldName.Spec} values={[...DefaultUser.SPECIALISATIONS]} divExtraClassName={`questionnaire-${endingClassName}__specializations`} />
          </QuestionnairebBlock>
          <QuestionnairebBlock caption='Сколько времени вы готовы уделять на тренировку в день' divExtraClassName={endingClassName} >
            <CustomToggleRadio name={FormFieldName.Time} divExtraClassName={`questionnaire-${endingClassName}__radio`} options={TIMES} startOptionValue={DefaultUser.TIME} />
          </QuestionnairebBlock>
          <QuestionnairebBlock caption='Ваш уровень' divExtraClassName={endingClassName} >
            <CustomToggleRadio name={FormFieldName.Level} divExtraClassName={`questionnaire-${endingClassName}__radio`} options={USER_LEVELS} startOptionValue={DefaultUser.LEVEL} />
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
