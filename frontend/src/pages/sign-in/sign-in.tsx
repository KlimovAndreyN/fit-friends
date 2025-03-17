import { FormEvent } from 'react';

import PopupForm from '../../components/popup-form/popup-form';

import { ILoginUserDto } from '@backend/shared';

import { useAppDispatch } from '../../hooks';
import { loginUser } from '../../store/action';
import { PageTitle } from '../../const';

enum FormFieldName {
  email = 'email',
  password = 'password'
}

function SignIn(): JSX.Element {
  const dispatch = useAppDispatch();

  const handlePopupFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get(FormFieldName.email)?.toString() || '';
    const password = formData.get(FormFieldName.password)?.toString() || '';
    const dto: ILoginUserDto = { email, password };

    dispatch(loginUser(dto));
  };

  const popupFormProps = {
    title: PageTitle.SignIn,
    caption: 'Вход',
    extraClass: 'popup-form--sign-in',
    onSubmit: handlePopupFormSubmit
  };

  return (
    <PopupForm {...popupFormProps} >
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
              <input type="password" name="password" autoComplete="off" required />
            </span>
          </label>
        </div>
        <button className="btn sign-in__button" type="submit">Продолжить</button>
      </div>
    </PopupForm>
  );
}

export default SignIn;
