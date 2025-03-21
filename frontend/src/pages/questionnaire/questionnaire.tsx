import { FormEvent } from 'react';

import PopupForm from '../../components/popup-form/popup-form';
import QuestionnairebBlock from '../../components/questionnaire-block/questionnaire-block';
import SpecializationsCheckbox from '../../components/specializations-checkbox/specializations-checkbox';
import CustomToggleRadio from '../../components/custom-toggle-radio/custom-toggle-radio';

import { useAppSelector } from '../../hooks';
import { getUserRole } from '../../store/user-process/selectors';
import { DefaultUser, PageTitle, TIMES, USER_LEVELS, UserRoleOption } from '../../const';

function Questionnaire(): JSX.Element {
  const userRole = useAppSelector(getUserRole);
  const endingClassName = (userRole) ? UserRoleOption[userRole].endingClassName : '';
  const divClassName = `questionnaire-${endingClassName}`;

  //const dispatch = useAppDispatch();

  const handlePopupFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);

    //! отладка
    const entries = formData.entries();
    for (const entry of entries) {
      const [key, value] = entry;
      // eslint-disable-next-line
      console.log(key, value);
    }
    //

    //const email = formData.get(FormFieldName.email)?.toString() || '';
    //const password = formData.get(FormFieldName.password)?.toString() || '';
    //const dto: ILoginUserDto = { email, password };

    //dispatch(loginUser(dto));
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
        <div className="questionnaire-user__wrapper">
          <QuestionnairebBlock caption='Ваша специализация (тип) тренировок' divExtraClassName={endingClassName} >
            <SpecializationsCheckbox name='specialisation' divExtraClassName={`questionnaire-${endingClassName}__specializations`} />
          </QuestionnairebBlock>
          <QuestionnairebBlock caption='Сколько времени вы готовы уделять на тренировку в день' divExtraClassName={endingClassName} >
            <CustomToggleRadio name='time' divExtraClassName={`questionnaire-${endingClassName}__radio`} options={TIMES} startOptionValue={DefaultUser.TIME} />
          </QuestionnairebBlock>
          <QuestionnairebBlock caption='Ваш уровень' divExtraClassName={endingClassName} >
            <CustomToggleRadio name='level' divExtraClassName={`questionnaire-${endingClassName}__radio`} options={USER_LEVELS} startOptionValue={DefaultUser.LEVEL} />
          </QuestionnairebBlock>
          <div className="questionnaire-user__block">
            <div className="questionnaire-user__calories-lose">
              <span className="questionnaire-user__legend">Сколько калорий хотите сбросить</span>
              <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                <label>
                  <span className="custom-input__wrapper">
                    <input type="number" name="calories-lose" />
                    <span className="custom-input__text">ккал</span>
                  </span>
                </label>
              </div>
            </div>
            <div className="questionnaire-user__calories-waste">
              <span className="questionnaire-user__legend">Сколько калорий тратить в день</span>
              <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                <label>
                  <span className="custom-input__wrapper">
                    <input type="number" name="calories-waste" />
                    <span className="custom-input__text">ккал</span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <button className="btn questionnaire-user__button" type="submit">Продолжить</button>
      </div>
    </PopupForm>
  );
}

export default Questionnaire;
