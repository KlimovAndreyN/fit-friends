import { FormEvent, useState } from 'react';
import classNames from 'classnames';

import PopupForm from '../../components/popup-form/popup-form';
import AvatarUpload from '../../components/avatar-upload/avatar-upload';
import CustomSelect from '../../components/custom-select/custom-select';
import CustomInput from '../../components/custom-input/custom-input';
import SignUpUserGengers from '../../components/sign-up-user-gengers/sign-up-user-gengers';
import SignUpUserRoles from '../../components/sign-up-user-roles/sign-up-user-roles';

import { ICreateUserWithAvatarFileDto, MetroStationName, UserGender, UserRole } from '@backend/shared';

import { getRandomItem } from '../../utils/random';
import { LOCATIONS, PageTitle, USER_BACKGROUND_PATHS } from '../../const';

function SignUp(): JSX.Element {
  const avatarUploadName = 'user-photo-1';
  const locationName = 'location';
  const backgroundPath = 'background';
  const [checkedUserAgreementInput, setCheckedUserAgreementInput] = useState(false);

  //const dispatch = useAppDispatch();

  const handleUserAgreementInputChange = () => {
    setCheckedUserAgreementInput(!checkedUserAgreementInput);
  };

  const handlePopupFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);

    const dto: ICreateUserWithAvatarFileDto =
    {
      email: 'email',
      name: 'name',
      password: 'password',
      backgroundPath: 'backgroundPath',
      gender: UserGender.Female,
      role: UserRole.Sportsman,
      metroStationName: MetroStationName.Petrogradskaya,
      avatarFile: undefined,
      birthday: 'birthday'
    };

    // eslint-disable-next-line no-console
    console.log(dto);

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
    title: PageTitle.SignUp,
    caption: 'Регистрация',
    extraClass: 'popup-form--sign-up',
    onSubmit: handlePopupFormSubmit
  };

  const submitClassName = classNames('btn sign-up__button', { 'is-disabled': !checkedUserAgreementInput });

  return (
    <PopupForm {...popupFormProps} >
      <div className="sign-up">
        <div className="sign-up__load-photo">
          <AvatarUpload name={avatarUploadName} />
          <div className="sign-up__description">
            <h2 className="sign-up__legend">Загрузите фото профиля</h2>
            <span className="sign-up__text">JPG, PNG, оптимальный размер 100×100&nbsp;px</span>
          </div>
        </div>
        <div className="sign-up__data">
          <CustomInput name='name' type='text' label='Имя' required />
          <CustomInput name='email' type='email' label='E-mail' required />
          <CustomInput name='birthday' type='date' label='Дата рождения' max='2099-12-31' />
          <CustomSelect
            name={locationName}
            caption='Ваша локация'
            options={LOCATIONS}
          />
          <CustomInput name='password' type='password' label='Пароль' required autoComplete='off' />
          <SignUpUserGengers name='sex' />
        </div>
        <SignUpUserRoles name='role' />
        {/*//! добавил в разметку фоновую картинку */}
        <div className="sign-up__data">
          <CustomSelect
            name={backgroundPath}
            currentOption={getRandomItem(USER_BACKGROUND_PATHS)}
            caption='Фоновая картика'
            options={USER_BACKGROUND_PATHS}
          />
        </div>
        <div className="sign-up__checkbox">
          <label>
            <input type="checkbox" value="user-agreement" name="user-agreement" checked={checkedUserAgreementInput} onChange={handleUserAgreementInputChange} />
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
