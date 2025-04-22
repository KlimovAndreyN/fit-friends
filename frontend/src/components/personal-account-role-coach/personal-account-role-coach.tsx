import classNames from 'classnames';

import { ICertificateRdo } from '@backend/shared/core';

import ThumbnailLink from '../thumbnail-link/thumbnail-link';
import ThumbnailSpecGym from '../thumbnail-spec-gym/thumbnail-spec-gym';
import CertificateCard from '../certificate-card/certificate-card';
import Slider from '../slider/slider';
import SliderButton from '../slider-button/slider-button';

import { AppRoute } from '../../const';

const SLIDERS_COUNT = 3;

type PersonalAccountRoleCoachProps = {
  certificates?: ICertificateRdo[];
}

function PersonalAccountRoleCoach({ certificates = [] }: PersonalAccountRoleCoachProps): JSX.Element {
  //! реализовать логику

  const handleLoadCertificateButtonClick = () => {
    // eslint-disable-next-line no-console
    console.log('handleLoadCertificateClick');
  };

  const classNamePrefix = 'personal-account-coach';
  const loadCertificateButtonOption = {
    secondTitle: 'Загрузить',
    className: classNames('btn-flat', 'btn-flat--underlined', `${classNamePrefix}__button`),
    onClick: handleLoadCertificateButtonClick,
    xlinkHref: '#icon-import',
    width: 14,
    height: 14
  };

  const childrens: JSX.Element[] = certificates.map(
    ({ fileId, filePath, title }) => (
      <CertificateCard {...{ filePath, title, isEditing: false }} key={fileId} />
    )
  );

  return (
    <div className="inner-page__content">
      <div className={classNamePrefix}>
        <div className={`${classNamePrefix}__navigation`}>
          <ThumbnailLink
            title='Мои тренировки'
            svg='#icon-flash'
            to={AppRoute.MyTrainings}
          />
          <ThumbnailLink
            title='Создать тренировку'
            svg='#icon-add'
            to={AppRoute.CreateTraining}
          />
          <ThumbnailLink
            title='Мои друзья'
            svg='#icon-friends'
            to={AppRoute.Friends}
          />
          <ThumbnailLink
            title='Мои заказы'
            svg='#icon-bag'
            to={AppRoute.MyOrders}
          />
          <div className={`${classNamePrefix}__calendar`}>
            <ThumbnailSpecGym text='Скоро тут будет интересно' />
          </div>
        </div>
        <Slider
          title='Дипломы и сертификаты'
          isLabel
          additionalTitleElement={<SliderButton {...loadCertificateButtonOption} />}
          childrens={childrens}
          classNamePrefix={classNamePrefix}
          divClassName={`${classNamePrefix}__additional-info`}
          slidesCount={SLIDERS_COUNT}
        />
      </div>
    </div>
  );
}

export default PersonalAccountRoleCoach;
