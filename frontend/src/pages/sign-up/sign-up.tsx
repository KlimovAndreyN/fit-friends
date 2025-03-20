import { FormEvent, useState } from 'react';
import classNames from 'classnames';

import PopupForm from '../../components/popup-form/popup-form';
import AvatarUpload from '../../components/avatar-upload/avatar-upload';
import CustomSelect from '../../components/custom-select/custom-select';
import CustomInput from '../../components/custom-input/custom-input';
import SignUpUserGengers from '../../components/sign-up-user-gengers/sign-up-user-gengers';
import SignUpUserRoles from '../../components/sign-up-user-roles/sign-up-user-roles';

import { ICreateUserDto, MetroStationName, UserGender, UserRole } from '@backend/shared';

import { getRandomItem } from '../../utils/random';
import { registerUser } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsSingUpExecuting } from '../../store/user-process/selectors';
import { LOCATIONS, PageTitle, USER_BACKGROUND_PATHS } from '../../const';

enum FormFieldName {
  avatar = 'user-photo-1',
  name = 'name',
  email = 'email',
  password = 'password',
  birthday = 'birthday',
  location = 'location',
  sex = 'sex',
  role = 'role',
  background = 'background',
  userAgreement = 'user-agreement'
}

function SignUp(): JSX.Element {
  const dispatch = useAppDispatch();
  const [checkedUserAgreementInput, setCheckedUserAgreementInput] = useState(false);
  const isSingUpExecuting = useAppSelector(getIsSingUpExecuting);

  const handleUserAgreementInputChange = () => {
    setCheckedUserAgreementInput(!checkedUserAgreementInput);
  };

  const handlePopupFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get(FormFieldName.name)?.toString() || '';
    const email = formData.get(FormFieldName.email)?.toString() || '';
    const password = formData.get(FormFieldName.password)?.toString() || '';
    const birthday = formData.get(FormFieldName.birthday)?.toString() || undefined;
    const backgroundPath = formData.get(FormFieldName.background)?.toString() || '';
    const gender = (formData.get(FormFieldName.sex)?.toString() || '') as UserGender;
    const role = (formData.get(FormFieldName.role)?.toString() || '') as UserRole;
    const metroStationName = (formData.get(FormFieldName.location)?.toString() || '') as MetroStationName;
    const avatarFile = formData.get(FormFieldName.avatar) as File;

    const dto: ICreateUserDto =
    {
      name,
      email,
      password,
      birthday,
      backgroundPath,
      gender,
      role,
      metroStationName,
      avatarFile
    };

    dispatch(registerUser(dto));
  };

  const popupFormProps = {
    title: PageTitle.SignUp,
    caption: 'Регистрация',
    extraClass: 'popup-form--sign-up',
    onSubmit: handlePopupFormSubmit
  };

  const submitClassName = classNames('btn sign-up__button', { 'is-disabled': !checkedUserAgreementInput || isSingUpExecuting });

  return (
    <PopupForm {...popupFormProps} >
      <div className="sign-up">
        <div className="sign-up__load-photo">
          <AvatarUpload name={FormFieldName.avatar} />
          <div className="sign-up__description">
            <h2 className="sign-up__legend">Загрузите фото профиля</h2>
            <span className="sign-up__text">JPG, PNG, оптимальный размер 100×100&nbsp;px</span>
          </div>
        </div>
        <div className="sign-up__data">
          <CustomInput name={FormFieldName.name} type='text' label='Имя' required />
          <CustomInput name={FormFieldName.email} type='email' label='E-mail' required />
          <CustomInput name={FormFieldName.birthday} type='date' label='Дата рождения' max='2099-12-31' />
          <CustomSelect
            name={FormFieldName.location}
            caption='Ваша локация'
            options={LOCATIONS}
          />
          <CustomInput name={FormFieldName.password} type='password' label='Пароль' required autoComplete='off' />
          <SignUpUserGengers name={FormFieldName.sex} />
        </div>
        <SignUpUserRoles name={FormFieldName.role} />
        {/*//! добавил в разметку фоновую картинку */}
        <div className="sign-up__data">
          <CustomSelect
            name={FormFieldName.background}
            currentOption={getRandomItem(USER_BACKGROUND_PATHS)}
            caption='Фоновая картика'
            options={USER_BACKGROUND_PATHS}
          />
        </div>
        <div className="sign-up__checkbox">
          <label>
            <input type="checkbox" value="user-agreement" name={FormFieldName.userAgreement} checked={checkedUserAgreementInput} onChange={handleUserAgreementInputChange} />
            <span className="sign-up__checkbox-icon">
              <svg width="9" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-check" />
              </svg>
            </span>
            <span className="sign-up__checkbox-label">Я соглашаюсь с <span>политикой конфиденциальности</span> компании</span>
          </label>
        </div>
        <button className={submitClassName} type="submit">Продолжить</button>
      </div>
    </PopupForm>
  );
}

export default SignUp;
