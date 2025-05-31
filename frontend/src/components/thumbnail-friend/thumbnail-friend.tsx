import { JSX } from 'react';
import classNames from 'classnames';

import { isSportsmanRole, Role } from '@backend/shared/core';

import ThumbnailFriendHeader from '../thumbnail-friend-header/thumbnail-friend-header';
import ThumbnailFriendActivityBar from '../thumbnail-friend-activity-bar/thumbnail-friend-activity-bar';

import { Friend, isPendingTrainingRequestStatus } from '../../const';

type ThumbnailFriendProps = {
  className: string;
  friend: Friend;
  userRole: Role;
}

function ThumbnailFriend({ className, friend, userRole }: ThumbnailFriendProps): JSX.Element {
  //! проверить консоль браузера на ошибки

  const { id, name, avatarFilePath, role, location, specializations, readyForTraning, outJointTrainingStatus, inMyJointTrainingStatus, personalTrainingStatus } = friend;
  const isSportsmanUser = isSportsmanRole(userRole);
  const isSportsman = isSportsmanRole(role);
  const mainClassName = 'thumbnail-friend';
  const mainDivClassName = classNames(`${mainClassName}__info`, `${mainClassName}__info--${(isSportsman) ? 'theme-light' : 'theme-dark'}`);
  const divRequestClassName = `${mainClassName}__request-status`;

  const handleInviteButtonClick = () => {
    // eslint-disable-next-line no-console
    console.log('handleInviteButtonClick');
  };

  return (
    <li className={`${className}__item`}>
      <div className={mainClassName}>
        <div className={mainDivClassName}>
          <ThumbnailFriendHeader
            className={mainClassName}
            id={id}
            name={name}
            avatarFilePath={avatarFilePath}
            isSportsman={isSportsman}
            location={location}
            specializations={specializations}
          />
          <ThumbnailFriendActivityBar
            classNamePrefix={mainClassName}
            isSportsmanUser={isSportsmanUser}
            role={role}
            readyForTraning={readyForTraning}
            isDisabled={isPendingTrainingRequestStatus(outJointTrainingStatus)}
            onInviteButtonClick={handleInviteButtonClick}
          />
        </div>
        {
          (isSportsmanUser && inMyJointTrainingStatus || !isSportsmanUser && personalTrainingStatus) &&
          <div className={`${divRequestClassName} ${divRequestClassName}--role-user`}>
            <p className="thumbnail-friend__request-text">Запрос на&nbsp;совместную тренировку</p>
            <div className="thumbnail-friend__button-wrapper">
              <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button">Принять</button>
              <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button">Отклонить</button>
            </div>
          </div>
        }
      </div>
    </li>
  );
}

export default ThumbnailFriend;
