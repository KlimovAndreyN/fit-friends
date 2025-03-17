import { FormEvent, useState } from 'react';
import classNames from 'classnames';

import PopupForm from '../../components/popup-form/popup-form';
import AvatarUpload from '../../components/avatar-upload/avatar-upload';
import CustomSelect from '../../components/custom-select/custom-select';
import CustomInput from '../../components/custom-input/custom-input';

import { DefaultUser, PageTitle, SORTED_USER_GENDERS, SORTED_USER_ROLES, UserGenderOption, UserRoleOption } from '../../const';

function SignUp(): JSX.Element {
  const avatarUploadName = 'user-photo-1';
  const locationName = 'location';
  const [checkedUserAgreementInput, setCheckedUserAgreementInput] = useState(false);

  //const dispatch = useAppDispatch();

  const handleUserAgreementInputChange = () => {
    setCheckedUserAgreementInput(!checkedUserAgreementInput);
  };

  const handlePopupFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);

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
        <AvatarUpload name={avatarUploadName} />
        <div className="sign-up__data">
          <CustomInput name='name' type='text' label='Имя' required />
          <CustomInput name='email' type='email' label='E-mail' required />
          <CustomInput name='birthday' type='date' label='Дата рождения' max='2099-12-31' />
          <CustomSelect
            name={locationName}
            caption='Ваша локация'
            options={[{ label: 'l1', value: 'v1' }, { label: 'l2', value: 'v2' }]}
          />
          <CustomInput name='password' type='password' label='Пароль' required autoComplete='off' />
          <div className="sign-up__radio">
            <span className="sign-up__label">Пол</span>
            <div className="custom-toggle-radio custom-toggle-radio--big">
              {
                SORTED_USER_GENDERS.map(
                  (userGender) => {
                    const { title } = UserGenderOption[userGender];
                    const checked = userGender === DefaultUser.GENDER;

                    return (
                      <div className="custom-toggle-radio__block" key={userGender}>
                        <label>
                          <input type="radio" name="sex" value={userGender} defaultChecked={checked} />
                          <span className="custom-toggle-radio__icon" />
                          <span className="custom-toggle-radio__label">{title}</span>
                        </label>
                      </div>
                    );
                  }
                )
              }
            </div>
          </div>
        </div>
        {/*
        //! visually-hidden - спратал выбор роли, по умолчанию был coach
        <div className="sign-up__role">
        <div className="sign-up__role visually-hidden">
        */}
        <div className="sign-up__role visually-hidden">
          <h2 className="sign-up__legend">Выберите роль</h2>
          <div className="role-selector sign-up__role-selector">
            {
              SORTED_USER_ROLES.map(
                (userRole) => {
                  const { value, title, svgIcon } = UserRoleOption[userRole];
                  const checked = userRole === DefaultUser.ROLE;

                  return (
                    <div className="role-btn" key={value}>
                      <label>
                        <input className="visually-hidden" type="radio" name="role" value={value} defaultChecked={checked} />
                        <span className="role-btn__icon">
                          <svg width="12" height="13" aria-hidden="true">
                            <use xlinkHref={svgIcon} />
                          </svg>
                        </span>
                        <span className="role-btn__btn">{title}</span>
                      </label>
                    </div>
                  );
                }
              )
            }
          </div>
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
