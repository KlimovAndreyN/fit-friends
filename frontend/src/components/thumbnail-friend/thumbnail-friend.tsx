import { JSX } from 'react';
import classNames from 'classnames';

import { IFriendRdo, isPendingTrainingRequestStatus, isSportsmanRole, Role } from '@backend/shared/core';

import ThumbnailFriendHeader from '../thumbnail-friend-header/thumbnail-friend-header';
import ThumbnailFriendActivityBar from '../thumbnail-friend-activity-bar/thumbnail-friend-activity-bar';
import ThumbnailFriendRequestStatus from '../thumbnail-friend-request-status/thumbnail-friend-request-status';

import { useAppSelector } from '../../hooks';
import { getUserId } from '../../store/user-process/selectors';
import { addStatusText, getBaseRequestText, getPersonalTrainingStatusText } from '../../utils/common';

type ThumbnailFriendProps = {
  className: string;
  friend: IFriendRdo;
  userRole: Role;
}

function ThumbnailFriend({ className, friend, userRole }: ThumbnailFriendProps): JSX.Element {
  //! проверить консоль браузера на ошибки

  const { id, name, avatarFilePath, role, location, specializations, readyForTraining, outJointTrainingStatus, inJointTrainingStatus, personalTrainingStatus } = friend;
  const isSportsmanUser = isSportsmanRole(userRole);
  const isSportsman = isSportsmanRole(role);
  const mainClassName = 'thumbnail-friend';
  const mainDivClassName = classNames(`${mainClassName}__info`, `${mainClassName}__info--${(isSportsman) ? 'theme-light' : 'theme-dark'}`);

  // определим, что показывать и для каких случаев
  let isShowRequestStatus = false;
  let isShowRequestButtons = false;
  const statusTexts: string[] = [];

  if (isSportsmanUser) {
    // для спортсмена
    if (isSportsman) {
      // исходящие personalTrainingStatus
      if (outJointTrainingStatus) {
        isShowRequestStatus = true;
        statusTexts.push(addStatusText(getBaseRequestText(), outJointTrainingStatus));
      }
      // входящие inJointTrainingStatus
      //! можно не объеденять с текстом для исходящего запроса
      if (inJointTrainingStatus) {
        isShowRequestStatus = true;
        isShowRequestButtons = isPendingTrainingRequestStatus(inJointTrainingStatus);
        statusTexts.push(getPersonalTrainingStatusText(false, inJointTrainingStatus));
      }
    } else {
      // персональные - отправленные запросы тренерам
      isShowRequestStatus = !!personalTrainingStatus;
      statusTexts.push(addStatusText(getBaseRequestText(true), personalTrainingStatus));
    }
  } else {
    // для тренера смотрим только personalTrainingStatus
    isShowRequestStatus = !!personalTrainingStatus;
    isShowRequestButtons = isPendingTrainingRequestStatus(personalTrainingStatus);
    statusTexts.push(getPersonalTrainingStatusText(true, personalTrainingStatus));
  }

  //! отладка
  const currentUserId = useAppSelector(getUserId);
  // eslint-disable-next-line no-console
  console.log('ThumbnailFriend');
  // eslint-disable-next-line no-console
  console.log('currentUserId', currentUserId);
  // eslint-disable-next-line no-console
  console.log('isSportsmanUser', isSportsmanUser);
  // eslint-disable-next-line no-console
  console.log('id', id);
  // eslint-disable-next-line no-console
  console.log('isSportsman', isSportsman);
  // eslint-disable-next-line no-console
  console.log('outJointTrainingStatus', outJointTrainingStatus);
  // eslint-disable-next-line no-console
  console.log('inJointTrainingStatus', inJointTrainingStatus);
  // eslint-disable-next-line no-console
  console.log('personalTrainingStatus', personalTrainingStatus);
  // eslint-disable-next-line no-console
  console.log('-------------------');
  //!

  const handleInviteButtonClick = () => {
    //! тут обработать ответ и поменять содержимое массива

    // eslint-disable-next-line no-console
    console.log('handleInviteButtonClick');
  };

  const handleAcceptButtonClick = () => {
    //! тут обработать ответ и поменять содержимое массива

    // eslint-disable-next-line no-console
    console.log('handleAcceptButtonClick');
  };

  const handleRejectButtonClick = () => {
    //! тут обработать ответ и поменять содержимое массива

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
            texts={statusTexts}
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
