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
import { registerUser } from '../../store/user-action';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsSingUpExecuting } from '../../store/user-process/selectors';
import { LOCATIONS, PageTitle, USER_BACKGROUND_PATHS } from '../../const';

enum FormFieldName {
  Avatar = 'user-photo-1',
  Name = 'name',
  Email = 'email',
  Password = 'password',
  Birthday = 'birthday',
  Location = 'location',
  Sex = 'sex',
  Role = 'role',
  Background = 'background',
  UserAgreement = 'user-agreement'
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

    const name = formData.get(FormFieldName.Name)?.toString() || '';
    const email = formData.get(FormFieldName.Email)?.toString() || '';
    const password = formData.get(FormFieldName.Password)?.toString() || '';
    const birthday = formData.get(FormFieldName.Birthday)?.toString() || undefined;
    const backgroundPath = formData.get(FormFieldName.Background)?.toString() || '';
    const gender = (formData.get(FormFieldName.Sex)?.toString() || '') as UserGender;
    const role = (formData.get(FormFieldName.Role)?.toString() || '') as UserRole;
    const metroStationName = (formData.get(FormFieldName.Location)?.toString() || '') as MetroStationName;
    const avatarFile = (formData.get(FormFieldName.Avatar) as File) || undefined;

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
  const backgroundPath = getRandomItem(USER_BACKGROUND_PATHS).value;

  return (
    <PopupForm {...popupFormProps} >
      <div className="sign-up">
        <div className="sign-up__load-photo">
          <AvatarUpload name={FormFieldName.Avatar} />
          <div className="sign-up__description">
            <h2 className="sign-up__legend">Загрузите фото профиля</h2>
            <span className="sign-up__text">JPG, PNG, оптимальный размер 100×100&nbsp;px</span>
          </div>
        </div>
        <div className="sign-up__data">
          <CustomInput name={FormFieldName.Name} type='text' label='Имя' required />
          <CustomInput name={FormFieldName.Email} type='email' label='E-mail' required />
          <CustomInput name={FormFieldName.Birthday} type='date' label='Дата рождения' max='2099-12-31' />
          <CustomSelect
            name={FormFieldName.Location}
            caption='Ваша локация'
            options={LOCATIONS}
          />
          <CustomInput name={FormFieldName.Password} type='password' label='Пароль' required autoComplete='off' />
          <SignUpUserGengers name={FormFieldName.Sex} />
        </div>
        <SignUpUserRoles name={FormFieldName.Role} />
        {/*//! добавил в разметку фоновую картинку */}
        <div className="sign-up__data">
          <CustomSelect
            name={FormFieldName.Background}
            value={backgroundPath}
            caption='Фоновая картика'
            options={USER_BACKGROUND_PATHS}
          />
        </div>
        <div className="sign-up__checkbox">
          <label>
            <input type="checkbox" value="user-agreement" name={FormFieldName.UserAgreement} checked={checkedUserAgreementInput} onChange={handleUserAgreementInputChange} />
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
