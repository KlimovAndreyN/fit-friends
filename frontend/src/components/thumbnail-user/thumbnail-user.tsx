import { JSX } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { isCoachRole, IUserProfileRdo, Role } from '@backend/shared/core';

import UserPhoto from '../user-photo/user-photo';
import Hashtags from '../hashtags/hashtags';

import { getUserRoute } from '../../utils/common';
import { LocationTitle, SpecializationTitle } from '../../const';

const USER_PHOTO_SIZE = 82;

type ThumbnailUserProps = {
  userProfile: IUserProfileRdo;
  isUseCoachClassName?: boolean;
  extraClassName?: string;
}

function ThumbnailUser({ userProfile, isUseCoachClassName, extraClassName }: ThumbnailUserProps): JSX.Element {
  //! Адрес вынести в компонент - thumbnail-user__location

  const { id,/* role,*/ name, avatarFilePath, location, specializations } = userProfile;
  const role = Role.Coach; //! временно
  const mainClassName = classNames(
    'thumbnail-user',
    `thumbnail-user--role-${isUseCoachClassName && isCoachRole(role) ? 'coach' : 'user'}`,
    extraClassName
  );
  const hashtags = specializations.map(
    (specialization) => (SpecializationTitle[specialization].toLocaleLowerCase())
  );

  return (
    <div className={mainClassName}>
      <UserPhoto path={avatarFilePath} className='thumbnail-user__image' size={USER_PHOTO_SIZE} />
      <div className="thumbnail-user__header">
        <h3 className="thumbnail-user__name">{name}</h3>
        <div className="thumbnail-user__location">
          <svg width="14" height="16" aria-hidden="true">
            <use xlinkHref="#icon-location"></use>
          </svg>
          <address className="thumbnail-user__location-address">{LocationTitle[location]}</address>
        </div>
      </div>
      <Hashtags classNamePrefix='thumbnail-user' divItemClassNamePrefix='thumbnail-user' items={hashtags} />
      <Link className="btn btn--medium thumbnail-user__button" to={getUserRoute(id)}>Подробнее</Link>
    </div>
  );
}

export default ThumbnailUser;
