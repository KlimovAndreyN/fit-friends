import { FormEvent } from 'react';

import PopupForm from '../../components/popup-form/popup-form';
import AvatarUpload from '../../components/avatar-upload/avatar-upload';
import CustomSelect, { Option } from '../../components/custom-select/custom-select';

import { PageTitle } from '../../const';

function SignUp(): JSX.Element {
  const avatarUploadName = 'user-photo-1';

  //const dispatch = useAppDispatch();

  const handlePopupFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);

    // eslint-disable-next-line
    formData.entries().forEach(([name, value]) => console.log(name, value));

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
          <div className="custom-input">
            <label>
              <span className="custom-input__label">Имя</span>
              <span className="custom-input__wrapper">
                <input type="text" name="name" required />
              </span>
            </label>
          </div>
          <div className="custom-input">
            <label>
              <span className="custom-input__label">E-mail</span>
              <span className="custom-input__wrapper">
                <input type="email" name="email" required />
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
          <CustomSelect
            caption='Ваша локация'
            options={[{ label: 'l1', value: 'v1' }, { label: 'l2', value: 'v2' }]}
            placeholder='l1'
            onChange={(selected: Option | null) => {
              // eslint-disable-next-line
              console.log('sign-up-selected', selected);
            }}
          />
          <div className="custom-input">
            <label>
              <span className="custom-input__label">Пароль</span>
              <span className="custom-input__wrapper">
                <input type="password" name="password" autoComplete="off" required />
              </span>
            </label>
          </div>
          <div className="sign-up__radio">
            <span className="sign-up__label">Пол</span>
            <div className="custom-toggle-radio custom-toggle-radio--big">
              <div className="custom-toggle-radio__block">
                <label>
                  <input type="radio" name="sex" value="male" />
                  <span className="custom-toggle-radio__icon" />
                  <span className="custom-toggle-radio__label">Мужской</span>
                </label>
              </div>
              <div className="custom-toggle-radio__block">
                <label>
                  <input type="radio" name="sex" value="female" defaultChecked />
                  <span className="custom-toggle-radio__icon" />
                  <span className="custom-toggle-radio__label">Женский</span>
                </label>
              </div>
              <div className="custom-toggle-radio__block">
                <label>
                  <input type="radio" name="sex" value="not-matter" />
                  <span className="custom-toggle-radio__icon" />
                  <span className="custom-toggle-radio__label">Неважно</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        {/*//! visually-hidden - спратал выбор роли, по умолчанию был coach */}
        <div className="sign-up__role visually-hidden">
          <h2 className="sign-up__legend">Выберите роль</h2>
          <div className="role-selector sign-up__role-selector">
            <div className="role-btn">
              <label>
                <input className="visually-hidden" type="radio" name="role" value="coach" />
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
                <input className="visually-hidden" type="radio" name="role" value="sportsman" defaultChecked />
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
            <input type="checkbox" value="user-agreement" name="user-agreement" />
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
    </PopupForm>
  );
}

export default SignUp;
