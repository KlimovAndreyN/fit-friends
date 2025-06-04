import { JSX } from 'react';
import classNames from 'classnames';

import { isSportsmanRole, Role } from '@backend/shared/core';

import { getReadyTraining } from '../../utils/common';

type ThumbnailFriendActivityBarrops = {
  classNamePrefix: string;
  isSportsmanUser: boolean;
  role: Role;
  readyForTraning: boolean;
  isDisabled: boolean;
}

function ThumbnailFriendActivityBar(props: ThumbnailFriendActivityBarrops): JSX.Element {
  const { classNamePrefix, isSportsmanUser, role, readyForTraning, isDisabled } = props;
  const isSportsman = isSportsmanRole(role);
  const readyTitle = getReadyTraining(role, readyForTraning); //! в маркапах у тренера такие же заголовки тренар, я сделал разные, как на остальных страницах
  const readyMainDivClassName = `${classNamePrefix}__ready-status`;
  const readyDivClassName = classNames(readyMainDivClassName, `${readyMainDivClassName}--${(readyForTraning) ? 'is-ready' : 'is-not-ready'}`);
  const inviteButtonClassName = classNames(
    `${classNamePrefix}__invite-button`,
    /*{ 'is-disabled': isDisabled } // совсем бледно получается, добавил кнопке disabled*/
  );

  const handleInviteButtonClick = () => {
    //! тут обработать ответ и поменять содержимое массива
    //! отключать кнопку пока идет запрос
    // может совсем выделить отдельно эту кнопку!

    // eslint-disable-next-line no-console
    console.log('handleInviteButtonClick');
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
          disabled={isDisabled}
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
