import classNames from 'classnames';

import { IDetailUserProfileRdo, isCoachRole } from '@backend/shared/core';

import UserPhoto from '../user-photo/user-photo';
import Hashtags from '../hashtags/hashtags';
import UserDetailGallary from '../user-detail-gallary/user-detail-gallary';
import UserDetailCoachTrainingBlock from '../user-detail-coach-training-block/user-detail-coach-training-block';

import { LocationTitle, SpecializationTitle } from '../../const';

type UserDetailWrapperProps = {
  classNamePrefix: string;
  detailUserProfile: IDetailUserProfileRdo;
}

function UserDetailWrapper({ classNamePrefix, detailUserProfile }: UserDetailWrapperProps): JSX.Element {
  const { user: { role, name, avatarFilePath, location, about, backgroundPath }, questionnaire: { readyForTraining, specializations, description } } = detailUserProfile;
  const isCoach = isCoachRole(role);
  const specializationsTitles = specializations.map(
    (specialization) => (SpecializationTitle[specialization].toLocaleLowerCase())
  );

  return (
    <div className={`${classNamePrefix}__wrapper`}>
      <div className={`${classNamePrefix}__card`}>
        <div className={`${classNamePrefix}__content`}>
          <UserPhoto className='' size={100} path={avatarFilePath} />
          <div className={`${classNamePrefix}__head`}>
            <h2 className={`${classNamePrefix}__title`}>{name}</h2>
          </div>
          <div className={`${classNamePrefix}__label`}>
            <a href="popup-user-map.html">
              <svg className={`${classNamePrefix}__icon-location`} width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-location"></use>
              </svg>
              <span>{LocationTitle[location]}</span>
            </a>
          </div>
          <div className={`${classNamePrefix}__status-container`}>
            {
              isCoach &&
              <div className={`${classNamePrefix}__status ${classNamePrefix}__status--tag`}>
                <svg className={`${classNamePrefix}__icon-cup`} width="12" height="13" aria-hidden="true">
                  <use xlinkHref="#icon-cup"></use>
                </svg>
                <span>Тренер</span>
              </div>
            }
            {/*напутано с разметкой.... 'user-card-coach-2__status user-card-coach-2__status--check' серое,  user-card-coach__status user-card-coach__status--check зелоное*/}
            <div className="user-card-coach__status user-card-coach__status--check"><span>Готов тренировать</span></div>
            <div className={classNames('user-card-coach-2__status', { 'user-card-coach-2__status--check': readyForTraining })}>
              <span>Готов тренировать</span>
            </div>
          </div>
          <div className={`${classNamePrefix}__text`}>
            <p>{about}</p>
            <p>{description}</p>
          </div>
          {
            isCoach &&
            <button className={`btn-flat ${classNamePrefix}__sertificate`} type="button">
              <svg width="12" height="13" aria-hidden="true">
                <use xlinkHref="#icon-teacher"></use>
              </svg><span>Посмотреть сертификаты</span>
            </button>
          }
          <Hashtags
            classNamePrefix={`${classNamePrefix}__hashtag`}
            items={specializationsTitles}
            isNotNeedSpecialClassName
          />
          <button className={`btn ${classNamePrefix}__btn`} type="button">Добавить в друзья</button>
        </div>
        <UserDetailGallary classNamePrefix={classNamePrefix} filesPaths={[backgroundPath]} />
      </div>
      {isCoach && <UserDetailCoachTrainingBlock classNamePrefix={classNamePrefix} userId={classNamePrefix} />}
    </div>
  );
}

export default UserDetailWrapper;
