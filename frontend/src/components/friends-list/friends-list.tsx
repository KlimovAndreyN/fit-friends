import { JSX } from 'react';

import BackButton from '../back-button/back-button';
import ButtonsShowMoreAndToTop from '../buttons-show-more-and-to-top/buttons-show-more-and-to-top';
import ThumbnailFriend from '../thumbnail-friend/thumbnail-friend';

import { MOCK_FRIENDS } from '../../const';

function FriendsList(): JSX.Element {
  //! проверить консоль браузера на ошибки
  //! вызвать в useEffect dispatch clearDetailUserProfile + setPrevLocation

  const friends = MOCK_FRIENDS;
  const isHaveMoreData = true;
  //const isHaveMoreData = false;
  const mainClassName = 'friends-list';

  const handleButtonsShowMoreAndToTopClick = () => {
    // eslint-disable-next-line no-console
    console.log('handleButtonsShowMoreAndToTopClick');
  };

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
                friends.map((friend) => (<ThumbnailFriend key={friend.id} className={mainClassName} friend={friend} />))
              }
            </ul>
            <ButtonsShowMoreAndToTop divClassNamePrefix={mainClassName} isHaveMoreData={isHaveMoreData} onShowMoreClick={handleButtonsShowMoreAndToTopClick} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default FriendsList;
