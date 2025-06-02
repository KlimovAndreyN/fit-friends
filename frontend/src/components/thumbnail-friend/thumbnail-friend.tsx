import { JSX } from 'react';
import classNames from 'classnames';

import { IFriendRdo, isPendingTrainingRequestStatus, isSportsmanRole, Role } from '@backend/shared/core';

import ThumbnailFriendHeader from '../thumbnail-friend-header/thumbnail-friend-header';
import ThumbnailFriendActivityBar from '../thumbnail-friend-activity-bar/thumbnail-friend-activity-bar';
import ThumbnailFriendRequestStatus from '../thumbnail-friend-request-status/thumbnail-friend-request-status';

type ThumbnailFriendProps = {
  className: string;
  friend: IFriendRdo;
  userRole: Role;
}

function ThumbnailFriend({ className, friend, userRole }: ThumbnailFriendProps): JSX.Element {
  //! проверить консоль браузера на ошибки

  const { id, name, avatarFilePath, role, location, specializations, readyForTraining, outJointTrainingStatus, inMyJointTrainingStatus, personalTrainingStatus } = friend;
  const isSportsmanUser = isSportsmanRole(userRole);
  const isSportsman = isSportsmanRole(role);
  const isShowRequestStatus = (isSportsmanUser && !!inMyJointTrainingStatus || !isSportsmanUser && !!personalTrainingStatus);
  const isShowRequestButtons = (
    isSportsmanUser && isPendingTrainingRequestStatus(inMyJointTrainingStatus)
    || !isSportsmanUser && isPendingTrainingRequestStatus(personalTrainingStatus)
  );
  const mainClassName = 'thumbnail-friend';
  const mainDivClassName = classNames(`${mainClassName}__info`, `${mainClassName}__info--${(isSportsman) ? 'theme-light' : 'theme-dark'}`);

  const handleInviteButtonClick = () => {
    // eslint-disable-next-line no-console
    console.log('handleInviteButtonClick');
  };

  const handleAcceptButtonClick = () => {
    // eslint-disable-next-line no-console
    console.log('handleAcceptButtonClick');
  };

  const handleRejectButtonClick = () => {
    // eslint-disable-next-line no-console
    console.log('handleRejectButtonClick');
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
            readyForTraning={readyForTraining}
            isDisabled={isPendingTrainingRequestStatus(outJointTrainingStatus)}
            onInviteButtonClick={handleInviteButtonClick}
          />
        </div>
        {
          isShowRequestStatus &&
          <ThumbnailFriendRequestStatus
            text='Запрос на&nbsp;совместную тренировку' //! тут определить текст
            classNamePrefix={mainClassName}
            isShowButtons={isShowRequestButtons}
            onAcceptButtonClick={handleAcceptButtonClick}
            onRejectButtonClick={handleRejectButtonClick}
          />
        }
      </div>
    </li>
  );
}

export default ThumbnailFriend;
