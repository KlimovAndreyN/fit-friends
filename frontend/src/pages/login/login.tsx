import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { LoginUserDto } from '../../types/backend';
import { AppRoute, AuthorizationStatus, mockData, PageTitle } from '../../const';

enum FormFieldName {
  login = 'email',
  password = 'password'
}

function Login(): JSX.Element {
  //! временно
  const navigate = useNavigate();

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const login = formData.get(FormFieldName.login)?.toString() || '';
    const password = formData.get(FormFieldName.password)?.toString() || '';
    const data: LoginUserDto = { login, password };

    //! временно
    // eslint-disable-next-line no-console
    console.log('LoginUserDto', data);
    mockData.authorizationStatus = AuthorizationStatus.Auth;
    navigate(AppRoute.Root);
    //!
  };

  return (
    <main>
      <Helmet>
        <title>{PageTitle.Login}</title>
      </Helmet>
      <div className="background-logo">
        <svg className="background-logo__logo" width="750" height="284" aria-hidden="true">
          <use xlinkHref="#logo-big"></use>
        </svg>
        <svg className="background-logo__icon" width="343" height="343" aria-hidden="true">
          <use xlinkHref="#icon-logotype"></use>
        </svg>
      </div>
      <div className="popup-form popup-form--sign-in">
        <div className="popup-form__wrapper">
          <div className="popup-form__content">
            <div className="popup-form__title-wrapper">
              <h1 className="popup-form__title">Вход</h1>
            </div>
            <div className="popup-form__form">
              <form method="post" onSubmit={handleFormSubmit}>
                <div className="sign-in">
                  <div className="custom-input sign-in__input">
                    <label>
                      <span className="custom-input__label">E-mail</span>
                      <span className="custom-input__wrapper">
                        <input type="email" name="email" required />
                      </span>
                    </label>
                  </div>
                  <div className="custom-input sign-in__input">
                    <label>
                      <span className="custom-input__label">Пароль</span>
                      <span className="custom-input__wrapper">
                        <input type="password" name="password" required />
                      </span>
                    </label>
                  </div>
                  <button className="btn sign-in__button" type="submit">Продолжить</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
