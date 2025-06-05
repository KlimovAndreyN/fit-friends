import { JSX } from 'react';
import classNames from 'classnames';

import { IFriendProfileRdo, isPendingTrainingRequestStatus, isSportsmanRole, Role, TrainingRequestStatus } from '@backend/shared/core';

import ThumbnailFriendHeader from '../thumbnail-friend-header/thumbnail-friend-header';
import ThumbnailFriendActivityBar from '../thumbnail-friend-activity-bar/thumbnail-friend-activity-bar';
import ThumbnailFriendRequestStatus from '../thumbnail-friend-request-status/thumbnail-friend-request-status';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsUpdateRequestExecuting } from '../../store/user-profile-process/selectors';
import { updateTrainingRequest } from '../../store/actions/user-profile-action';
import { addStatusText, getBaseRequestText, getPersonalTrainingStatusText } from '../../utils/common';

type ThumbnailFriendProps = {
  className: string;
  friend: IFriendProfileRdo;
  userRole: Role;
}

function ThumbnailFriend({ className, friend, userRole }: ThumbnailFriendProps): JSX.Element {
  //! проверить консоль браузера на ошибки

  const { id, name, avatarFilePath, role, location, specializations, readyForTraining, outJointTrainingRequest, inJointTrainingRequest, personalTrainingRequest } = friend;
  const dispatch = useAppDispatch();
  const isUpdateRequestExecuting = useAppSelector(getIsUpdateRequestExecuting);
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

  const updateTrainingRequestStatus = (status: TrainingRequestStatus) => {
    const trainingRequestId = (isSportsmanUser) ? inJointTrainingRequest?.id : personalTrainingRequest?.id;

    if (trainingRequestId) {
      dispatch(updateTrainingRequest({ trainingRequestId, dto: { status } }));
    }
  };

  const handleAcceptButtonClick = () => {
    updateTrainingRequestStatus(TrainingRequestStatus.Accepted);
  };

  const handleRejectButtonClick = () => {
    updateTrainingRequestStatus(TrainingRequestStatus.Rejected);
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
            isDisabledButtons={isUpdateRequestExecuting}
            onAcceptButtonClick={handleAcceptButtonClick}
            onRejectButtonClick={handleRejectButtonClick}
          />
        }
      </div>
    </li>
  );
}

export default ThumbnailFriend;
