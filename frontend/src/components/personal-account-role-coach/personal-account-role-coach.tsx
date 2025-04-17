import ThumbnailLink from '../thumbnail-link/thumbnail-link';
import ThumbnailSpecGym from '../thumbnail-spec-gym/thumbnail-spec-gym';

import { AppRoute } from '../../const';
import CertificateCard from '../certificate-card/certificate-card';

const MOCK_CERTIFICATES = [
  {
    title: 'Сертификат - Биомеханика ударов в боксе',
    filePath: 'img/content/certificates-and-diplomas/certificate-1.jpg',
    isEditing: true
  },
  {
    title: 'Сертификат - Организационно-методическая подготовка и проведение групповых и индивидуальных физкультурно-оздоровительных занятий',
    filePath: 'img/content/certificates-and-diplomas/certificate-2.jpg',
    isEditing: false
  },
  {
    title: 'Сертифиционный курс по кроссфиту 2-го уровня',
    filePath: 'img/content/certificates-and-diplomas/certificate-3.jpg',
    isEditing: false
  },
  {
    title: 'Сертификат инструкторов йоги',
    filePath: 'img/content/certificates-and-diplomas/certificate-4.jpg',
    isEditing: false
  },
  {
    title: 'Сертификат фитне аэробики',
    filePath: 'img/content/certificates-and-diplomas/certificate-5.jpg',
    isEditing: false
  },
  {
    title: 'Сертификат фитне аэробики',
    filePath: 'img/content/certificates-and-diplomas/certificate-6.jpg',
    isEditing: false
  }
];

function PersonalAccountRoleCoach(): JSX.Element {
  //! удалить моки
  //! сделать в слайдер
  //! реализовать логику

  return (
    <div className="inner-page__content">
      <div className="personal-account-coach">
        <div className="personal-account-coach__navigation">
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
          <div className="personal-account-coach__calendar">
            <ThumbnailSpecGym text='Скоро тут будет интересно' />
          </div>
        </div>
        <div className="personal-account-coach__additional-info">
          <div className="personal-account-coach__label-wrapper">
            <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
            <button className="btn-flat btn-flat--underlined personal-account-coach__button" type="button">
              <svg width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-import"></use>
              </svg><span>Загрузить</span>
            </button>
            <div className="personal-account-coach__controls">
              <button className="btn-icon personal-account-coach__control" type="button" aria-label="previous">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button className="btn-icon personal-account-coach__control" type="button" aria-label="next">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="personal-account-coach__list">
            {
              MOCK_CERTIFICATES.map(
                (item) => (
                  <li className="personal-account-coach__item" key={item.filePath}>
                    <CertificateCard {...item} />
                  </li>
                )
              )
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PersonalAccountRoleCoach;
