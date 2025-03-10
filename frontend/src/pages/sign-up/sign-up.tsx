import { Helmet } from 'react-helmet-async';

import { PageTitle } from '../../const';

function Register(): JSX.Element {
  return (
    <main>
      <Helmet>
        <title>{PageTitle.Registration}</title>
      </Helmet>
      <div className="background-logo">
        <svg className="background-logo__logo" width="750" height="284" aria-hidden="true">
          <use xlinkHref="#logo-big" />
        </svg>
        <svg className="background-logo__icon" width="343" height="343" aria-hidden="true">
          <use xlinkHref="#icon-logotype" />
        </svg>
      </div>
      <div className="popup-form popup-form--sign-up">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Регистрация</h1>
            </div>
            <div className="popup-form__form">
              <form method="get">
                <div className="sign-up">
                  <div className="sign-up__load-photo">
                    <div className="input-load-avatar">
                      <label>
                        <input className="visually-hidden" type="file" accept="image/png, image/jpeg" />
                        <span className="input-load-avatar__btn" >
                          <svg width="20" height="20" aria-hidden="true">
                            <use xlinkHref="#icon-import" />
                          </svg>
                        </span>
                      </label>
                    </div>
                    <div className="sign-up__description">
                      <h2 className="sign-up__legend">Загрузите фото профиля</h2>
                      <span className="sign-up__text">JPG, PNG, оптимальный размер 100×100&nbsp;px</span>
                    </div>
                  </div>
                  <div className="sign-up__data">
                    <div className="custom-input">
                      <label>
                        <span className="custom-input__label">Имя</span>
                        <span className="custom-input__wrapper">
                          <input type="text" name="name" />
                        </span>
                      </label>
                    </div>
                    <div className="custom-input">
                      <label>
                        <span className="custom-input__label">E-mail</span>
                        <span className="custom-input__wrapper">
                          <input type="email" name="email" />
                        </span>
                      </label>
                    </div>
                    <div className="custom-input">
                      <label>
                        <span className="custom-input__label">Дата рождения</span>
                        <span className="custom-input__wrapper">
                          <input type="date" name="birthday" max="2099-12-31" />
                        </span>
                      </label>
                    </div>
                    <div className="custom-select custom-select--not-selected">
                      <span className="custom-select__label">Ваша локация</span>
                      <button className="custom-select__button" type="button" aria-label="Выберите одну из опций">
                        <span className="custom-select__text" />
                        <span className="custom-select__icon">
                          <svg width="15" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-down" />
                          </svg>
                        </span>
                      </button>
                      <ul className="custom-select__list" role="listbox">
                      </ul>
                    </div>
                    <div className="custom-input">
                      <label>
                        <span className="custom-input__label">Пароль</span>
                        <span className="custom-input__wrapper">
                          <input type="password" name="password" autoComplete="off" />
                        </span>
                      </label>
                    </div>
                    <div className="sign-up__radio">
                      <span className="sign-up__label">Пол</span>
                      <div className="custom-toggle-radio custom-toggle-radio--big">
                        <div className="custom-toggle-radio__block">
                          <label>
                            <input type="radio" name="sex" />
                            <span className="custom-toggle-radio__icon" />
                            <span className="custom-toggle-radio__label">Мужской</span>
                          </label>
                        </div>
                        <div className="custom-toggle-radio__block">
                          <label>
                            <input type="radio" name="sex" defaultChecked />
                            <span className="custom-toggle-radio__icon" />
                            <span className="custom-toggle-radio__label">Женский</span>
                          </label>
                        </div>
                        <div className="custom-toggle-radio__block">
                          <label>
                            <input type="radio" name="sex" />
                            <span className="custom-toggle-radio__icon" />
                            <span className="custom-toggle-radio__label">Неважно</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sign-up__role">
                    <h2 className="sign-up__legend">Выберите роль</h2>
                    <div className="role-selector sign-up__role-selector">
                      <div className="role-btn">
                        <label>
                          <input className="visually-hidden" type="radio" name="role" value="coach" defaultChecked />
                          <span className="role-btn__icon">
                            <svg width="12" height="13" aria-hidden="true">
                              <use xlinkHref="#icon-cup" />
                            </svg>
                          </span>
                          <span className="role-btn__btn">Я хочу тренировать</span>
                        </label>
                      </div>
                      <div className="role-btn">
                        <label>
                          <input className="visually-hidden" type="radio" name="role" value="sportsman" />
                          <span className="role-btn__icon">
                            <svg width="12" height="13" aria-hidden="true">
                              <use xlinkHref="#icon-weight" />
                            </svg>
                          </span>
                          <span className="role-btn__btn">Я хочу тренироваться</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="sign-up__checkbox">
                    <label>
                      <input type="checkbox" value="user-agreement" name="user-agreement" defaultChecked />
                      <span className="sign-up__checkbox-icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check" />
                        </svg>
                      </span>
                      <span className="sign-up__checkbox-label">Я соглашаюсь с <span>политикой конфиденциальности</span> компании</span>
                    </label>
                  </div>
                  <button className="btn sign-up__button" type="submit">Продолжить</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main >
  );
}

export default Register;
