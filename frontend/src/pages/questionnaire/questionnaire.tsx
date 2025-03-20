import { FormEvent } from 'react';

import PopupForm from '../../components/popup-form/popup-form';
import QuestionnaireSpecializations from '../../components/questionnaire-specializations/questionnaire-specializations';

import { useAppSelector } from '../../hooks';
import { getUserRole } from '../../store/user-process/selectors';
import { PageTitle, UserRoleOption } from '../../const';

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
          <QuestionnaireSpecializations name='specialisation' caption={'Ваша специализация (тип) тренировок'} divExtraClassName={endingClassName} />
          <div className="questionnaire-user__block">
            <span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
            <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
              <div className="custom-toggle-radio__block">
                <label>
                  <input type="radio" name="time" />
                  <span className="custom-toggle-radio__icon"></span>
                  <span className="custom-toggle-radio__label">10-30 мин</span>
                </label>
              </div>
              <div className="custom-toggle-radio__block">
                <label>
                  <input type="radio" name="time" defaultChecked />
                  <span className="custom-toggle-radio__icon"></span>
                  <span className="custom-toggle-radio__label">30-50 мин</span>
                </label>
              </div>
              <div className="custom-toggle-radio__block">
                <label>
                  <input type="radio" name="time" />
                  <span className="custom-toggle-radio__icon"></span>
                  <span className="custom-toggle-radio__label">50-80 мин</span>
                </label>
              </div>
              <div className="custom-toggle-radio__block">
                <label>
                  <input type="radio" name="time" />
                  <span className="custom-toggle-radio__icon"></span>
                  <span className="custom-toggle-radio__label">80-100 мин</span>
                </label>
              </div>
            </div>
          </div>
          <div className="questionnaire-user__block">
            <span className="questionnaire-user__legend">Ваш уровень</span>
            <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
              <div className="custom-toggle-radio__block">
                <label>
                  <input type="radio" name="level" />
                  <span className="custom-toggle-radio__icon"></span>
                  <span className="custom-toggle-radio__label">Новичок</span>
                </label>
              </div>
              <div className="custom-toggle-radio__block">
                <label>
                  <input type="radio" name="level" defaultChecked />
                  <span className="custom-toggle-radio__icon"></span>
                  <span className="custom-toggle-radio__label">Любитель</span>
                </label>
              </div>
              <div className="custom-toggle-radio__block">
                <label>
                  <input type="radio" name="level" />
                  <span className="custom-toggle-radio__icon"></span>
                  <span className="custom-toggle-radio__label">Профессионал</span>
                </label>
              </div>
            </div>
          </div>
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
