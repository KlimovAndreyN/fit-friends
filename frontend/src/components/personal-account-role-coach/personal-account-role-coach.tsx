import classNames from 'classnames';

import ThumbnailLink from '../thumbnail-link/thumbnail-link';
import ThumbnailSpecGym from '../thumbnail-spec-gym/thumbnail-spec-gym';
import CertificateCard from '../certificate-card/certificate-card';
import Slider from '../slider/slider';
import SliderButton from '../slider-button/slider-button';

import { AppRoute } from '../../const';

const SLIDERS_COUNT = 3;

const MOCK_CERTIFICATES = [
  {
    id: 'id-1',
    title: 'Сертификат - Биомеханика ударов в боксе',
    filePath: 'img/content/certificates-and-diplomas/certificate-1.jpg',
    isEditing: true
  },
  {
    id: 'id-2',
    title: 'Сертификат - Организационно-методическая подготовка и проведение групповых и индивидуальных физкультурно-оздоровительных занятий',
    filePath: 'img/content/certificates-and-diplomas/certificate-2.jpg',
    isEditing: false
  },
  {
    id: 'id-3',
    title: 'Сертифиционный курс по кроссфиту 2-го уровня',
    filePath: 'img/content/certificates-and-diplomas/certificate-3.jpg',
    isEditing: false
  },
  {
    id: 'id-4',
    title: 'Сертификат инструкторов йоги',
    filePath: 'img/content/certificates-and-diplomas/certificate-4.jpg',
    isEditing: false
  },
  {
    id: 'id-5',
    title: 'Сертификат фитне аэробики',
    filePath: 'img/content/certificates-and-diplomas/certificate-5.jpg',
    isEditing: false
  },
  {
    id: 'id-6',
    title: 'Сертификат фитне аэробики',
    filePath: 'img/content/certificates-and-diplomas/certificate-6.jpg',
    isEditing: false
  }
];

type PersonalAccountRoleCoachProps = {
  //! временно
  certificates: { id: string; title: string; filePath: string; isEditing: boolean }[];
}

function PersonalAccountRoleCoach({ certificates }: PersonalAccountRoleCoachProps): JSX.Element {
  //! удалить моки
  //! реализовать логику

  const aaa = (certificates.length) ? certificates : MOCK_CERTIFICATES;

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
          childrens={aaa.map((item) => (<CertificateCard {...item} key={item.id} />))}
          classNamePrefix={classNamePrefix}
          divClassName={`${classNamePrefix}__additional-info`}
          slidesCount={SLIDERS_COUNT}
        />
      </div>
    </div>
  );
}

export default PersonalAccountRoleCoach;
