import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MainSpinner from '../../components/main-spinner/main-spinner';
import Header from '../../components/header/header';
import ReviewsPanel from '../../components/reviews-panel/reviews-panel';
import UserPhoto from '../../components/user-photo/user-photo';
import NotFound from '../not-found/not-found';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchDetailTraining } from '../../store/training-action';
import { getDetailTraining, getIsFetchDetailTrainingExecuting } from '../../store/training-process/selectors';
import { PageTitle, SpecializationTitle, TrainingDurationTitle, TrainingGenderTitle } from '../../const';

function Training(): JSX.Element {
  //! прокрутка на вверх
  //! сделать меньше... можно вынести <ul className="training-info__list">, <div className="training-info__header">, <form ... что то еще?
  //! как отборазить если бесплатно? есть что то в маркапах
  //! обработать пустой avatarFilePath... а может у тренера фото обязательное...  как по ТЗ?
  //! не видно цыфру рейтинга при сужении онка - помогает .training-info__input--rating {width: 110px;}
  //! ссылка на видео, навеное если купил тренировку если не куплено то background ? как по ТЗ
  //! ссылка на профиль тренера? сделать по фото и имени! как по ТЗ? маркапы?
  //! проверить консоль браузера на ошибки

  const dispatch = useAppDispatch();
  const { id: trainingId } = useParams();
  const isFetchDetailTrainingExecuting = useAppSelector(getIsFetchDetailTrainingExecuting);
  const training = useAppSelector(getDetailTraining);

  useEffect(() => {
    dispatch(fetchDetailTraining(trainingId || '')); //! а как без ''?
  }, [dispatch, trainingId]);

  if (isFetchDetailTrainingExecuting) {
    //! свой спинер бы
    return <MainSpinner />;
  }

  if (!trainingId || !training) {
    //! проверить как будет выглядеть
    //! еще бы дополнительный текст добавить
    return <NotFound />;
  }

  const { title, specialization, gender, duration, caloriesWaste, description, price, rating, videoFilePath, coach } = training;
  const { id: coachId, avatarFilePath, name } = coach;
  const specializationText = SpecializationTitle[specialization].toLocaleLowerCase();
  const genderText = TrainingGenderTitle[gender];
  const durationText = TrainingDurationTitle[duration];

  // eslint-disable-next-line no-console
  console.log('Training - coachId', coachId);
  // eslint-disable-next-line no-console
  console.log('Training - videoFilePath', videoFilePath);
  //

  return (
    <Fragment>
      <Header title={PageTitle.TrainingDetail} />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <ReviewsPanel trainingId={trainingId} />
              <div className="training-card">
                <div className="training-info">
                  <h2 className="visually-hidden">Информация о тренировке</h2>
                  <div className="training-info__header">
                    <div className="training-info__coach">
                      <UserPhoto path={avatarFilePath} className='training-info__photo' />
                      <div className="training-info__coach-info"><span className="training-info__label">Тренер</span>
                        <span className="training-info__name">{name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="training-info__main-content">
                    <form action="#" method="get">
                      <div className="training-info__form-wrapper">
                        <div className="training-info__info-wrapper">
                          <div className="training-info__input training-info__input--training">
                            <label><span className="training-info__label">Название тренировки</span>
                              <input type="text" name="training" defaultValue={title} disabled />
                            </label>
                            <div className="training-info__error">Обязательное поле</div>
                          </div>
                          <div className="training-info__textarea">
                            <label>
                              <span className="training-info__label">Описание тренировки</span>
                              <textarea
                                name="description"
                                defaultValue={description}
                                readOnly /*//! disabled  при просмотре поставил readOnly*/
                              />
                            </label>
                          </div>
                        </div>
                        <div className="training-info__rating-wrapper">
                          <div className="training-info__input training-info__input--rating">
                            <label>\
                              <span className="training-info__label">Рейтинг</span>
                              <span className="training-info__rating-icon">
                                <svg width="18" height="18" aria-hidden="true">
                                  <use xlinkHref="#icon-star"></use>
                                </svg>
                              </span>
                              <input type="number" name="rating" defaultValue={rating} disabled />
                            </label>
                          </div>
                          <ul className="training-info__list">
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{specializationText}</span></div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#для_{genderText}</span></div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{caloriesWaste}ккал</span></div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{durationText}мин</span></div>
                            </li>
                          </ul>
                        </div>
                        <div className="training-info__price-wrapper">
                          <div className="training-info__input training-info__input--price">
                            <label><span className="training-info__label">Стоимость</span>
                              <input type="text" name="price" defaultValue={`${price}\u00A0₽`} disabled />
                            </label>
                            <div className="training-info__error">Введите число</div>
                          </div>
                          <button className="btn training-info__buy" type="button">Купить</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="training-video">
                  <h2 className="training-video__title">Видео</h2>
                  <div className="training-video__video">
                    <div className="training-video__thumbnail">
                      <picture>
                        <source type="image/webp" srcSet="img/content/training-video/video-thumbnail.webp, img/content/training-video/video-thumbnail@2x.webp 2x" />
                        <img src="img/content/training-video/video-thumbnail.png" srcSet="img/content/training-video/video-thumbnail@2x.png 2x" width="922" height="566" alt="Обложка видео" />
                      </picture>
                    </div>
                    <button className="training-video__play-button btn-reset">
                      <svg width="18" height="30" aria-hidden="true">
                        <use xlinkHref="#icon-arrow"></use>
                      </svg>
                    </button>
                  </div>
                  <div className="training-video__buttons-wrapper">
                    <button className="btn training-video__button training-video__button--start" type="button" disabled>Приступить</button>
                    <button className="btn training-video__button training-video__button--stop" type="button">Закончить</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}

export default Training;
