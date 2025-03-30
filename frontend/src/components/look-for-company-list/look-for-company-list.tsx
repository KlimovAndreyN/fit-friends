import { Link } from 'react-router-dom';

import { getUserRoute } from '../../utils/common';
import { MOCK_USERS } from '../../mock';

function LookForCompanyList(): JSX.Element {
  //! если аварата нет то svg с пустым пользователем от регистрации? что в ТЗ?
  //! specializations это массив? что в ТЗ? пока сделал массив... и его в русские названия переделать при отображении
  //! этот раздел с тренерами? что в ТЗ?

  return (
    <ul className="look-for-company__list">
      {
        MOCK_USERS.map(
          (user) => {
            const { id, name, avatarPath, location, specializations } = user;

            return (
              <li className="look-for-company__item" key={id}>
                <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
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
              </li>
            );
          }
        )
      }
    </ul>
  );
}

export default LookForCompanyList;
