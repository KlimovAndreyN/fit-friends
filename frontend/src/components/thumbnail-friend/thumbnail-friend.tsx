import { JSX } from 'react';
import classNames from 'classnames';

import { isSportsmanRole, Role } from '@backend/shared/core';

import ThumbnailFriendHeader from '../thumbnail-friend-header/thumbnail-friend-header';

import { getReadyTraining } from '../../utils/common';
import { Friend, isPendingTrainingRequestStatus } from '../../const';

type ThumbnailFriendProps = {
  className: string;
  friend: Friend;
  userRole: Role;
}

function ThumbnailFriend({ className, friend, userRole }: ThumbnailFriendProps): JSX.Element {
  //! проверить консоль браузера на ошибки

  const { id, name, avatarFilePath, role, location, specializations, readyForTraning, outJointTrainingStatus, inMyJointTrainingStatus, personalTrainingStatus } = friend;
  const isSportsmanUser = isSportsmanRole(userRole);
  const isSportsman = isSportsmanRole(role);
  const readyTitle = getReadyTraining(role, readyForTraning); //! в маркапах у тренера такие же заголовки тренар, я сделал разные, как на остальных страницах
  const mainClassName = 'thumbnail-friend';
  const mainDivClassName = classNames(`${mainClassName}__info`, `${mainClassName}__info--${(isSportsman) ? 'theme-light' : 'theme-dark'}`);
  const divReadyClassName = `${mainClassName}__ready-status`;
  const divRequestClassName = `${mainClassName}__request-status`;

  const hendleInviteButtonClick = () => {
    // eslint-disable-next-line no-console
    console.log('hendleInviteButtonClick');
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
          <div className={`${mainClassName}__activity-bar`}>
            <div className={classNames(divReadyClassName, `${divReadyClassName}--${(readyForTraning) ? 'is-ready' : 'is-not-ready'}`)}>
              <span>{readyTitle}</span>
            </div>
            {
              isSportsmanUser && isSportsman && readyForTraning &&
              <button
                className={classNames(`${mainClassName}__invite-button`, { 'is-disabled': isPendingTrainingRequestStatus(outJointTrainingStatus) })}
                type="button"
                onClick={hendleInviteButtonClick}
              >
                <svg width="43" height="46" aria-hidden="true" focusable="false">
                  <use xlinkHref="#icon-invite" />
                </svg>
                <span className="visually-hidden">Пригласить друга на совместную тренировку</span>
              </button>
            }
          </div>
        </div>
        {
          (isSportsmanUser && inMyJointTrainingStatus || !isSportsmanUser && personalTrainingStatus) &&
          <div className={`${divRequestClassName} ${divRequestClassName}--role-user`}>
            <p className="thumbnail-friend__request-text">Запрос на&nbsp;совместную тренировку</p>
            <div className="thumbnail-friend__button-wrapper">
              <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button">Принять</button>
              <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button">Отклонить</button>
            </div>
          </div>
        }
      </div>
    </li>
  );
}

export default ThumbnailFriend;
