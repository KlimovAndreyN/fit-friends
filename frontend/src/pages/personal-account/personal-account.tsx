import { Fragment, useEffect, useState } from 'react';

import MainSpinner from '../../components/main-spinner/main-spinner';
import Header from '../../components/header/header';
import AvatarUpload from '../../components/avatar-upload/avatar-upload';
import CustomInput from '../../components/custom-input/custom-input';
import SpecializationsCheckbox from '../../components/specializations-checkbox/specializations-checkbox';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsFetchUserInfoExecuting, getUserInfo } from '../../store/user-process/selectors';
import { fetchUserInfo } from '../../store/user-action';
import { PageTitle } from '../../const';

function PersonalAccount(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isEditing/*, setIsEditing*/] = useState(false);
  const isFetchUserInfoExecuting = useAppSelector(getIsFetchUserInfoExecuting);
  const userInfo = useAppSelector(getUserInfo);
  const { name, avatarPath, about, specializations } = userInfo;

  useEffect(
    () => {
      //! временно, потом const [searchParams, setSearchParams] = useSearchParams();
      dispatch(fetchUserInfo());
    },
    [dispatch]
  );

  if (isFetchUserInfoExecuting) {
    //! нужен свой спиннер
    return <MainSpinner />;
  }

  //! отладка
  // eslint-disable-next-line no-console
  console.log(userInfo);

  const mainClassName = `user-info${(isEditing) ? '-edit' : ''}`;
  const buttonCaption = (isEditing) ? 'Сохранить' : 'Редактировать';

  return (
    <Fragment>
      <Header title={PageTitle.PersonalAccount} />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <section className={mainClassName}>
                <div className={`${mainClassName}__header`}>
                  {/* //! нужен будет обработчик при изменнии файла в режиме редактирования */}
                  <AvatarUpload name='user-photo-1' path={avatarPath} forPersonalAccount isShowButtons={isEditing} readonly={!isEditing} />
                </div>
                {/* //! нужен будет обработчик при сохранении формы, если редактирование */}
                <form className={`${mainClassName}__form`} action="#" method="post">
                  {/* //! нужен будет обработчик при нажатии на кнопку, если просмотр */}
                  <button
                    className={`btn-flat btn-flat--underlined ${mainClassName}__${(isEditing) ? 'save' : 'edit'}-button`}
                    type={(isEditing) ? 'submit' : 'button'}
                    aria-label={buttonCaption}
                  >
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-edit"></use>
                    </svg>
                    <span>{buttonCaption}</span>
                  </button>
                  <div className={`${mainClassName}__section`}>
                    <h2 className={`${mainClassName}__title`}>Обо мне</h2>
                    <CustomInput type='text' name='name' label='Имя' value={name} divExtraClassName={`${mainClassName}__input`} readonly={!isEditing} />
                    <CustomInput type='textarea' name='description' label='Описание' value={about} divExtraClassName={`${mainClassName}__textarea`} readonly={!isEditing} />
                  </div>
                  <div className={`${mainClassName}__section ${mainClassName}__section--status`}>
                    <h2 className={`${mainClassName}__title ${mainClassName}__title--status`}>Статус</h2>
                    <div className={`custom-toggle custom-toggle--switch ${mainClassName}__toggle`}>
                      <label>
                        <input type="checkbox" name="ready-for-training" defaultChecked />
                        <span className="custom-toggle__icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                        </span>
                        <span className="custom-toggle__label">Готов тренировать</span>
                      </label>
                    </div>
                  </div>
                  <div className={`${mainClassName}__section`}>
                    <h2 className={`${mainClassName}__title ${mainClassName}__title--specialization`}>Специализация</h2>
                    <SpecializationsCheckbox name='specialization' values={specializations} divExtraClassName={`${mainClassName}__specialization`} readonly={!isEditing} />
                  </div>
                  <div className={`custom-select--readonly custom-select ${mainClassName}__select`}>
                    <span className="custom-select__label">Локация</span>
                    <div className="custom-select__placeholder">ст. м. Адмиралтейская</div>
                    <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" disabled>
                      <span className="custom-select__text"></span>
                      <span className="custom-select__icon">
                        <svg width="15" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-down"></use>
                        </svg>
                      </span>
                    </button>
                    <ul className="custom-select__list" role="listbox">
                    </ul>
                  </div>
                  <div className={`custom-select--readonly custom-select ${mainClassName}__select`} >
                    <span className="custom-select__label">Пол</span>
                    <div className="custom-select__placeholder">Женский</div>
                    <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" disabled>
                      <span className="custom-select__text"></span>
                      <span className="custom-select__icon">
                        <svg width="15" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-down"></use>
                        </svg>
                      </span>
                    </button>
                    <ul className="custom-select__list" role="listbox">
                    </ul>
                  </div>
                  <div className={`custom-select--readonly custom-select ${mainClassName}__select`} >
                    <span className="custom-select__label">Уровень</span>
                    <div className="custom-select__placeholder">Профессионал</div>
                    <button className="custom-select__button" type="button" aria-label="Выберите одну из опций" disabled>
                      <span className="custom-select__text"></span>
                      <span className="custom-select__icon">
                        <svg width="15" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-down"></use>
                        </svg>
                      </span>
                    </button>
                    <ul className="custom-select__list" role="listbox">
                    </ul>
                  </div>
                </form>
              </section>
              <div className="inner-page__content">
                <div className="personal-account-user">
                  <div className="personal-account-user__schedule">
                    <form action="#" method="get">
                      <div className="personal-account-user__form">
                        <div className="personal-account-user__input">
                          <label>
                            <span className="personal-account-user__label">План на день, ккал</span>
                            <input type="text" name="schedule-for-the-day" defaultValue="3 300" />
                          </label>
                        </div>
                        <div className="personal-account-user__input">
                          <label>
                            <span className="personal-account-user__label">План на неделю, ккал</span>
                            <input type="text" name="schedule-for-the-week" defaultValue="23 100" />
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="personal-account-user__additional-info">
                    <a className="thumbnail-link thumbnail-link--theme-light" href="#">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-friends"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои друзья</span>
                    </a>
                    <a className="thumbnail-link thumbnail-link--theme-light" href="#">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-shopping-cart"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои покупки</span>
                    </a>
                    <div className="thumbnail-spec-gym">
                      <div className="thumbnail-spec-gym__image">
                        <picture>
                          <source type="image/webp" srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x" />
                          <img src="img/content/thumbnails/nearest-gym-01.jpg" srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt="" />
                        </picture>
                      </div>
                      {/*
                      <!--<p className="thumbnail-spec-gym__type">Ближайший зал</p>-->
                      <div className="thumbnail-spec-gym__header", align ="center",>
                      */}
                      <div className="thumbnail-spec-gym__header">
                        <h3 className="thumbnail-spec-gym__title">Скоро тут появится что-то полезное</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export default PersonalAccount;
