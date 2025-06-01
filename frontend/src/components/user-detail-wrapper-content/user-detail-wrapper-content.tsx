import { JSX, MouseEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { IDetailUserProfileRdo, isCoachRole } from '@backend/shared/core';

import UserPhoto from '../user-photo/user-photo';
import Hashtags from '../hashtags/hashtags';
import UserDetailStatus from '../user-detail-status/user-detail-status';
import PopupModalMap from '../popup-modal-map/popup-modal-map';

import { getSpecializationsTitles } from '../../utils/common';
import { LocationTitle } from '../../const';
import UserDetailWrapperContentuserCoachCertificates from '../user-detail-wrapper-content-coach-certificates copy/user-detail-wrapper-content-coach-certificates';

type UserDetailWrapperContentProps = {
  classNamePrefix: string;
  detailUserProfile: IDetailUserProfileRdo;
}

function UserDetailWrapperContent({ classNamePrefix, detailUserProfile }: UserDetailWrapperContentProps): JSX.Element {
  //! кнопка - добавить в друзья
  //! много кода, попробовать разделить, сертификаты... что то еще

  //! возможно отдельный компонет Location, где иконка #icon-location
  //    нет css для user-card__icon-location / user-card-coach__icon-location / user-card-coach-2__icon-location, но в svg выставлено
  //! просмотр карты с местоположением - обработка клика в Location карта href={`${pathname}#popup-user-map.html`}
  // добавил UserPhoto

  const { pathname } = useLocation();
  const {
    user: { role, name, avatarFilePath, location, about },
    questionnaire: { readyForTraining, specializations, description, certificates = [] }
  } = detailUserProfile;
  const locationText = LocationTitle[location];
  const [showLocationMap, setShowLocationMap] = useState(false);
  const isCoach = isCoachRole(role);

  const handleLocationLinkClick = (event: MouseEvent) => {
    event.preventDefault();
    setShowLocationMap(true);
  };

  const handleLocationPopupModalMapClose = () => {
    setShowLocationMap(false);
  };

  const handleAddFriendButtonClick = (event: MouseEvent) => {
    event.preventDefault();

    //! отладка
    // eslint-disable-next-line no-console
    console.log('handleAddFriendButtonClick');
  };

  return (
    <div className={`${classNamePrefix}__content`}>
      <UserPhoto className={`${classNamePrefix}__head`} size={80} path={avatarFilePath} />
      <div className={`${classNamePrefix}__head`}>
        <h2 className={`${classNamePrefix}__title`}>{name}</h2>
      </div>
      <div className={`${classNamePrefix}__label`}>
        <a href={`${pathname}#popup-user-map.html`} onClick={handleLocationLinkClick}>
          <svg className={`${classNamePrefix}__icon-location`} width="12" height="14" aria-hidden="true">
            <use xlinkHref="#icon-location"></use>
          </svg>
          <span>{locationText}</span>
        </a>
      </div>
      {
        showLocationMap &&
        <PopupModalMap title={name} address={locationText} onClose={handleLocationPopupModalMapClose} />
      }
      <UserDetailStatus role={role} readyForTraining={readyForTraining} />
      <div className={`${classNamePrefix}__text`}>
        <p>{about}</p>
        {(description) && <p>{description}</p>}
      </div>
      {
        isCoach &&
        <UserDetailWrapperContentuserCoachCertificates classNamePrefix={classNamePrefix} certificates={certificates} />
      }
      <Hashtags
        items={getSpecializationsTitles(specializations)}
        listClassName={`${classNamePrefix}__hashtag-list`}
        itemClassName={`${classNamePrefix}__hashtag-item`}
      />
      <button
        className={`btn ${classNamePrefix}__btn`}
        type="button"
        onClick={handleAddFriendButtonClick}
      >
        Добавить в друзья
      </button>
    </div>
  );
}

export default UserDetailWrapperContent;
