import { FormEvent } from 'react';

import PopupForm from '../../components/popup-form/popup-form';

import { PageTitle } from '../../const';

function Questionnaire(): JSX.Element {
  //const dispatch = useAppDispatch();

  const handlePopupFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);

    // eslint-disable-next-line
    formData.entries().forEach(([name, value]) => console.log(name, value));

    //const email = formData.get(FormFieldName.email)?.toString() || '';
    //const password = formData.get(FormFieldName.password)?.toString() || '';
    //const dto: ILoginUserDto = { email, password };

    //dispatch(loginUser(dto));
  };

  const popupFormProps = {
    title: PageTitle.Questionnaire,
    extraClass: 'popup-form--sign-up',
    onSubmit: handlePopupFormSubmit
  };

  return (
    <PopupForm {...popupFormProps} >
      <div className="questionnaire-user">
        <h1 className="visually-hidden">Опросник</h1>
        <div className="questionnaire-user__wrapper">
          <div className="questionnaire-user__block">
            <span className="questionnaire-user__legend">Ваша специализация (тип) тренировок</span>
            <div className="specialization-checkbox questionnaire-user__specializations">
              <div className="btn-checkbox">
                <label>
                  <input className="visually-hidden" type="checkbox" name="specialisation" value="yoga" />
                  <span className="btn-checkbox__btn">Йога</span>
                </label>
              </div>
              <div className="btn-checkbox">
                <label>
                  <input className="visually-hidden" type="checkbox" name="specialisation" value="running" />
                  <span className="btn-checkbox__btn">Бег</span>
                </label>
              </div>
              <div className="btn-checkbox">
                <label>
                  <input className="visually-hidden" type="checkbox" name="specialisation" value="power" checked />
                  <span className="btn-checkbox__btn">Силовые</span>
                </label>
              </div>
              <div className="btn-checkbox">
                <label>
                  <input className="visually-hidden" type="checkbox" name="specialisation" value="aerobics" />
                  <span className="btn-checkbox__btn">Аэробика</span>
                </label>
              </div>
              <div className="btn-checkbox">
                <label>
                  <input className="visually-hidden" type="checkbox" name="specialisation" value="crossfit" checked />
                  <span className="btn-checkbox__btn">Кроссфит</span>
                </label>
              </div>
              <div className="btn-checkbox">
                <label>
                  <input className="visually-hidden" type="checkbox" name="specialisation" value="boxing" checked />
                  <span className="btn-checkbox__btn">Бокс</span>
                </label>
              </div>
              <div className="btn-checkbox">
                <label>
                  <input className="visually-hidden" type="checkbox" name="specialisation" value="pilates" />
                  <span className="btn-checkbox__btn">Пилатес</span>
                </label>
              </div>
              <div className="btn-checkbox">
                <label>
                  <input className="visually-hidden" type="checkbox" name="specialisation" value="stretching" />
                  <span className="btn-checkbox__btn">Стрейчинг</span>
                </label>
              </div>
            </div>
          </div>
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
                  <input type="radio" name="time" checked />
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
                  <input type="radio" name="level" checked />
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
