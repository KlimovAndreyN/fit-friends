import { Link } from 'react-router-dom';

import { IUserProfileRdo } from '@backend/shared/core';

import SliderSection from '../slider-section/slider-section';

import { getUserRoute } from '../../utils/common';
import { MOCK_USERS } from '../../mock';
import { AppRoute } from '../../const';

const SLIDES_COUNT = 4;

type LookForCompanySectionProps = {
  userProfiles: IUserProfileRdo[];
}

function LookForCompanySection({ userProfiles }: LookForCompanySectionProps): JSX.Element {
  //! 'Смотреть все' - нужен раздел? - пока на корень!
  //! перепроверить разметку, шрифты, рус и eng
  //! проверить консоль браузера на ошибки

  //! временно! отладка!
  // eslint-disable-next-line no-console
  console.log('LookForCompanySection - userProfiles', userProfiles);

  const users = MOCK_USERS;
  const childrens = users.map(
    (user) => {
      const { id, name, avatarPath, location, specializations } = user;

      return (
        <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark" key={id}>
          <div className="thumbnail-user__image">
            <picture>
              <img src={avatarPath} width="82" height="82" alt="" />
            </picture>
          </div>
          {/*
            //! закоментировано в маркапах
            <!--<div className="thumbnail-user__top-status thumbnail-user__top-status--role-user">
              <svg width="12" height="12" aria-hidden="true">
                <use xlinkHref="#icon-crown"></use>
              </svg>
            </div>-->
            */}
          <div className="thumbnail-user__header">
            <h3 className="thumbnail-user__name">{name}</h3>
            <div className="thumbnail-user__location">
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-location"></use>
              </svg>
              <address className="thumbnail-user__location-address">{location}</address>
            </div>
          </div>
          <ul className="thumbnail-user__hashtags-list">
            {
              specializations.map(
                (specialization) => (
                  <li className="thumbnail-user__hashtags-item" key={specialization}>
                    <div className="hashtag thumbnail-user__hashtag"><span>#{specialization.toLocaleLowerCase()}</span></div>
                  </li>
                )
              )
            }
          </ul>
          <Link className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button" to={getUserRoute(id)}>Подробнее</Link>
        </div>
      );
    }
  );

  return (
    <SliderSection
      title='Ищут компанию для тренировки'
      showAllLink={AppRoute.Index}
      isShowAllLight
      sectionClassName='look-for-company'
      slidesCount={SLIDES_COUNT}
      childrens={childrens}
    />
  );
}

export default LookForCompanySection;
