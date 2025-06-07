import { Fragment, JSX, MouseEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { IDetailUserProfileRdo } from '@backend/shared/core';

import UserPhoto from '../user-photo/user-photo';
import UserDetailWrapperContentHeadStatus from '../user-detail-wrapper-content-head-status/user-detail-wrapper-content-head-status';
import PopupModalMap from '../popup-modal-map/popup-modal-map';

import { CityLocation, LocationTitle, MetroPlaceLocation } from '../../const';

type UserDetailWrapperContentHeadProps = {
  classNamePrefix: string;
  detailUserProfile: IDetailUserProfileRdo;
}

function UserDetailWrapperContentHead({ classNamePrefix, detailUserProfile }: UserDetailWrapperContentHeadProps): JSX.Element {
  //! возможно отдельный компонет Location, где иконка #icon-location
  //    нет css для user-card__icon-location / user-card-coach__icon-location / user-card-coach-2__icon-location, но в svg выставлено
  // добавил UserPhoto

  const { pathname } = useLocation();
  const {
    user: { role, name, avatarFilePath, location, about },
    questionnaire: { readyForTraining, description }
  } = detailUserProfile;
  const { LOCATION, ZOOM } = CityLocation;
  const locationText = LocationTitle[location];
  const placeLocation = MetroPlaceLocation[location];

  const [showLocationMap, setShowLocationMap] = useState(false);

  const handleLocationLinkClick = (event: MouseEvent) => {
    event.preventDefault();

    setShowLocationMap(true);
  };

  const handleLocationPopupModalMapClose = () => {
    setShowLocationMap(false);
  };

  return (
    <Fragment>
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
        <PopupModalMap
          title={name}
          address={locationText}
          startPlaceLocation={LOCATION}
          startZomm={ZOOM}
          placeLocation={placeLocation}
          onClose={handleLocationPopupModalMapClose}
        />
      }
      <UserDetailWrapperContentHeadStatus role={role} readyForTraining={readyForTraining} />
      <div className={`${classNamePrefix}__text`}>
        <p>{about}</p>
        {(description) && <p>{description}</p>}
      </div>
    </Fragment>
  );
}

export default UserDetailWrapperContentHead;
