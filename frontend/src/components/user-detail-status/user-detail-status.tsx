import { JSX } from 'react';
import classNames from 'classnames';

import { isSportsmanRole, Role } from '@backend/shared/core';

import { getReadyTraining } from '../../utils/common';

type UserDetailStatusProps = {
  role: Role;
  readyForTraining: boolean;
}

function UserDetailStatus({ role, readyForTraining }: UserDetailStatusProps): JSX.Element {
  //! напутано с разметкой....
  //    'user-card-coach-2__status user-card-coach-2__status--check' серое
  //    'user-card-coach__status user-card-coach__status--check' зелёное
  //  у спортсмена тоже не то
  //    'user-card__status user-card__status--check' зелёное
  //    'user-card__status' зелёное
  //  а у 'user-card-coach-2__status user-card-coach-2__status--check' серое - нет - margin-bottom: 35px;
  //    добавил в style
  //  classNamePrefix исключил из пропсов

  const isSportsman = isSportsmanRole(role);
  const mainClassNamePrefix = (isSportsman) ? 'user-card' : 'user-card-coach';
  const classNamePrefix = (readyForTraining) ? mainClassNamePrefix : 'user-card-coach-2';
  const divMainClassName = `${classNamePrefix}__status`;
  const divCheckClassName = `${divMainClassName}--check`;

  const content = (
    <div className={classNames(divMainClassName, divCheckClassName)} style={{ marginBottom: (isSportsman && !readyForTraining) ? '35px' : undefined }}>
      <span>{getReadyTraining(role, readyForTraining)}</span>
    </div>
  );

  return (
    (isSportsman)
      ?
      content
      :
      <div className={`${classNamePrefix}__status-container`}>
        <div className={`${classNamePrefix}__status ${classNamePrefix}__status--tag`}>
          <svg className={`${classNamePrefix}__icon-cup`} width="12" height="13" aria-hidden="true">
            <use xlinkHref="#icon-cup"></use>
          </svg>
          <span>Тренер</span>
        </div>
        {content}
      </div>
  );
}

export default UserDetailStatus;
