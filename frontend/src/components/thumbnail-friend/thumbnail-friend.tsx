import { JSX } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { isSportsmanRole } from '@backend/shared/core';

import UserPhoto from '../user-photo/user-photo';
import Hashtags from '../hashtags/hashtags';

import { getReadyTraining, getSpecializationsTitles, getUserRoute } from '../../utils/common';
import { Friend, LocationTitle } from '../../const';

type ThumbnailFriendProps = {
  className: string;
  friend: Friend;
}

function ThumbnailFriend({ className, friend }: ThumbnailFriendProps): JSX.Element {
  //! проверить консоль браузера на ошибки

  const { id, name, avatarFilePath, role, location, specializations, readyForTraning } = friend;
  const userRoute = getUserRoute(id);
  const isSportsman = isSportsmanRole(role);
  const readyTitle = getReadyTraining(role, readyForTraning);
  const mainClassName = 'thumbnail-friend';
  const mainDivClassName = classNames(`${mainClassName}__info`, `${mainClassName}__info--${(isSportsman) ? 'theme-light' : 'theme-dark'}`);

  return (
    <li className={`${className}__item`} >
      <div className={mainClassName}>
        <div className={mainDivClassName}>
          <div className={`${mainClassName}__image-status`}>
            <Link to={userRoute}>
              <UserPhoto className={`${mainClassName}__image`} path={avatarFilePath} size={78} />
            </Link>
          </div>
          <div className={`${mainClassName}__header`}>
            <Link to={userRoute} className={`${mainClassName}__name`} style={{ color: (isSportsman) ? 'black' : 'white' }}>
              <h2 className={`${mainClassName}__name`}>{name}</h2>
            </Link>
            <div className={`${mainClassName}__location`}>
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-location" />
              </svg>
              <address className={`${mainClassName}__location-address`}>{LocationTitle[location]}</address>
            </div>
          </div>
          <Hashtags
            items={getSpecializationsTitles(specializations)}
            listClassName={`${mainClassName}__training-types-list`}
            divItemClassName={`${mainClassName}__hashtag`}
          />
          <div className={`${mainClassName}__activity-bar`}>
            <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready">
              <span>{readyTitle}</span>
            </div>
            <button className="thumbnail-friend__invite-button" type="button">
              <svg width="43" height="46" aria-hidden="true" focusable="false">
                <use xlinkHref="#icon-invite" />
              </svg>
              <span className="visually-hidden">Пригласить друга на совместную тренировку</span>
            </button>
          </div>
        </div>
        <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
          <p className="thumbnail-friend__request-text">Запрос на&nbsp;совместную тренировку</p>
          <div className="thumbnail-friend__button-wrapper">
            <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button">Принять</button>
            <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button">Отклонить</button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ThumbnailFriend;
