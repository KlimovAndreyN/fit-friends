import { Fragment, useEffect, useState } from 'react';

import MainSpinner from '../../components/main-spinner/main-spinner';
import Header from '../../components/header/header';
import AvatarUpload from '../../components/avatar-upload/avatar-upload';
import PersonalAccountBlock from '../../components/personal-account-block/personal-account-block';
import CustomInput from '../../components/custom-input/custom-input';
import CustomSelect from '../../components/custom-select/custom-select';
import SpecializationsCheckbox from '../../components/specializations-checkbox/specializations-checkbox';

import { UserRole } from '@backend/shared';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsFetchUserInfoExecuting, getUserInfo, getUserRole } from '../../store/user-process/selectors';
import { fetchUserInfo } from '../../store/user-action';
import { LOCATIONS, PageTitle, USER_GENDERS, USER_LEVELS } from '../../const';

function PersonalAccount(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isEditing/*, setIsEditing*/] = useState(false);
  const isFetchUserInfoExecuting = useAppSelector(getIsFetchUserInfoExecuting);
  const userRole = useAppSelector(getUserRole);
  const userInfo = useAppSelector(getUserInfo);
  const { name, avatarPath, about, specializations, metroStationName, gender, level } = userInfo;

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
  const isSpotsmanRole = (userRole === UserRole.Sportsman);
  const readyForTrainingCaption = (isSpotsmanRole) ? 'Готов к тренировке' : 'Готов тренировать';

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
                  <PersonalAccountBlock mainClassNamePrefix={mainClassName} title='Обо мне' >
                    <Fragment>
                      <CustomInput type='text' name='name' label='Имя' value={name} divExtraClassName={`${mainClassName}__input`} readonly={!isEditing} />
                      <CustomInput type='textarea' name='description' label='Описание' value={about} divExtraClassName={`${mainClassName}__textarea`} readonly={!isEditing} />
                    </Fragment>
                  </PersonalAccountBlock>
                  <PersonalAccountBlock mainClassNamePrefix={mainClassName} extraClassNamePrefix='status' title='Статус' >
                    <div className={`custom-toggle custom-toggle--switch ${mainClassName}__toggle`}>
                      <label>
                        <input type="checkbox" name="ready-for-training" defaultChecked />
                        <span className="custom-toggle__icon">
                          <svg width="9" height="6" aria-hidden="true">
                            <use xlinkHref="#arrow-check"></use>
                          </svg>
                        </span>
                        <span className="custom-toggle__label">{readyForTrainingCaption}</span>
                      </label>
                    </div>
                  </PersonalAccountBlock>
                  <PersonalAccountBlock mainClassNamePrefix={mainClassName} extraClassNamePrefix='specialization' title='Специализация' >
                    <SpecializationsCheckbox name='specialization' values={specializations} divExtraClassName={`${mainClassName}__specialization`} readonly={!isEditing} />
                  </PersonalAccountBlock>
                  <CustomSelect //! в макете к названию станции добавлено "ст. м. ", добавил titlePrefix
                    name='location'
                    caption='Локация'
                    value={metroStationName}
                    titlePrefix='ст. м. '
                    options={LOCATIONS}
                    extraClassName={`${mainClassName}__select`}
                    readonly={!isEditing}
                  />
                  <CustomSelect
                    name='sex'
                    caption='Пол'
                    value={gender}
                    options={USER_GENDERS}
                    extraClassName={`${mainClassName}__select`}
                    readonly={!isEditing}
                  />
                  <CustomSelect
                    name='level'
                    caption='Уровень'
                    value={level}
                    options={USER_LEVELS}
                    extraClassName={`${mainClassName}__select`}
                    readonly={!isEditing}
                  />
                </form>
              </section>
              <div className="inner-page__content">
                {
                  (isSpotsmanRole)
                    ?
                    <div className="personal-account-user">
                      <div className="personal-account-user__schedule">
                        <form action="#" method="get">
                          <div className="personal-account-user__form">
                            <div className="personal-account-user__input">
                              <label>
                                <span className="personal-account-user__label">План на день, ккал</span>
                                {/*//! или выключить или что по ТЗ, но тип поменять на number, как быть со вторым полем... */}
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
                          {/* //! закоментировано в маркапах
                          <!--<p className="thumbnail-spec-gym__type">Ближайший зал</p>-->
                          <div className="thumbnail-spec-gym__header", align ="center",>
                          */}
                          <div className="thumbnail-spec-gym__header">
                            <h3 className="thumbnail-spec-gym__title">Скоро тут появится что-то полезное</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    :
                    null
                }
              </div>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export default PersonalAccount;
