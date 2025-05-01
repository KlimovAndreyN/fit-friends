import { Fragment } from 'react';
import classNames from 'classnames';

type UserDetailStatusProps = {
  classNamePrefix: string;
  isSportsman: boolean;
  readyForTraining: boolean;
}

function UserDetailStatus({ classNamePrefix, isSportsman, readyForTraining }: UserDetailStatusProps): JSX.Element {
  //! готовность к тренировкам

  const content = (
    <Fragment>
      {/*напутано с разметкой.... 'user-card-coach-2__status user-card-coach-2__status--check' серое,  user-card-coach__status user-card-coach__status--check зелоное*/}
      < div className="user-card-coach__status user-card-coach__status--check" > <span>Готов тренировать</span></div>
      <div className={classNames('user-card-coach-2__status', { 'user-card-coach-2__status--check': readyForTraining })}>
        <span>Готов тренировать</span>
      </div>
    </Fragment>
  );

  return (
    <div className={`${classNamePrefix}__status-container`}>
      {
        !isSportsman &&
        <div className={`${classNamePrefix}__status ${classNamePrefix}__status--tag`}>
          <svg className={`${classNamePrefix}__icon-cup`} width="12" height="13" aria-hidden="true">
            <use xlinkHref="#icon-cup"></use>
          </svg>
          <span>Тренер</span>
        </div>
      }
      {content}
    </div>
  );
}

export default UserDetailStatus;
