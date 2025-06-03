import { JSX, Fragment } from 'react';

import { IDetailUserProfileRdo, isCoachRole } from '@backend/shared/core';

import UserDetailWrapperGallary from '../user-detail-wrapper-gallary/user-detail-wrapper-gallary';
import UserDetailCoachTrainingBlock from '../user-detail-coach-training-block/user-detail-coach-training-block';
import UserDetailWrapperContent from '../user-detail-wrapper-content/user-detail-wrapper-content';

type UserDetailWrapperProps = {
  detailUserProfile: IDetailUserProfileRdo;
}

function UserDetailWrapper({ detailUserProfile }: UserDetailWrapperProps): JSX.Element {
  const {
    user: { id: userId, role, backgroundPath },
    questionnaire: { readyForTraining, individualTraining }
  } = detailUserProfile;
  const isCoach = isCoachRole(role);
  const mainClassName = (isCoach) ? `user-card-coach${(individualTraining) ? '-2' : ''}` : 'user-card';

  const content = (
    <Fragment>
      <UserDetailWrapperContent classNamePrefix={mainClassName} detailUserProfile={detailUserProfile} />
      <UserDetailWrapperGallary classNamePrefix={mainClassName} filesPaths={[backgroundPath]} />
    </Fragment>
  );

  return (
    <div className="inner-page__content">
      <section className={mainClassName}>
        <h1 className="visually-hidden">{`Карточка пользователя${(isCoach) ? ' роль тренер' : ''}`}</h1>
        <div className={`${mainClassName}__wrapper`}>
          {
            isCoach
              ? <div className={`${mainClassName}__card`}>{content}</div>
              : content
          }
          {
            isCoach &&
            <UserDetailCoachTrainingBlock
              classNamePrefix={mainClassName}
              userId={userId}
              readyForTraining={readyForTraining}
              individualTraining={individualTraining}
            />
          }
        </div>
      </section>
    </div>
  );
}

export default UserDetailWrapper;
