import { Fragment, useEffect, useState } from 'react';

import MainSpinner from '../../components/main-spinner/main-spinner';
import Header from '../../components/header/header';
import AvatarUpload from '../../components/avatar-upload/avatar-upload';
import CustomInput from '../../components/custom-input/custom-input';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsFetchUserInfoExecuting, getUserInfo } from '../../store/user-process/selectors';
import { fetchUserInfo } from '../../store/user-action';
import { PageTitle } from '../../const';

function PersonalAccount(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isEditing/*, setIsEditing*/] = useState(false);
  const isFetchUserInfoExecuting = useAppSelector(getIsFetchUserInfoExecuting);
  const userInfo = useAppSelector(getUserInfo);
  const { name, avatarPath, about } = userInfo;

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

  const endingClassName = (isEditing) ? '-edit' : '';
  const buttonCaption = (isEditing) ? 'Сохранить' : 'Редактировать';

  return (
    <Fragment>
      <Header title={PageTitle.PersonalAccount} />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <section className={`user-info${endingClassName}`}>
                <div className="user-info__header">
                  {/* //! нужен будет обработчик при изменнии файла в режиме редактирования */}
                  <AvatarUpload name='user-photo-1' path={avatarPath} forPersonalAccount isShowButtons={isEditing} readonly={!isEditing} />
                </div>
                <form className="user-info__form" action="#" method="post">
                  <button className="btn-flat btn-flat--underlined user-info__edit-button" type="button" aria-label={buttonCaption}>
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-edit"></use>
                    </svg>
                    <span>{buttonCaption}</span>
                  </button>
                  <div className="user-info__section">
                    <h2 className="user-info__title">Обо мне</h2>
                    <CustomInput type='text' name='name' label='Имя' value={name} divExtraClassName='user-info__input' readonly={!isEditing} />
                    <CustomInput type='textarea' name='description' label='Описание' value={about} divExtraClassName='user-info__textarea' readonly={!isEditing} />
                  </div>
                  <div className="user-info__section user-info__section--status">
                    <h2 className="user-info__title user-info__title--status">Статус</h2>
                    <div className="custom-toggle custom-toggle--switch user-info__toggle">
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
                  <div className="user-info__section">
                    <h2 className="user-info__title user-info__title--specialization">Специализация</h2>
                    <div className="specialization-checkbox user-info__specialization">
                      <div className="btn-checkbox">
                        <label>
                          <input className="visually-hidden" type="checkbox" name="specialization" value="yoga" defaultChecked />
                          <span className="btn-checkbox__btn">Йога</span>
                        </label>
                      </div>
                      <div className="btn-checkbox">
                        <label>
                          <input className="visually-hidden" type="checkbox" name="specialization" value="running" />
                          <span className="btn-checkbox__btn">Бег</span>
                        </label>
                      </div>
                      <div className="btn-checkbox">
                        <label>
                          <input className="visually-hidden" type="checkbox" name="specialization" value="aerobics" defaultChecked />
                          <span className="btn-checkbox__btn">Аэробика</span>
                        </label>
                      </div>
                      <div className="btn-checkbox">
                        <label>
                          <input className="visually-hidden" type="checkbox" name="specialization" value="boxing" />
                          <span className="btn-checkbox__btn">Бокс</span>
                        </label>
                      </div>
                      <div className="btn-checkbox">
                        <label>
                          <input className="visually-hidden" type="checkbox" name="specialization" value="power" />
                          <span className="btn-checkbox__btn">Силовые</span>
                        </label>
                      </div>
                      <div className="btn-checkbox">
                        <label>
                          <input className="visually-hidden" type="checkbox" name="specialization" value="pilates" defaultChecked />
                          <span className="btn-checkbox__btn">Пилатес</span>
                        </label>
                      </div>
                      <div className="btn-checkbox">
                        <label>
                          <input className="visually-hidden" type="checkbox" name="specialization" value="stretching" defaultChecked />
                          <span className="btn-checkbox__btn">Стрейчинг</span>
                        </label>
                      </div>
                      <div className="btn-checkbox">
                        <label>
                          <input className="visually-hidden" type="checkbox" name="specialization" value="crossfit" />
                          <span className="btn-checkbox__btn">Кроссфит</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="custom-select--readonly custom-select user-info__select">
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
                  <div className="custom-select--readonly custom-select user-info__select">
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
                  <div className="custom-select--readonly custom-select user-info__select">
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
