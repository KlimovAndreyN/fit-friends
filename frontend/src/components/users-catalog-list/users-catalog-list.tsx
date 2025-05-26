import { JSX, Fragment } from 'react';

import { IUserProfileRdo, Location, Role, Specialization } from '@backend/shared/core';

import ThumbnailUser from '../thumbnail-user/thumbnail-user';

const MOCK_USERS: IUserProfileRdo[] = [
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

type UsersCatalogListProps = {
  users: IUserProfileRdo[];
  isHaveMoreUsers: boolean;
  onNextPageClick: () => void;
}

function UsersCatalogList(props: UsersCatalogListProps): JSX.Element {
  //! Частично функциональность пересекается с каталогом тернировок - подумать как объеденить
  //    Логика: Фильтр -> Обновление данных -> Список
  //    Показать еще
  //    Вернутся в начало

  //! временно
  const users = MOCK_USERS;
  //
  const { users: users0, isHaveMoreUsers, onNextPageClick } = props;
  // eslint-disable-next-line no-console
  console.log('users0', users0);

  const handleShowMoreClick = () => {
    onNextPageClick();
  };

  return (
    <div className="inner-page__content">
      <div className="users-catalog">
        {
          (users.length) ?
            <Fragment>
              <ul className="users-catalog__list" >
                {
                  users.map((user) => (
                    <li className="users-catalog__item" key={user.id}>
                      <ThumbnailUser userProfile={user} isUseCoachClassName />
                    </li>))
                }
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
