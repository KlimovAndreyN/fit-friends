import { JSX } from 'react';
import classNames from 'classnames';

import { IFriendProfileRdo, isPendingTrainingRequestStatus, isSportsmanRole, Role } from '@backend/shared/core';

import ThumbnailFriendHeader from '../thumbnail-friend-header/thumbnail-friend-header';
import ThumbnailFriendActivityBar from '../thumbnail-friend-activity-bar/thumbnail-friend-activity-bar';
import ThumbnailFriendRequestStatus from '../thumbnail-friend-request-status/thumbnail-friend-request-status';

import { addStatusText, getBaseRequestText, getPersonalTrainingStatusText } from '../../utils/common';

type ThumbnailFriendProps = {
  className: string;
  friend: IFriendProfileRdo;
  userRole: Role;
}

function ThumbnailFriend({ className, friend, userRole }: ThumbnailFriendProps): JSX.Element {
  //! проверить консоль браузера на ошибки

  const { id, name, avatarFilePath, role, location, specializations, readyForTraining, outJointTrainingRequest, inJointTrainingRequest, personalTrainingRequest } = friend;
  const isSportsmanUser = isSportsmanRole(userRole);
  const isSportsman = isSportsmanRole(role);
  const mainClassName = 'thumbnail-friend';
  const mainDivClassName = classNames(`${mainClassName}__info`, `${mainClassName}__info--${(isSportsman) ? 'theme-light' : 'theme-dark'}`);

  // определим, что показывать и для каких случаев
  let isShowRequestStatus = false;
  let isShowRequestButtons = false;
  let outStatusText = '';
  let inStatusText = '';

  if (isSportsmanUser) {
    // для спортсмена
    if (isSportsman) {
      // исходящие personalTrainingStatus
      if (outJointTrainingRequest?.status) {
        isShowRequestStatus = true;
        outStatusText = addStatusText(getBaseRequestText(), outJointTrainingRequest.status);
      }
      // входящие inJointTrainingStatus
      //! можно не объеденять с текстом для исходящего запроса
      if (inJointTrainingRequest?.status) {
        isShowRequestStatus = true;
        isShowRequestButtons = isPendingTrainingRequestStatus(inJointTrainingRequest.status);
        inStatusText = getPersonalTrainingStatusText(false, inJointTrainingRequest.status);
      }
    } else {
      // персональные - отправленные запросы тренерам
      isShowRequestStatus = !!personalTrainingRequest?.status;
      outStatusText = addStatusText(getBaseRequestText(true), personalTrainingRequest?.status);
    }
  } else {
    // для тренера смотрим только personalTrainingStatus
    isShowRequestStatus = !!personalTrainingRequest?.status;
    isShowRequestButtons = isPendingTrainingRequestStatus(personalTrainingRequest?.status);
    inStatusText = getPersonalTrainingStatusText(true, personalTrainingRequest?.status);
  }

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
            userId={id}
            role={role}
            readyForTraning={readyForTraining}
            isInviteButtonDisabled={!!outJointTrainingRequest}
          />
        </div>
        {
          isShowRequestStatus &&
          <ThumbnailFriendRequestStatus
            classNamePrefix={mainClassName}
            outStatusText={outStatusText}
            inStatusText={inStatusText}
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
