import { JSX, FormEvent } from 'react';
import classNames from 'classnames';

import { ILoginUserDto } from '@backend/shared/core';

import PopupForm from '../../components/popup-form/popup-form';
import CustomInput from '../../components/custom-input/custom-input';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsSingInExecuting } from '../../store/user-process/selectors';
import { setPrevLocation } from '../../store/user-process';
import { loginUser } from '../../store/actions/user-action';
import { AppRoute, PageTitle } from '../../const';

enum FormFieldName {
  Email = 'email',
  Password = 'password'
}

function SignIn(): JSX.Element {
  const dispatch = useAppDispatch();
  const isSingInExecuting = useAppSelector(getIsSingInExecuting);

  const submitClassName = classNames('btn sign-in__button', { 'is-disabled': isSingInExecuting });
  const divExtraClassName = 'sign-in';

  const handlePopupFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get(FormFieldName.Email)?.toString() || '';
    const password = formData.get(FormFieldName.Password)?.toString() || '';
    const dto: ILoginUserDto = { email, password };

    dispatch(loginUser(dto));
    dispatch(setPrevLocation(AppRoute.SignIn));
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
        <CustomInput
          name={FormFieldName.Email}
          type='email'
          label='E-mail'
          divExtraClassName={divExtraClassName}
          required
        />
        <CustomInput
          name={FormFieldName.Password}
          type='password'
          label='Пароль'
          divExtraClassName={divExtraClassName}
          required
          autoComplete='off'
        />
        <button className={submitClassName} type="submit">Продолжить</button>
      </div>
    </PopupForm>
  );
}

export default SignIn;
