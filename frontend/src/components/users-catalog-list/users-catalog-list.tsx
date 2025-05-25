import { JSX, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { isSportsmanRole, Location, Role, Specialization } from '@backend/shared/core';

import Hashtags from '../hashtags/hashtags';

import { getUserRoute } from '../../utils/common';
import { LocationTitle, SpecializationTitle } from '../../const';

const MOCK_USERS = [
  {
    id: '1',
    role: Role.Sportsman,
    avatarFilePath: 'img/content/thumbnails/user-01.jpg',
    name: 'Елизавета',
    location: Location.Petrogradskaya,
    specializations: [
      Specialization.Aerobics,
      Specialization.Boxing,
      Specialization.Pilates
    ]
  },
  {
    id: '2',
    role: Role.Sportsman,
    avatarFilePath: 'img/content/thumbnails/user-02.jpg',
    name: 'Name2',
    location: Location.Sportivnaya,
    specializations: [
      Specialization.Aerobics,
      Specialization.Boxing
    ]
  },
  {
    id: '3',
    role: Role.Coach,
    avatarFilePath: 'img/content/thumbnails/user-03.jpg',
    name: 'Name3',
    location: Location.Udelnaya,
    specializations: [
      Specialization.Aerobics,
      Specialization.Boxing,
      Specialization.Stretching
    ]
  }
];

/*
type UsersCatalogListProps = {
  className: string;
  trainings: ITrainingRdo[];
  isHaveMoreTrainings: boolean;
  onNextPageClick: () => void;
}
*/

function UsersCatalogList(): JSX.Element {
  //function UsersCatalogList(props: UsersCatalogListProps): JSX.Element {

  //! карточки пользователей похожи на карточки в слайдере на главной - попробовать объеденить

  //! временно
  const users = MOCK_USERS;
  //
  /*
    const { className, trainings, isHaveMoreTrainings, onNextPageClick } = props;

    const handleShowMoreClick = () => {
      onNextPageClick();
    };
  */

  const usersListItems = users.map(({ id, role, name, avatarFilePath, location, specializations }) => (
    <li className="users-catalog__item" key={id}>
      <div className={`thumbnail-user thumbnail-user--role-${isSportsmanRole(role) ? 'user' : 'coach'}`}>
        <div className="thumbnail-user__image">
          <picture>
            <img src={avatarFilePath} width="82" height="82" alt="" />
          </picture>
        </div>
        <div className="thumbnail-user__header">
          <h3 className="thumbnail-user__name">{name}</h3>
          <div className="thumbnail-user__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-user__location-address">{LocationTitle[location]}</address>
          </div>
        </div>
        <Hashtags
          classNamePrefix='thumbnail-user'
          divItemClassNamePrefix='thumbnail-user'
          items={specializations.map(
            (specialization) => (SpecializationTitle[specialization].toLocaleLowerCase())
          )}
        />
        <Link className="btn btn--medium thumbnail-user__button" to={getUserRoute(id)}>Подробнее</Link>
      </div>
    </li>
  ));

  return (
    <div className="inner-page__content">
      <div className="users-catalog">
        {
          (users.length) ?
            <Fragment>
              <ul className="users-catalog__list" >
                {usersListItems}
              </ul>
              <div className="show-more users-catalog__show-more">
                <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
                <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
              </div>
            </Fragment>
            :
            <Fragment>
              <br />
              <br />
              <h3 className='user-catalog-form__title' style={{ textAlign: 'center' }}>Пользователи не найдены</h3>
            </Fragment>
        }
      </div>
    </div>
  );
}

export default UsersCatalogList;
