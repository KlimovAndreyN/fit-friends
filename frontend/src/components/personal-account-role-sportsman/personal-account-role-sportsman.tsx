import { JSX } from 'react';

import ThumbnailLink from '../thumbnail-link/thumbnail-link';
import ThumbnailSpecGym from '../thumbnail-spec-gym/thumbnail-spec-gym';

import { AppRoute } from '../../const';

const DAYS_OF_WEEK = 7;

type PersonalAccountRoleSportsmanProps = {
  caloriesWaste: number;
}

function PersonalAccountRoleSportsman({ caloriesWaste }: PersonalAccountRoleSportsmanProps): JSX.Element {
  //! Калории сделал для чтения, что по ТЗ можно их менять?

  return (
    <div className="inner-page__content">
      <div className="personal-account-user">
        <div className="personal-account-user__schedule">
          <form action="#" method="get">
            <div className="personal-account-user__form">
              {
                [
                  { title: 'План на день, ккал', value: caloriesWaste },
                  { title: 'План на неделю, ккал', value: caloriesWaste * DAYS_OF_WEEK }
                ].map(
                  ({ title, value }) => (
                    <div className="personal-account-user__input" key={title}>
                      <label>
                        <span className="personal-account-user__label">{title}</span>
                        <input type="text" name="schedule-for-the-day" value={value.toLocaleString()} readOnly />
                      </label>
                    </div>
                  )
                )
              }
            </div>
          </form>
        </div>
        <div className="personal-account-user__additional-info">
          <ThumbnailLink
            title='Мои друзья'
            svg='#icon-friends'
            to={AppRoute.Friends}
          />
          <ThumbnailLink
            title='Мои покупки'
            svg='#icon-shopping-cart'
            to={AppRoute.MyPurchases}
          />
          <ThumbnailSpecGym text='Скоро тут появится что-то полезное' />
        </div>
      </div>
    </div >
  );
}

export default PersonalAccountRoleSportsman;
