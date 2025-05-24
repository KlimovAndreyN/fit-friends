import { JSX } from 'react';
import { Link } from 'react-router-dom';

import { IUserProfileRdo } from '@backend/shared/core';
import { getRandomUniqueItems } from '@backend/shared/helpers';

import SliderSection from '../slider-section/slider-section';
import UserPhoto from '../user-photo/user-photo';
import Hashtags from '../hashtags/hashtags';

import { getUserRoute } from '../../utils/common';
import { AppRoute, LocationTitle, SpecializationTitle } from '../../const';

const USER_PRIFILES_MAX_COUNT = 8;
const SLIDES_COUNT = 4;
const USER_PHOTO_SIZE = 82;

type LookForCompanySectionProps = {
  userProfiles: IUserProfileRdo[];
}

function LookForCompanySection({ userProfiles }: LookForCompanySectionProps): JSX.Element {

  const childrens = getRandomUniqueItems(userProfiles, USER_PRIFILES_MAX_COUNT).map(
    (user) => {
      const { id, name, avatarFilePath, location, specializations } = user;
      const specializationsTitles = specializations.map(
        (specialization) => (SpecializationTitle[specialization].toLocaleLowerCase())
      );

      return (
        <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark" key={id}>
          <UserPhoto path={avatarFilePath} className='thumbnail-user__image' size={USER_PHOTO_SIZE} />
          {/*
            //! закоментировано в маркапах
            <!--<div className="thumbnail-user__top-status thumbnail-user__top-status--role-user">
              <svg width="12" height="12" aria-hidden="true">
                <use xlinkHref="#icon-crown"/>
              </svg>
            </div>-->
            */}
          <div className="thumbnail-user__header">
            <h3 className="thumbnail-user__name">{name}</h3>
            <div className="thumbnail-user__location">
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-location" />
              </svg>
              <address className="thumbnail-user__location-address">{LocationTitle[location]}</address>
            </div>
          </div>
          <Hashtags classNamePrefix='thumbnail-user' divItemClassNamePrefix='thumbnail-user' items={specializationsTitles} />
          <Link className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button" to={getUserRoute(id)}>Подробнее</Link>
        </div>
      );
    }
  );

  return (
    <SliderSection
      title='Ищут компанию для тренировки'
      sectionClassName='look-for-company'
      isLightControl
      showAllLink={AppRoute.UsersCatalog}
      childrens={childrens}
      slidesCount={SLIDES_COUNT}
    />
  );
}

export default LookForCompanySection;
