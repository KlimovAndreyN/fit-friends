import { JSX, MouseEvent } from 'react';
import classNames from 'classnames';

import { isCoachRole } from '@backend/shared/core';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserRole } from '../../store/user-process/selectors';
import { getIsFriendUserProfile, getIsFriendUserProfileChangeExecuting } from '../../store/user-profile-process/selectors';
import { changeIsFriendUserProfile } from '../../store/actions/user-profile-action';

type UserDetailWrapperContentFriendButtonProps = {
  classNamePrefix: string;
  userId: string;
}

function UserDetailWrapperContentFriendButton({ classNamePrefix, userId }: UserDetailWrapperContentFriendButtonProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const userRole = useAppSelector(getUserRole);
  const isFriendUserProfileChangeExecuting = useAppSelector(getIsFriendUserProfileChangeExecuting);
  const isFriendUserProfile = useAppSelector(getIsFriendUserProfile);
  const buttonClassName = classNames('btn', { 'btn--outlined': isFriendUserProfile }, `${classNamePrefix}__btn`);

  if (isCoachRole(userRole) && !isFriendUserProfile) {
    return null;
  }

  const handleAddFriendButtonClick = (event: MouseEvent) => {
    event.preventDefault();

    dispatch(changeIsFriendUserProfile({ userId, isFriend: !isFriendUserProfile }));
  };

  return (
    <button
      className={buttonClassName}
      type="button"
      onClick={handleAddFriendButtonClick}
      disabled={isFriendUserProfileChangeExecuting}
    >
      {(isFriendUserProfile) ? 'Удалить из\u00A0друзей' : 'Добавить в\u00A0друзья'}
    </button>
  );
}

export default UserDetailWrapperContentFriendButton;
