import { JSX } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { isCoachRole, IUserProfileRdo } from '@backend/shared/core';

import UserPhoto from '../user-photo/user-photo';
import UserLocation from '../user-location/user-location';
import Hashtags from '../hashtags/hashtags';

import { getUserRoute } from '../../utils/common';
import { SpecializationTitle } from '../../const';

const USER_PHOTO_SIZE = 82;

type ThumbnailUserProps = {
  userProfile: IUserProfileRdo;
  isUseCoachClassName?: boolean;
  extraDivClassName?: string;
  extraLinkClassName?: string;
}

function ThumbnailUser({ userProfile, isUseCoachClassName, extraDivClassName, extraLinkClassName }: ThumbnailUserProps): JSX.Element {
  const { id, role, name, avatarFilePath, location, specializations } = userProfile;
  const mainClassName = classNames(
    'thumbnail-user',
    `thumbnail-user--role-${isUseCoachClassName && isCoachRole(role) ? 'coach' : 'user'}`,
    extraDivClassName
  );
  const linkClassName = classNames('btn', extraLinkClassName, 'btn--medium thumbnail-user__button');
  const hashtags = specializations.map(
    (specialization) => (SpecializationTitle[specialization].toLocaleLowerCase())
  );

  return (
    <div className={mainClassName}>
      <UserPhoto path={avatarFilePath} className='thumbnail-user__image' size={USER_PHOTO_SIZE} />
      <div className="thumbnail-user__header">
        <h3 className="thumbnail-user__name">{name}</h3>
        <UserLocation location={location} extraClassName='thumbnail-user' />
      </div>
      <Hashtags classNamePrefix='thumbnail-user' divItemClassNamePrefix='thumbnail-user' items={hashtags} />
      <Link className={linkClassName} to={getUserRoute(id)}>Подробнее</Link>
    </div>
  );
}

export default ThumbnailUser;
