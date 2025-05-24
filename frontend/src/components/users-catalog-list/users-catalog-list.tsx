import { JSX } from 'react';

/*
type UsersCatalogListProps = {
  className: string;
  trainings: ITrainingRdo[];
  isHaveMoreTrainings: boolean;
  onNextPageClick: () => void;
  showedAdditionalDiv?: boolean;
}
*/
function UsersCatalogList(): JSX.Element {
  //function UsersCatalogList(props: UsersCatalogListProps): JSX.Element {
  /*
    const { className, trainings, isHaveMoreTrainings, onNextPageClick, showedAdditionalDiv } = props;

    const handleShowMoreClick = () => {
      onNextPageClick();
    };
  */
  /*
    const trainingsList = (
      <div className={className}>
        {
          (trainings.length)
            ?
            <Fragment>
              <ul className={`${className}__list`}>
                {
                  trainings.map(
                    (training) => (
                      <li className={`${className}__item`} key={training.id}>
                        <TrainingCard training={training} />
                      </li>
                    )
                  )
                }
              </ul>
              <TrainingsListButtons
                className={className}
                isHaveMoreTrainings={isHaveMoreTrainings}
                onShowMoreClick={handleShowMoreClick}
              />
            </Fragment>
            :
            <Fragment>
              <br />
              <br />
              <h3 className={`${className}__title`} style={{ textAlign: 'center' }}>Тренировки не найдены</h3>
            </Fragment>
        }
      </div>
    );
  */

  /*
return showedAdditionalDiv
  ?
  <div className="inner-page__content">
    {trainingsList}
  </div>
  :
  trainingsList;
  */

  return (
    <div className="inner-page__content">
      <div className="users-catalog">
        <ul className="users-catalog__list">
          <li className="users-catalog__item">
            <div className="thumbnail-user thumbnail-user--role-user">
              <div className="thumbnail-user__image">
                <picture>
                  <img src="img/content/thumbnails/user-01.jpg" srcSet="img/content/thumbnails/user-01@2x.jpg 2x" width="82" height="82" alt="" />
                </picture>
              </div>
              <div className="thumbnail-user__header">
                <h3 className="thumbnail-user__name">Елизавета</h3>
                <div className="thumbnail-user__location">
                  <svg width="14" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-location"></use>
                  </svg>
                  <address className="thumbnail-user__location-address">Петроградская</address>
                </div>
              </div>
              <ul className="thumbnail-user__hashtags-list">
                <li className="thumbnail-user__hashtags-item">
                  <div className="hashtag thumbnail-user__hashtag"><span>#стретчинг</span></div>
                </li>
                <li className="thumbnail-user__hashtags-item">
                  <div className="hashtag thumbnail-user__hashtag"><span>#йога</span></div>
                </li>
              </ul>
              <a className="btn btn--medium thumbnail-user__button" href="#">Подробнее</a>
            </div>
          </li>
          <li className="users-catalog__item">
            <div className="thumbnail-user thumbnail-user--role-coach">
              <div className="thumbnail-user__image">
                <picture>
                  <img src="img/content/thumbnails/user-02.jpg" srcSet="img/content/thumbnails/user-02@2x.jpg 2x" width="82" height="82" alt="" />
                </picture>
              </div>
              <div className="thumbnail-user__header">
                <h3 className="thumbnail-user__name">Дарья</h3>
                <div className="thumbnail-user__location">
                  <svg width="14" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-location"></use>
                  </svg>
                  <address className="thumbnail-user__location-address">Адмиралтейская</address>
                </div>
              </div>
              <ul className="thumbnail-user__hashtags-list">
                <li className="thumbnail-user__hashtags-item">
                  <div className="hashtag thumbnail-user__hashtag"><span>#стретчинг</span></div>
                </li>
              </ul>
              <a className="btn btn--dark-bg btn--medium thumbnail-user__button" href="#">Подробнее</a>
            </div>
          </li>
          <li className="users-catalog__item">
            <div className="thumbnail-user thumbnail-user--role-coach">
              <div className="thumbnail-user__image">
                <picture>
                  <img src="img/content/thumbnails/user-03.jpg" srcSet="img/content/thumbnails/user-03@2x.jpg 2x" width="82" height="82" alt="" />
                </picture>
              </div>
              <div className="thumbnail-user__header">
                <h3 className="thumbnail-user__name">Наталья</h3>
                <div className="thumbnail-user__location">
                  <svg width="14" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-location"></use>
                  </svg>
                  <address className="thumbnail-user__location-address">Василеостровская</address>
                </div>
              </div>
              <ul className="thumbnail-user__hashtags-list">
                <li className="thumbnail-user__hashtags-item">
                  <div className="hashtag thumbnail-user__hashtag"><span>#пилатес</span></div>
                </li>
              </ul>
              <a className="btn btn--dark-bg btn--medium thumbnail-user__button" href="#">Подробнее</a>
            </div>
          </li>
          <li className="users-catalog__item">
            <div className="thumbnail-user thumbnail-user--role-coach">
              <div className="thumbnail-user__image">
                <picture>
                  <img src="img/content/thumbnails/user-08.jpg" srcSet="img/content/thumbnails/user-08@2x.jpg 2x" width="82" height="82" alt="" />
                </picture>
              </div>
              <div className="thumbnail-user__header">
                <h3 className="thumbnail-user__name">Никита</h3>
                <div className="thumbnail-user__location">
                  <svg width="14" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-location"></use>
                  </svg>
                  <address className="thumbnail-user__location-address">Садовая</address>
                </div>
              </div>
              <ul className="thumbnail-user__hashtags-list">
                <li className="thumbnail-user__hashtags-item">
                  <div className="hashtag thumbnail-user__hashtag"><span>#йога</span></div>
                </li>
              </ul>
              <a className="btn btn--dark-bg btn--medium thumbnail-user__button" href="#">Подробнее</a>
            </div>
          </li>
          <li className="users-catalog__item">
            <div className="thumbnail-user thumbnail-user--role-user">
              <div className="thumbnail-user__image">
                <picture>
                  <img src="img/content/thumbnails/user-09.jpg" srcSet="img/content/thumbnails/user-09@2x.jpg 2x" width="82" height="82" alt="" />
                </picture>
              </div>
              <div className="thumbnail-user__header">
                <h3 className="thumbnail-user__name">Татьяна</h3>
                <div className="thumbnail-user__location">
                  <svg width="14" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-location"></use>
                  </svg>
                  <address className="thumbnail-user__location-address">Площадь Александра Невского</address>
                </div>
              </div>
              <ul className="thumbnail-user__hashtags-list">
                <li className="thumbnail-user__hashtags-item">
                  <div className="hashtag thumbnail-user__hashtag"><span>#стретчинг</span></div>
                </li>
                <li className="thumbnail-user__hashtags-item">
                  <div className="hashtag thumbnail-user__hashtag"><span>#йога</span></div>
                </li>
              </ul>
              <a className="btn btn--medium thumbnail-user__button" href="#">Подробнее</a>
            </div>
          </li>
          <li className="users-catalog__item">
            <div className="thumbnail-user thumbnail-user--role-user">
              <div className="thumbnail-user__image">
                <picture>
                  <img src="img/content/thumbnails/user-10.jpg" srcSet="img/content/thumbnails/user-10@2x.jpg 2x" width="82" height="82" alt="" />
                </picture>
              </div>
              <div className="thumbnail-user__header">
                <h3 className="thumbnail-user__name">Марк</h3>
                <div className="thumbnail-user__location">
                  <svg width="14" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-location"></use>
                  </svg>
                  <address className="thumbnail-user__location-address">Технологический Институт</address>
                </div>
              </div>
              <ul className="thumbnail-user__hashtags-list">
                <li className="thumbnail-user__hashtags-item">
                  <div className="hashtag thumbnail-user__hashtag"><span>#стретчинг</span></div>
                </li>
                <li className="thumbnail-user__hashtags-item">
                  <div className="hashtag thumbnail-user__hashtag"><span>#кроссфит</span></div>
                </li>
              </ul>
              <a className="btn btn--medium thumbnail-user__button" href="#">Подробнее</a>
            </div>
          </li>
          <li className="users-catalog__item">
            <div className="thumbnail-user thumbnail-user--role-coach">
              <div className="thumbnail-user__image">
                <picture>
                  <img src="img/content/thumbnails/user-04.jpg" srcSet="img/content/thumbnails/user-04@2x.jpg 2x" width="82" height="82" alt="" />
                </picture>
              </div>
              <div className="thumbnail-user__header">
                <h3 className="thumbnail-user__name">Диана</h3>
                <div className="thumbnail-user__location">
                  <svg width="14" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-location"></use>
                  </svg>
                  <address className="thumbnail-user__location-address">Невский проспект</address>
                </div>
              </div>
              <ul className="thumbnail-user__hashtags-list">
                <li className="thumbnail-user__hashtags-item">
                  <div className="hashtag thumbnail-user__hashtag"><span>#пилатес</span></div>
                </li>
              </ul>
              <a className="btn btn--dark-bg btn--medium thumbnail-user__button" href="#">Подробнее</a>
            </div>
          </li>
        </ul>
        <div className="show-more users-catalog__show-more">
          <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
          <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
        </div>
      </div>
    </div>
  );
}

export default UsersCatalogList;
