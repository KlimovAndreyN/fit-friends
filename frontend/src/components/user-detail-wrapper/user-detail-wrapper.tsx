import { JSX, Fragment, MouseEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './user-detail-wrapper.css';

import { IDetailUserProfileRdo, isCoachRole } from '@backend/shared/core';

import UserPhoto from '../user-photo/user-photo';
import Hashtags from '../hashtags/hashtags';
import UserDetailGallary from '../user-detail-gallary/user-detail-gallary';
import UserDetailStatus from '../user-detail-status/user-detail-status';
import UserDetailCoachTrainingBlock from '../user-detail-coach-training-block/user-detail-coach-training-block';
import UserDetailCoachCertificates from '../user-detail-coach-certificates/user-detail-coach-certificates';
import PopupModalMap from '../popup-modal-map/popup-modal-map';

import { getSpecializationsTitles } from '../../utils/common';
import { LocationTitle } from '../../const';

type UserDetailWrapperProps = {
  detailUserProfile: IDetailUserProfileRdo;
}

function UserDetailWrapper({ detailUserProfile }: UserDetailWrapperProps): JSX.Element {
  //! кнопка - добавить в друзья
  //! много кода, попробовать разделить, сертификаты... что то еще

  //! возможно отдельный компонет Location, где иконка #icon-location
  //    нет css для user-card__icon-location / user-card-coach__icon-location / user-card-coach-2__icon-location, но в svg выставлено
  //! просмотр карты с местоположением - обработка клика в Location карта href={`${pathname}#popup-user-map.html`}
  //! проверить консоль браузера на ошибки
  //! проверить разметку
  // добавил UserPhoto
  // кнопке Показать сертификаты добавил outline-none-on-focus, т.к. была рамка на кнопке при закрытии окна

  const { pathname } = useLocation();
  const {
    user: { id: userId, role, name, avatarFilePath, location, about, backgroundPath },
    questionnaire: { readyForTraining, specializations, description, individualTraining, certificates = [] }
  } = detailUserProfile;
  const locationText = LocationTitle[location];
  const [showCertificates, setShowCertificates] = useState(false);
  const [showLocationMap, setShowLocationMap] = useState(false);
  const isCoach = isCoachRole(role);
  const mainClassName = (isCoach) ? `user-card-coach${(individualTraining) ? '-2' : ''}` : 'user-card';

  const handleLocationLinkClick = (event: MouseEvent) => {
    event.preventDefault();
    setShowLocationMap(true);
  };

  const handleLocationPopupModalMapClose = () => {
    setShowLocationMap(false);
  };

  const handleShowCertificatesButtonClick = (event: MouseEvent) => {
    event.preventDefault();
    setShowCertificates(true);
  };

  const handleCertificatesPopupModalClose = () => {
    setShowCertificates(false);
  };

  const handleAddFriendButtonClick = (event: MouseEvent) => {
    event.preventDefault();

    //! отладка
    // eslint-disable-next-line no-console
    console.log('handleAddFriendButtonClick');
  };

  const content = (
    <Fragment>
      <div className={`${mainClassName}__content`}>
        <UserPhoto className={`${mainClassName}__head`} size={80} path={avatarFilePath} />
        <div className={`${mainClassName}__head`}>
          <h2 className={`${mainClassName}__title`}>{name}</h2>
        </div>
        <div className={`${mainClassName}__label`}>
          <a href={`${pathname}#popup-user-map.html`} onClick={handleLocationLinkClick}>
            <svg className={`${mainClassName}__icon-location`} width="12" height="14" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <span>{locationText}</span>
          </a>
        </div>
        {
          showLocationMap &&
          <PopupModalMap
            title={name}
            address={locationText}
            onClose={handleLocationPopupModalMapClose}
          />
        }
        <UserDetailStatus role={role} readyForTraining={readyForTraining} />
        <div className={`${mainClassName}__text`}>
          <p>{about}</p>
          {(description) && <p>{description}</p>}
        </div>
        {
          isCoach &&
          <Fragment>
            <button
              className={`btn-flat ${mainClassName}__sertificate outline-none-on-focus`}
              type="button"
              onClick={handleShowCertificatesButtonClick}
            >
              <svg width="12" height="13" aria-hidden="true">
                <use xlinkHref="#icon-teacher"></use>
              </svg>
              <span>Посмотреть сертификаты</span>
            </button>
            {
              showCertificates &&
              <UserDetailCoachCertificates
                certificates={certificates}
                onClose={handleCertificatesPopupModalClose}
              />
            }
          </Fragment>
        }
        <Hashtags
          items={getSpecializationsTitles(specializations)}
          listClassName={`${mainClassName}__hashtag-list`}
          itemClassName={`${mainClassName}__hashtag-item`}
        />
        <button className={`btn ${mainClassName}__btn`} type="button" onClick={handleAddFriendButtonClick}>Добавить в друзья</button>
      </div>
      <UserDetailGallary classNamePrefix={mainClassName} filesPaths={[backgroundPath]} />
    </Fragment>
  );

  return (
    <div className="inner-page__content">
      <section className={mainClassName}>
        <h1 className="visually-hidden">{`Карточка пользователя${(isCoach) ? ' роль тренер' : ''}`}</h1>
        <div className={`${mainClassName}__wrapper`}>
          {
            isCoach
              ? <div className={`${mainClassName}__card`}>{content}</div>
              : content
          }
          {isCoach && <UserDetailCoachTrainingBlock classNamePrefix={mainClassName} userId={userId} />}
        </div>
      </section>
    </div>
  );
}

export default UserDetailWrapper;
