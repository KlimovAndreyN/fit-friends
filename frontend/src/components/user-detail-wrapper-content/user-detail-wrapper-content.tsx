import { JSX, MouseEvent } from 'react';

import { IDetailUserProfileRdo, isCoachRole } from '@backend/shared/core';

import Hashtags from '../hashtags/hashtags';
import UserDetailWrapperContentHead from '../user-detail-wrapper-content-head/user-detail-wrapper-content-head';
import UserDetailWrapperContentCoachCertificates from '../user-detail-wrapper-content-coach-certificates copy/user-detail-wrapper-content-coach-certificates';

import { getSpecializationsTitles } from '../../utils/common';

type UserDetailWrapperContentProps = {
  classNamePrefix: string;
  detailUserProfile: IDetailUserProfileRdo;
}

function UserDetailWrapperContent({ classNamePrefix, detailUserProfile }: UserDetailWrapperContentProps): JSX.Element {
  //! кнопка - добавить в друзья

  const {
    user: { role },
    questionnaire: { specializations, certificates = [] }
  } = detailUserProfile;
  const isCoach = isCoachRole(role);

  const handleAddFriendButtonClick = (event: MouseEvent) => {
    event.preventDefault();

    //! отладка
    // eslint-disable-next-line no-console
    console.log('handleAddFriendButtonClick');
  };

  return (
    <div className={`${classNamePrefix}__content`}>
      <UserDetailWrapperContentHead classNamePrefix={classNamePrefix} detailUserProfile={detailUserProfile} />
      {
        isCoach &&
        <UserDetailWrapperContentCoachCertificates classNamePrefix={classNamePrefix} certificates={certificates} />
      }
      <Hashtags
        items={getSpecializationsTitles(specializations)}
        listClassName={`${classNamePrefix}__hashtag-list`}
        itemClassName={`${classNamePrefix}__hashtag-item`}
      />
      <button
        className={`btn ${classNamePrefix}__btn`}
        type="button"
        onClick={handleAddFriendButtonClick}
      >
        Добавить в друзья
      </button>
    </div>
  );
}

export default UserDetailWrapperContent;
