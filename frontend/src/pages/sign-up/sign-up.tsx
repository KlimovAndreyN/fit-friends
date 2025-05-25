import { JSX, FormEvent, Fragment, useState } from 'react';
import classNames from 'classnames';

import PopupForm from '../../components/popup-form/popup-form';
import AvatarUpload from '../../components/avatar-upload/avatar-upload';
import CustomSelect from '../../components/custom-select/custom-select';
import CustomInput from '../../components/custom-input/custom-input';
import SignUpUserGengers from '../../components/sign-up-user-gengers/sign-up-user-gengers';
import SignUpUserRoles from '../../components/sign-up-user-roles/sign-up-user-roles';
import CustomCheckbox from '../../components/custom-checkbox/custom-checkbox';

import { ICreateUserDto, Location, Gender, Role, BackgroundPaths, isSportsmanRole } from '@backend/shared/core';
import { getRandomItem } from '@backend/shared/helpers';

import { registerUser } from '../../store/actions/user-action';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setPrevLocation } from '../../store/user-process';
import { getIsSingUpExecuting } from '../../store/user-process/selectors';
import { Option } from '../../types/types';
import { AppRoute, DefaultUser, LOCATIONS, PageTitle } from '../../const';

enum FormFieldName {
  Avatar = 'user-photo-1',
  Name = 'name',
  Email = 'email',
  Password = 'password',
  Birthday = 'birthday',
  UserLocation = 'location',
  Sex = 'sex',
  UserRole = 'role',
  Background = 'background',
  UserAgreement = 'user-agreement'
}

function SignUp(): JSX.Element {
  //! сделать страницу и ссылку на политику компании для sign-up__checkbox-label

  const dispatch = useAppDispatch();
  const [checkedUserAgreementInput, setCheckedUserAgreementInput] = useState(false);
  const [userRole, setUserRole] = useState<Role>(DefaultUser.ROLE);
  const isSingUpExecuting = useAppSelector(getIsSingUpExecuting);

  const handleUserAgreementCheckboxChange = () => {
    setCheckedUserAgreementInput(!checkedUserAgreementInput);
  };

  const handleSignUpUserRolesChange = (newValue: Role) => {
    setUserRole(newValue);
  };

  const handlePopupFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get(FormFieldName.Name)?.toString() || '';
    const email = formData.get(FormFieldName.Email)?.toString() || '';
    const password = formData.get(FormFieldName.Password)?.toString() || '';
    const birthday = formData.get(FormFieldName.Birthday)?.toString() || undefined;
    const backgroundPath = formData.get(FormFieldName.Background)?.toString() || '';
    const gender = (formData.get(FormFieldName.Sex)?.toString() || '') as Gender;
    const location = (formData.get(FormFieldName.UserLocation)?.toString() || '') as Location;
    const avatarFile = (formData.get(FormFieldName.Avatar) as File) || undefined;

    const dto: ICreateUserDto =
    {
      name,
      email,
      password,
      birthday,
      backgroundPath,
      gender,
      role: userRole,
      location,
      avatarFile
    };

    dispatch(registerUser(dto));
    dispatch(setPrevLocation(AppRoute.SignUp));
  };

  const popupFormProps = {
    title: PageTitle.SignUp,
    caption: 'Регистрация',
    extraClass: 'popup-form--sign-up',
    onSubmit: handlePopupFormSubmit
  };

  const submitClassName = classNames('btn sign-up__button', { 'is-disabled': !checkedUserAgreementInput || isSingUpExecuting });
  const backgroundPaths = isSportsmanRole(userRole) ? BackgroundPaths.SPORTSMANS : BackgroundPaths.COACHS;
  const optionBackgroundPaths: Option[] = backgroundPaths.map((item) => ({ value: item, title: item }));
  const backgroundPath = getRandomItem(optionBackgroundPaths).value;

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
          <CustomInput
            name={FormFieldName.Name}
            type='text'
            label='Имя'
            required
          />
          <CustomInput
            name={FormFieldName.Email}
            type='email'
            label='E-mail'
            required
          />
          <CustomInput
            name={FormFieldName.Birthday}
            type='date'
            label='Дата рождения'
            max='2099-12-31'
          />
          <CustomSelect
            name={FormFieldName.UserLocation}
            caption='Ваша локация'
            options={LOCATIONS}
          />
          <CustomInput
            name={FormFieldName.Password}
            type='password'
            label='Пароль'
            required
            autoComplete='off'
          />
          <SignUpUserGengers name={FormFieldName.Sex} />
        </div>
        <SignUpUserRoles
          name={FormFieldName.UserRole}
          value={userRole}
          onChange={handleSignUpUserRolesChange}
        />
        {/*//! добавил в разметку фоновую картинку */}
        <div className="sign-up__data">
          <CustomSelect
            name={FormFieldName.Background}
            value={backgroundPath}
            caption='Фоновая картика'
            options={optionBackgroundPaths}
          />
        </div>
        <CustomCheckbox
          name={FormFieldName.UserAgreement}
          value={checkedUserAgreementInput}
          valueText='user-agreement'
          spanText={<Fragment>Я соглашаюсь с <span>политикой конфиденциальности</span> компании</Fragment>}
          onChange={handleUserAgreementCheckboxChange}
          divClassName='sign-up'
        />
        <button className={submitClassName} type="submit">Продолжить</button>
      </div>
    </PopupForm>
  );
}

export default SignUp;
