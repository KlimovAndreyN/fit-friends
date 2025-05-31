import { JSX } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { isCoachRole, IUserProfileRdo } from '@backend/shared/core';

import UserPhoto from '../user-photo/user-photo';
import UserLocation from '../user-location/user-location';
import Hashtags from '../hashtags/hashtags';

import { getSpecializationsTitles, getUserRoute } from '../../utils/common';

const USER_PHOTO_SIZE = 82;

type ThumbnailUserProps = {
  userProfile: IUserProfileRdo;
  isUseCoachClassName?: boolean;
  extraDivClassName?: string;
  extraLinkClassName?: string;
}

function ThumbnailUser({ userProfile, isUseCoachClassName, extraDivClassName, extraLinkClassName }: ThumbnailUserProps): JSX.Element {
  const { id, role, name, avatarFilePath, location, specializations } = userProfile;
  const mainClassName = 'thumbnail-user';
  const mainDivClassName = classNames(
    mainClassName,
    `${mainClassName}--role-${isUseCoachClassName && isCoachRole(role) ? 'coach' : 'user'}`,
    extraDivClassName
  );
  const linkClassName = classNames('btn', extraLinkClassName, `btn--medium ${mainClassName}__button`);
  const hashtags = getSpecializationsTitles(specializations);

  return (
    <div className={mainDivClassName}>
      <UserPhoto path={avatarFilePath} className={`${mainClassName}__image`} size={USER_PHOTO_SIZE} />
      <div className={`${mainClassName}__header`}>
        <h3 className={`${mainClassName}__name`}>{name}</h3>
        <UserLocation location={location} extraClassName={mainClassName} />
      </div>
      <Hashtags
        items={hashtags}
        listClassName={`${mainClassName}__hashtags-list`}
        itemClassName={`${mainClassName}__hashtags-item`}
        divItemClassName={`${mainClassName}__hashtag`}
      />
      <Link className={linkClassName} to={getUserRoute(id)}>Подробнее</Link>
    </div>
  );
}

export default ThumbnailUser;
