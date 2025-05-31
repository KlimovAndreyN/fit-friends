import { JSX } from 'react';

import BackButton from '../back-button/back-button';
import FriendCard from '../friend-card/friend-card';

import { MOCK_FRIENDS } from '../../const';

function FriendsList(): JSX.Element {
  //! проверить консоль браузера на ошибки
  //! вызвать в useEffect dispatch clearDetailUserProfile + setPrevLocation

  const friends = MOCK_FRIENDS;
  const mainClassName = 'friends-list';

  return (
    <main>
      <section className={mainClassName}>
        <div className="container">
          <div className={`${mainClassName}__wrapper`}>
            <BackButton className={mainClassName} />
            <div className={`${mainClassName}__title-wrapper`}>
              <h1 className={`${mainClassName}__title`}>Мои друзья</h1>
              {/* //! закоментировано в маркапах? есть компонет CustomCheckbox
                <!--<div className="custom-toggle custom-toggle--switch custom-toggle--switch-right" data-validate-type="checkbox"><label><input type="checkbox" value="user-agreement-1" name="user-agreement"><span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true"><use xlinkHref="#arrow-check"/></svg></span><span className="custom-toggle__label">Только онлайн</span></label></div>--> */}
            </div>
            <ul className={`${mainClassName}__list`}>
              {
                friends.map((friend) => (<FriendCard key={friend.id} className={mainClassName} />))
              }
            </ul>
            <div className="show-more friends-list__show-more">
              <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
              <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default FriendsList;
