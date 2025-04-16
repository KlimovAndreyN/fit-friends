import { Link } from 'react-router-dom';

import { IUserProfileRdo } from '@backend/shared/core';

import SliderSection from '../slider-section/slider-section';
import UserPhoto from '../user-photo/user-photo';

import { getUserRoute } from '../../utils/common';
import { AppRoute, LocationTitle, SpecializationTitle } from '../../const';

const SLIDES_COUNT = 4;
const USER_PHOTO_SIZE = 82;

type LookForCompanySectionProps = {
  userProfiles: IUserProfileRdo[];
}

function LookForCompanySection({ userProfiles }: LookForCompanySectionProps): JSX.Element {
  //! 'Смотреть все' - направил на "Друзья", нужно что то другое? - наверное будет в 3 части
  //! что показывать если пользователй меньше 4? что по ТЗ?
  //! перепроверить разметку, шрифты, рус и eng
  //! выделить thumbnail-user__hashtags-list, еще есть у карточер трнировок thumbnail-training__hashtags-list и в самой тренировке training-info__list
  //! проверить консоль браузера на ошибки

  const childrens = userProfiles.map(
    (user) => {
      const { id, name, avatarFilePath, location, specializations } = user;

      return (
        <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark" key={id}>
          <UserPhoto path={avatarFilePath} className='thumbnail-user__image' size={USER_PHOTO_SIZE} />
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
              <address className="thumbnail-user__location-address">{LocationTitle[location]}</address>
            </div>
          </div>
          <ul className="thumbnail-user__hashtags-list">
            {
              specializations.map(
                (specialization) => (
                  <li className="thumbnail-user__hashtags-item" key={specialization}>
                    <div className="hashtag thumbnail-user__hashtag"><span>#{SpecializationTitle[specialization].toLocaleLowerCase()}</span></div>
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
      showAllLink={AppRoute.UsersCatalog}
      isShowAllLight
      sectionClassName='look-for-company'
      slidesCount={SLIDES_COUNT}
      childrens={childrens}
    />
  );
}

export default LookForCompanySection;
