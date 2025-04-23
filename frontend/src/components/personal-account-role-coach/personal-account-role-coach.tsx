import { ICertificateRdo } from '@backend/shared/core';

import ThumbnailLink from '../thumbnail-link/thumbnail-link';
import ThumbnailSpecGym from '../thumbnail-spec-gym/thumbnail-spec-gym';
import CoachCertificates from '../coach-certificates/coach-certificates';

import { AppRoute } from '../../const';

type PersonalAccountRoleCoachProps = {
  certificates?: ICertificateRdo[];
}

function PersonalAccountRoleCoach({ certificates = [] }: PersonalAccountRoleCoachProps): JSX.Element {
  const classNamePrefix = 'personal-account-coach';

  return (
    <div className="inner-page__content">
      <div className={classNamePrefix}>
        <div className={`${classNamePrefix}__navigation`}>
          <ThumbnailLink title='Мои тренировки' svg='#icon-flash' to={AppRoute.MyTrainings} />
          <ThumbnailLink title='Создать тренировку' svg='#icon-add' to={AppRoute.CreateTraining} />
          <ThumbnailLink title='Мои друзья' svg='#icon-friends' to={AppRoute.Friends} />
          <ThumbnailLink title='Мои заказы' svg='#icon-bag' to={AppRoute.MyOrders} />
          <div className={`${classNamePrefix}__calendar`}>
            <ThumbnailSpecGym text='Скоро тут будет интересно' />
          </div>
        </div>
        <CoachCertificates classNamePrefix={classNamePrefix} certificates={certificates} />
      </div>
    </div>
  );
}

export default PersonalAccountRoleCoach;
