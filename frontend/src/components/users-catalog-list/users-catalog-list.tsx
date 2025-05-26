import { JSX, Fragment } from 'react';

import { IUserProfileRdo, Location, Role, Specialization } from '@backend/shared/core';

import ThumbnailUser from '../thumbnail-user/thumbnail-user';
import ButtonsShowMoreAndToTop from '../buttons-show-more-and-to-top/buttons-show-more-and-to-top';

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
  //! Функциональность пересекается с каталогом тернировок - подумать как объеденить - отображение списка
  //! вынести className = 'users-catalog'

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
              <ButtonsShowMoreAndToTop divClassNamePrefix='users-catalog' isHaveMoreData={isHaveMoreUsers} onShowMoreClick={handleShowMoreClick} />
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
