import { JSX } from 'react';

type FriendCardProps = {
  className: string;
}

function FriendCard({ className }: FriendCardProps): JSX.Element {
  //! проверить консоль браузера на ошибки

  return (
    <li className={`${className}_item`} >
      <div className="thumbnail-friend">
        <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
          <div className="thumbnail-friend__image-status">
            <div className="thumbnail-friend__image">
              <picture>
                <source type="image/webp" srcSet="img/content/thumbnails/friend-08.webp, img/content/thumbnails/friend-08@2x.webp 2x" />
                <img src="img/content/thumbnails/friend-08.jpg" srcSet="img/content/thumbnails/friend-08@2x.jpg 2x" width="78" height="78" alt="" />
              </picture>
              {/* //! закоментировано в маркапах
                            <!--<div className="thumbnail-friend__online-status thumbnail-friend__online-status--is-online"></div>-->
                          */}
            </div>
          </div>
          <div className="thumbnail-friend__header">
            <h2 className="thumbnail-friend__name">Елизавета</h2>
            <div className="thumbnail-friend__location">
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-location" />
              </svg>
              <address className="thumbnail-friend__location-address">Петроградская</address>
            </div>
          </div>
          <ul className="thumbnail-friend__training-types-list">
            <li>
              <div className="hashtag thumbnail-friend__hashtag"><span>#стретчинг</span></div>
            </li>
          </ul>
          <div className="thumbnail-friend__activity-bar">
            <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready"><span>Готов к&nbsp;тренировке</span>
            </div>
            <button className="thumbnail-friend__invite-button" type="button">
              <svg width="43" height="46" aria-hidden="true" focusable="false">
                <use xlinkHref="#icon-invite" />
              </svg><span className="visually-hidden">Пригласить друга на совместную тренировку</span>
            </button>
          </div>
        </div>
        <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
          <p className="thumbnail-friend__request-text">Запрос на&nbsp;совместную тренировку</p>
          <div className="thumbnail-friend__button-wrapper">
            <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button">Принять</button>
            <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button">Отклонить</button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default FriendCard;
