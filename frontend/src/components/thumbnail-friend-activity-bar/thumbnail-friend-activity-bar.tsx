import { JSX, MouseEvent } from 'react';
import classNames from 'classnames';

import { isSportsmanRole, Role } from '@backend/shared/core';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsCreateRequestExecuting } from '../../store/user-profile-process/selectors';
import { createTrainingRequest } from '../../store/actions/user-profile-action';
import { getReadyTraining } from '../../utils/common';

type ThumbnailFriendActivityBarProps = {
  classNamePrefix: string;
  isSportsmanUser: boolean;
  userId: string;
  role: Role;
  readyForTraning: boolean;
  isInviteButtonDisabled: boolean;
}

function ThumbnailFriendActivityBar(props: ThumbnailFriendActivityBarProps): JSX.Element {
  const { classNamePrefix, isSportsmanUser, userId, role, readyForTraning, isInviteButtonDisabled } = props;
  const dispatch = useAppDispatch();
  const isCreateRequestExecuting = useAppSelector(getIsCreateRequestExecuting);
  const isSportsman = isSportsmanRole(role);
  const readyTitle = getReadyTraining(role, readyForTraning); //! в маркапах у тренера такие же заголовки тренар, я сделал разные, как на остальных страницах
  const readyMainDivClassName = `${classNamePrefix}__ready-status`;
  const readyDivClassName = classNames(readyMainDivClassName, `${readyMainDivClassName}--${(readyForTraning) ? 'is-ready' : 'is-not-ready'}`);
  const inviteButtonClassName = classNames(
    `${classNamePrefix}__invite-button`,
    /*{ 'is-disabled': isDisabled } // совсем бледно получается, добавил кнопке disabled*/
  );

  const handleInviteButtonClick = (event: MouseEvent) => {
    event.preventDefault();

    dispatch(createTrainingRequest({ userId }));
  };

  return (
    <div className={`${classNamePrefix}__activity-bar`}>
      <div className={readyDivClassName}>
        <span>{readyTitle}</span>
      </div>
      {
        isSportsmanUser && isSportsman && readyForTraning &&
        <button
          className={inviteButtonClassName}
          type="button"
          onClick={handleInviteButtonClick}
          disabled={isInviteButtonDisabled || isCreateRequestExecuting}
        >
          <svg width="43" height="46" aria-hidden="true" focusable="false">
            <use xlinkHref="#icon-invite" />
          </svg>
          <span className="visually-hidden">Пригласить друга на совместную тренировку</span>
        </button>
      }
    </div>
  );
}

export default ThumbnailFriendActivityBar;
