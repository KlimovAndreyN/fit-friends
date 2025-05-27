import { JSX } from 'react';

import { IUserProfileRdo } from '@backend/shared/core';

import SliderSection from '../slider-section/slider-section';

import { AppRoute } from '../../const';
import ThumbnailUser from '../thumbnail-user/thumbnail-user';

const USER_PRIFILES_MAX_COUNT = 8;
const SLIDES_COUNT = 4;

type LookForCompanySectionProps = {
  userProfiles: IUserProfileRdo[];
}

function LookForCompanySection({ userProfiles }: LookForCompanySectionProps): JSX.Element {

  const childrens = userProfiles.slice(0, USER_PRIFILES_MAX_COUNT)
    .map((user) => (
      <ThumbnailUser
        key={user.id}
        userProfile={user}
        extraDivClassName='thumbnail-user--dark'
        extraLinkClassName='btn--outlined btn--dark-bg'
      />
    ));

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
