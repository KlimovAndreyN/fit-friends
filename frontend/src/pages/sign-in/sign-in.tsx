import { FormEvent } from 'react';
import classNames from 'classnames';

import PopupForm from '../../components/popup-form/popup-form';

import { ILoginUserDto } from '@backend/shared';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsSingInExecuting } from '../../store/user-process/selectors';
import { loginUser } from '../../store/user-action';
import { PageTitle } from '../../const';
import CustomInput from '../../components/custom-input/custom-input';

enum FormFieldName {
  Email = 'email',
  Password = 'password'
}

function SignIn(): JSX.Element {
  const dispatch = useAppDispatch();
  const isSingInExecuting = useAppSelector(getIsSingInExecuting);
  const submitClassName = classNames('btn sign-in__button', { 'is-disabled': isSingInExecuting });
  const divExtraClassName = 'sign-in__input';

  const handlePopupFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get(FormFieldName.Email)?.toString() || '';
    const password = formData.get(FormFieldName.Password)?.toString() || '';
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
        <CustomInput
          divExtraClassName={divExtraClassName}
          name={FormFieldName.Email}
          type='email'
          label='E-mail'
          required
        />
        <CustomInput
          divExtraClassName={divExtraClassName}
          name={FormFieldName.Password}
          type='password'
          label='Пароль'
          required
          autoComplete='off'
        />
        <button className={submitClassName} type="submit">Продолжить</button>
      </div>
    </PopupForm>
  );
}

export default SignIn;
