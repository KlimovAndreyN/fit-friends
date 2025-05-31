import { Fragment, JSX } from 'react';
import { Link } from 'react-router-dom';

import { Location, Specialization } from '@backend/shared/core';

import UserPhoto from '../user-photo/user-photo';
import Hashtags from '../hashtags/hashtags';

import { getSpecializationsTitles, getUserRoute } from '../../utils/common';
import { LocationTitle } from '../../const';

type ThumbnailFriendHeaderProps = {
  className: string;
  id: string;
  name: string;
  avatarFilePath: string;
  isSportsman: boolean;
  location: Location;
  specializations: Specialization[];
}

function ThumbnailFriendHeader(props: ThumbnailFriendHeaderProps): JSX.Element {
  const { className, id, name, avatarFilePath, isSportsman, location, specializations } = props;
  const userRoute = getUserRoute(id);

  return (
    <Fragment>
      <div className={`${className}__image-status`}>
        <Link to={userRoute}>
          <UserPhoto className={`${className}__image`} path={avatarFilePath} size={78} />
        </Link>
      </div>
      <div className={`${className}__header`}>
        <Link to={userRoute} className={`${className}__name`} style={{ color: (isSportsman) ? 'black' : 'white' }}>
          <h2 className={`${className}__name`}>{name}</h2>
        </Link>
        <div className={`${className}__location`}>
          <svg width="14" height="16" aria-hidden="true">
            <use xlinkHref="#icon-location" />
          </svg>
          <address className={`${className}__location-address`}>{LocationTitle[location]}</address>
        </div>
      </div>
      <Hashtags
        items={getSpecializationsTitles(specializations)}
        listClassName={`${className}__training-types-list`}
        divItemClassName={`${className}__hashtag`}
        style={{ minHeight: '85px' }} //! для трех специализаций короткие карточки, а есть вариант через css автоматически поправить?
      //! когда разный текст снизу то высота карточек все равно разная
      />
    </Fragment>
  );
}

export default ThumbnailFriendHeader;
