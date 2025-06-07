import { JSX, Fragment } from 'react';

import Header from '../../components/header/header';
import FriendsList from '../../components/friends-list/friends-list';
import BackButton from '../../components/back-button/back-button';

import { PageTitle } from '../../const';

function Friends(): JSX.Element {
  const mainClassName = 'friends-list';

  return (
    <Fragment>
      <Header title={PageTitle.Friends} />
      <main>
        <section className={mainClassName}>
          <div className="container">
            <div className={`${mainClassName}__wrapper`}>
              <BackButton className={`${mainClassName}__back`} />
              <div className={`${mainClassName}__title-wrapper`}>
                <h1 className={`${mainClassName}__title`}>Мои друзья</h1>
                {/* //! закоментировано в маркапах? есть компонет CustomCheckbox
                <!--<div className="custom-toggle custom-toggle--switch custom-toggle--switch-right" data-validate-type="checkbox"><label><input type="checkbox" value="user-agreement-1" name="user-agreement"><span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true"><use xlinkHref="#arrow-check"/></svg></span><span className="custom-toggle__label">Только онлайн</span></label></div>--> */}
              </div>
              <FriendsList className={mainClassName} />
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export default Friends;
