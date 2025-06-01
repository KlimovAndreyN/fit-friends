import { JSX, MouseEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsFriendUserProfile, getIsFriendUserProfileChangeExecuting } from '../../store/user-profile-process/selectors';
import { changeIsFriendUserProfile } from '../../store/actions/user-profile-action';

type UserDetailWrapperContentFriendButtonProps = {
  classNamePrefix: string;
  userId: string;
}

function UserDetailWrapperContentFriendButton({ classNamePrefix, userId }: UserDetailWrapperContentFriendButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isFriendUserProfileChangeExecuting = useAppSelector(getIsFriendUserProfileChangeExecuting);
  const isFriendUserProfile = useAppSelector(getIsFriendUserProfile);
  const addFriendButtonCaption = (isFriendUserProfile) ? 'Удалить из\u00A0друзей' : 'Добавить в\u00A0друзья';

  const handleAddFriendButtonClick = (event: MouseEvent) => {
    event.preventDefault();

    dispatch(changeIsFriendUserProfile({ userId, isFriend: !isFriendUserProfile }));
  };

  return (
    <button
      className={`btn ${classNamePrefix}__btn`}
      type="button"
      onClick={handleAddFriendButtonClick}
      disabled={isFriendUserProfileChangeExecuting}
    >
      {addFriendButtonCaption}
    </button>
  );
}

export default UserDetailWrapperContentFriendButton;
