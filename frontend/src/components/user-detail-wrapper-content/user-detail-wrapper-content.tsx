import { JSX } from 'react';

import { IDetailUserProfileRdo, isCoachRole } from '@backend/shared/core';

import Hashtags from '../hashtags/hashtags';
import UserDetailWrapperContentHead from '../user-detail-wrapper-content-head/user-detail-wrapper-content-head';
import UserDetailWrapperContentCoachCertificates from '../user-detail-wrapper-content-coach-certificates copy/user-detail-wrapper-content-coach-certificates';
import UserDetailWrapperContentFriendButton from '../user-detail-wrapper-content-friend-button/user-detail-wrapper-content-friend-button';

import { getSpecializationsTitles } from '../../utils/common';

type UserDetailWrapperContentProps = {
  classNamePrefix: string;
  detailUserProfile: IDetailUserProfileRdo;
}

function UserDetailWrapperContent({ classNamePrefix, detailUserProfile }: UserDetailWrapperContentProps): JSX.Element {
  const {
    user: { id, role },
    questionnaire: { specializations, certificates = [] }
  } = detailUserProfile;
  const isCoach = isCoachRole(role);

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
      <UserDetailWrapperContentFriendButton userId={id} classNamePrefix={classNamePrefix} />
    </div>
  );
}

export default UserDetailWrapperContent;
