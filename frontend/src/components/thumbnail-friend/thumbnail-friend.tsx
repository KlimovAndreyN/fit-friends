import { JSX } from 'react';
import classNames from 'classnames';

import { IFriendRdo, isPendingTrainingRequestStatus, isSportsmanRole, Role, TrainingRequestStatus } from '@backend/shared/core';

import ThumbnailFriendHeader from '../thumbnail-friend-header/thumbnail-friend-header';
import ThumbnailFriendActivityBar from '../thumbnail-friend-activity-bar/thumbnail-friend-activity-bar';
import ThumbnailFriendRequestStatus from '../thumbnail-friend-request-status/thumbnail-friend-request-status';

import { useAppSelector } from '../../hooks';
import { getUserId } from '../../store/user-process/selectors';

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

  // определим что показывать
  let isShowRequestStatus = false;
  let isShowRequestButtons = false;
  let statusText = '';

  if (isSportsmanUser) {
    // для спортсмена
    isShowRequestStatus = false;
    isShowRequestButtons = false;
    statusText = '';
  } else {
    // для тренера смотрим только personalTrainingStatus
    isShowRequestStatus = !!personalTrainingStatus;
    isShowRequestButtons = isPendingTrainingRequestStatus(personalTrainingStatus);

    const status = 'Запрос на\u00A0персональную тренировку';

    switch (personalTrainingStatus) {
      case TrainingRequestStatus.Pending:
        statusText = status;
        break;
      case TrainingRequestStatus.Accepted:
        statusText = `Вы приняли ${status.toLocaleLowerCase()}`;
        break;
      case TrainingRequestStatus.Rejected:
        statusText = `Вы отклонили ${status.toLocaleLowerCase()}`;
        break;
    }
  }
  /*
  const isShowRequestStatus = (isSportsmanUser && !!inJointTrainingStatus || !isSportsmanUser && !!personalTrainingStatus);
  const isShowRequestButtons = (
    isSportsmanUser && isPendingTrainingRequestStatus(inJointTrainingStatus)
    || !isSportsmanUser && isPendingTrainingRequestStatus(personalTrainingStatus)
  );
  const inStatusText = `Запрос на\u00A0${(isSportsmanUser) ? 'совместную' : 'персональную'} тренировку`; //! тут определить текст
  const outStatusText = `Запрос на\u00A0${(isSportsman) ? 'совместную' : 'персональную'} тренировку ...`;
  const statusText = (isSportsmanUser && outJointTrainingStatus) ? outStatusText : inStatusText;
  */

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
            text={statusText}
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
