import { FormEvent, Fragment } from 'react';
import classNames from 'classnames';

import PopupForm from '../../components/popup-form/popup-form';
import QuestionnairebBlock from '../../components/questionnaire-block/questionnaire-block';
import SpecializationsCheckbox from '../../components/specializations-checkbox/specializations-checkbox';
import CustomToggleRadio from '../../components/custom-toggle-radio/custom-toggle-radio';
import CalorieInput from '../../components/calorie-input/calorie-input';
import CustomInput from '../../components/custom-input/custom-input';

import { Duration, ICreateQuestionnaireSportsmanDto, isSportsmanRole, Specialization, TrainingLevel } from '@backend/shared/core';
import { enumToArray } from '@backend/shared/helpers';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserRole } from '../../store/user-process/selectors';
import { getIsCreateQuestionnaireExecuting } from '../../store/user-profile-process/selectors';
import { createQuestionnaire } from '../../store/actions/user-profile-action';
import { Option } from '../../types/types';
import { DefaultUser, PageTitle, TRAINING_LEVELS } from '../../const';

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
  CaloriesWaste = 'calories-waste'
}

function Questionnaire(): JSX.Element | null {
  //! сделать блоки для тренера
  //! много кода! поделить как нибуть!

  const isCreateExistQuestionnaireExecuting = useAppSelector(getIsCreateQuestionnaireExecuting);
  const userRole = useAppSelector(getUserRole);
  const dispatch = useAppDispatch();

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

    dispatch(createQuestionnaire({ dto, userRole }));
  };

  const isSportsman = isSportsmanRole(userRole);
  const divClassName = `questionnaire-${isSportsman ? 'user' : 'coach'}`;
  const submitClassName = classNames(`btn ${divClassName}__button`, { 'is-disabled': isCreateExistQuestionnaireExecuting });
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
          <QuestionnairebBlock legend='Ваша специализация (тип) тренировок' divExtraClassName={divClassName} >
            <SpecializationsCheckbox
              name={FormFieldName.Spec}
              values={[...DefaultUser.SPECIALISATIONS]}
              divExtraClassName={divClassName}
            />
          </QuestionnairebBlock>
          {
            isSportsman &&
            <QuestionnairebBlock legend='Сколько времени вы готовы уделять на тренировку в день' divExtraClassName={divClassName} >
              <CustomToggleRadio
                name={FormFieldName.Time}
                divExtraClassName={divClassName}
                options={USER_DURATIONS}
                value={DefaultUser.DURATION}
              />
            </QuestionnairebBlock>
          }
          <QuestionnairebBlock legend='Ваш уровень' divExtraClassName={divClassName} >
            <CustomToggleRadio
              name={FormFieldName.UserTrainingLevel}
              divExtraClassName={divClassName}
              options={TRAINING_LEVELS}
              value={DefaultUser.TRAINING_LEVEL}
            />
          </QuestionnairebBlock>
          {
            isSportsman &&
            <QuestionnairebBlock divExtraClassName={divClassName} >
              <Fragment>
                <CalorieInput name={FormFieldName.CaloriesLose} caption='Сколько калорий хотите сбросить' />
                <CalorieInput name={FormFieldName.CaloriesWaste} caption='Сколько калорий тратить в день' />
              </Fragment>
            </QuestionnairebBlock>
          }
          {
            !isSportsman &&
            <QuestionnairebBlock legend='Ваши дипломы и сертификаты' divExtraClassName={divClassName} >
              <div className="drag-and-drop questionnaire-coach__drag-and-drop">
                <label>
                  <span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата PDF, JPG или PNG
                    <svg width="20" height="20" aria-hidden="true">
                      <use xlinkHref="#icon-import"></use>
                    </svg>
                  </span>
                  <input type="file" name="import" tabIndex={-1} accept=".pdf, .jpg, .png" />
                </label>
              </div>
            </QuestionnairebBlock>
          }
          {
            !isSportsman &&
            <QuestionnairebBlock legend='Расскажите о своём опыте, который мы сможем проверить' divExtraClassName={divClassName} >
              <Fragment>
                <CustomInput name='description' type='textarea' divExtraClassName={divClassName} />
                <div className="questionnaire-coach__checkbox">
                  <label>
                    <input type="checkbox" value="individual-training" name="individual-training" checked />
                    <span className="questionnaire-coach__checkbox-icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg>
                    </span>
                    <span className="questionnaire-coach__checkbox-label">Хочу дополнительно индивидуально тренировать</span>
                  </label>
                </div>
              </Fragment>
            </QuestionnairebBlock>
          }
        </div>
        <button className={submitClassName} type="submit">Продолжить</button>
      </div>
    </PopupForm>
  );
}

export default Questionnaire;
