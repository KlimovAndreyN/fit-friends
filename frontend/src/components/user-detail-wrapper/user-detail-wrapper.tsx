import { Fragment, MouseEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { IDetailUserProfileRdo, isCoachRole } from '@backend/shared/core';

import UserPhoto from '../user-photo/user-photo';
import Hashtags from '../hashtags/hashtags';
import UserDetailGallary from '../user-detail-gallary/user-detail-gallary';
import UserDetailStatus from '../user-detail-status/user-detail-status';
import UserDetailCoachTrainingBlock from '../user-detail-coach-training-block/user-detail-coach-training-block';
import PopupModal from '../popup-modal/popup-modal';

import { LocationTitle, SpecializationTitle } from '../../const';

type UserDetailWrapperProps = {
  classNamePrefix: string;
  detailUserProfile: IDetailUserProfileRdo;
}

function UserDetailWrapper({ classNamePrefix, detailUserProfile }: UserDetailWrapperProps): JSX.Element {
  //! кнопка - показать сертификаты
  //! кнопка - добавить в друзья
  //! возможно отдельный компонет Location, где иконка #icon-location
  //    нет css для user-card__icon-location / user-card-coach__icon-location / user-card-coach-2__icon-location, но в svg выставлено
  //! просмотр карты с местоположением - обработка клика в Location карта href={`${pathname}#popup-user-map.html`}
  //! проверить консоль браузера на ошибки
  //! проверить разметку
  // добавил UserPhoto

  const { pathname } = useLocation();
  const { user: { id: userId, role, name, avatarFilePath, location, about, backgroundPath }, questionnaire: { readyForTraining, specializations, description } } = detailUserProfile;
  const [showCertificates, setShowCertificates] = useState(false);
  const isCoach = isCoachRole(role);
  const specializationsTitles = specializations.map(
    (specialization) => (SpecializationTitle[specialization].toLocaleLowerCase())
  );

  const handleLocationLinkClick = (event: MouseEvent) => {
    event.preventDefault();

    //! отладка
    // eslint-disable-next-line no-console
    console.log('handleLocationLinkClick');
  };

  const handleShowCertificatesButtonClick = (event: MouseEvent) => {
    event.preventDefault();

    setShowCertificates(true);
    //! отладка
    // eslint-disable-next-line no-console
    console.log('handleShowCertificatesButtonClick');
  };

  const handleAddFriendButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    //! отладка
    // eslint-disable-next-line no-console
    console.log('handleAddFriendButtonClick');
  };

  const content = (
    <Fragment>
      <div className={`${classNamePrefix}__content`}>
        <UserPhoto className={`${classNamePrefix}__head`} size={80} path={avatarFilePath} />
        <div className={`${classNamePrefix}__head`}>
          <h2 className={`${classNamePrefix}__title`}>{name}</h2>
        </div>
        <div className={`${classNamePrefix}__label`}>
          <a href={`${pathname}#popup-user-map.html`} onClick={handleLocationLinkClick}>
            <svg className={`${classNamePrefix}__icon-location`} width="12" height="14" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <span>{LocationTitle[location]}</span>
          </a>
        </div>
        <UserDetailStatus isSportsman={!isCoach} readyForTraining={readyForTraining} />
        <div className={`${classNamePrefix}__text`}>
          <p>{about}</p>
          {(description) && <p>{description}</p>}
        </div>
        {
          isCoach &&
          <button className={`btn-flat ${classNamePrefix}__sertificate`} type="button" onClick={handleShowCertificatesButtonClick}>
            <svg width="12" height="13" aria-hidden="true">
              <use xlinkHref="#icon-teacher"></use>
            </svg>
            <span>Посмотреть сертификаты</span>
          </button>
        }
        <Hashtags
          classNamePrefix={`${classNamePrefix}__hashtag`}
          items={specializationsTitles}
          isNotNeedSpecialClassName
        />
        <button className={`btn ${classNamePrefix}__btn`} type="button" onClick={handleAddFriendButtonClick}>Добавить в друзья</button>
      </div>
      <UserDetailGallary classNamePrefix={classNamePrefix} filesPaths={[backgroundPath]} />
    </Fragment>
  );
  const popupCertificatesContent = (
    <Fragment>
      <div className="popup__slider-buttons">
        <button className="btn-icon popup__slider-btn popup__slider-btn--prev" type="button" aria-label="prev">
          <svg width="16" height="14" aria-hidden="true">
            <use xlinkHref="#arrow-left" />
          </svg>
        </button>
        <button className="btn-icon popup__slider-btn popup__slider-btn--next" type="button" aria-label="next">
          <svg width="16" height="14" aria-hidden="true">
            <use xlinkHref="#arrow-right" />
          </svg>
        </button>
      </div>
      <ul className="popup__slider-list">
        <li className="popup__slide popup__slide--current">
          <div className="popup__slide-img">
            <picture>
              <img src="img/content/popup/popup-slide01.jpg" width="294" height="360" alt="Сертификат Ивановой Валерии, присвоена квалификация тренер по фитнесу." />
            </picture>
          </div>
        </li>
      </ul>
    </Fragment>
  );

  return (
    <div className={`${classNamePrefix}__wrapper`}>
      {
        showCertificates &&
        <PopupModal title='Сертификаты' hiddenTitle='Слайдер с сертификатами.' content={popupCertificatesContent} onClose={() => {
          //! отладка
          // eslint-disable-next-line no-console
          console.log('');
        }}
        />
      }
      {
        isCoach
          ? <div className={`${classNamePrefix}__card`}>{content}</div>
          : content
      }
      {isCoach && <UserDetailCoachTrainingBlock classNamePrefix={classNamePrefix} userId={userId} />}
    </div>
  );
}

export default UserDetailWrapper;
