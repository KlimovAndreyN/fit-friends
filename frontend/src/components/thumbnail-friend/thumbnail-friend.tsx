import { JSX } from 'react';
import { Link } from 'react-router-dom';

import UserPhoto from '../user-photo/user-photo';

import { getUserRoute } from '../../utils/common';
import { Friend } from '../../const';

type ThumbnailFriendProps = {
  className: string;
  friend: Friend;
}

function ThumbnailFriend({ className, friend }: ThumbnailFriendProps): JSX.Element {
  //! проверить консоль браузера на ошибки

  const { id, name, avatarFilePath } = friend;
  const userRoute = getUserRoute(id);
  const mainClassName = 'thumbnail-friend';

  return (
    <li className={`${className}_item`} >
      <div className={mainClassName}>
        <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
          <div className="thumbnail-friend__image-status">
            <Link to={userRoute}>
              <UserPhoto className={`${mainClassName}__image`} path={avatarFilePath} size={78} />
            </Link>
          </div>
          <div className="thumbnail-friend__header">
            <Link to={userRoute}>
              <h2 className="thumbnail-friend__name">{name}</h2>
            </Link>
            <div className="thumbnail-friend__location">
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-location" />
              </svg>
              <address className="thumbnail-friend__location-address">Петроградская</address>
            </div>
          </div>
          <ul className="thumbnail-friend__training-types-list">
            <li>
              <div className="hashtag thumbnail-friend__hashtag"><span>#стретчинг</span></div>
            </li>
          </ul>
          <div className="thumbnail-friend__activity-bar">
            <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready"><span>Готов к&nbsp;тренировке</span>
            </div>
            <button className="thumbnail-friend__invite-button" type="button">
              <svg width="43" height="46" aria-hidden="true" focusable="false">
                <use xlinkHref="#icon-invite" />
              </svg><span className="visually-hidden">Пригласить друга на совместную тренировку</span>
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
