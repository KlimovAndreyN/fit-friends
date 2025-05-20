import { JSX, useState } from 'react';
import classNames from 'classnames';

import { IDetailTrainingRdo, SPECIAL_OFFER_PERCENT } from '@backend/shared/core';

import TrainingInfoHeader from '../training-info-header/training-info-header';
import Hashtags from '../hashtags/hashtags';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsSpecialTraining } from '../../store/training-process/selectors';
import { changeIsSpecialTraining } from '../../store/actions/training-action';
import { DurationMinMax, SpecializationTitle, TrainingGenderTitle } from '../../const';

type TrainingInfoProps = {
  training: IDetailTrainingRdo;
  isSportsman: boolean;
}

function TrainingInfo({ training, isSportsman }: TrainingInfoProps): JSX.Element {
  //! Будет работать в нескольких режимах:
  //    отработчики передать с управлющей страницы/компонента
  //    1. Просмотр карточки от спортсмена
  //      1.1. покупка
  //      1.2. приступить / просмотр видео / закончить
  //    2. Редактирование тренировки от тренера
  //    сравнить фрагмент с видео при редактировании/промотре от тренера и от спортсмена
  //      и скидкой
  //
  //! выделить отдельно форму training-info-form / TrainingInfoForm
  //! проверить, ранние заметки:
  //! есть компоненты для разных элементов, нужны при редактировании - перепроверить
  //! как округлять рейтинг? как по ТЗ? пока округлил до целых
  //! сделал для video__thumbnail - backgroundPath из rdo? как по ТЗ
  //! не видно цыфру рейтинга при сужении онка - помогает .training-info__input--rating {width: 110px;}
  //! ссылка на видео, навеное если купил тренировку если не куплено то background ? как по ТЗ
  //! ссылка на профиль тренера? сделать по фото и имени! как по ТЗ? маркапы? сделал для роли пользователь
  //! проверить консоль браузера на ошибки
  // а как выглядят со скидкой? как по ТЗ? - нет примера
  // как отборазить если бесплатно? есть что то в маркапах - просто 0!

  const dispatch = useAppDispatch();
  const isSpecialTraining = (!isSportsman) ? useAppSelector(getIsSpecialTraining) : undefined;

  const { id: trainingId, title, specialization, gender, duration, caloriesWaste, description, price, rating, videoFilePath, coach, backgroundPath } = training;
  const [isEditing, setIsEditing] = useState(false); //! возможно нужно в useEffect елси будет открыто редактирование и нажата изменить статус
  const { id: coachId, avatarFilePath, name } = coach;
  const { min, max } = DurationMinMax[duration];
  const hashtags = [
    SpecializationTitle[specialization].toLocaleLowerCase(),
    `для_${TrainingGenderTitle[gender]}`,
    `${caloriesWaste}ккал`,
    `${min}_${max}мин`
  ];
  const divClassName = classNames('training-card', { 'training-card--edit': !isSportsman });

  const handleEditClick = (isSportsman) ? undefined : () => {
    setIsEditing(true);
  };

  const handleSaveClick = (isSportsman) ? undefined : () => {
    //! временно
    setIsEditing(false);
  };

  const handleDiscountButtonClick = (isSportsman) ? undefined : () => {
    dispatch(changeIsSpecialTraining({ trainingId, isSpecial: !isSpecialTraining }));
  };

  return (
    <div className={divClassName}>
      <div className="training-info">
        <h2 className="visually-hidden">Информация о тренировке</h2>
        <TrainingInfoHeader
          isSportsman={isSportsman}
          isEditing={isEditing}
          coachId={coachId}
          coachName={name}
          coachAvatarFilePath={avatarFilePath}
          onEditClick={handleEditClick}
          onSaveClick={handleSaveClick}
        />
        <div className="training-info__main-content">
          <form action="#" method="get">
            <div className="training-info__form-wrapper">
              <div className="training-info__info-wrapper">
                <div className="training-info__input training-info__input--training">
                  <label><span className="training-info__label">Название тренировки</span>
                    <input type="text" name="training" defaultValue={title} readOnly={!isEditing} disabled={!isEditing} />
                  </label>
                  <div className="training-info__error">Обязательное поле</div>
                </div>
                <div className="training-info__textarea">
                  <label>
                    <span className="training-info__label">Описание тренировки</span>
                    <textarea name="description" defaultValue={description} readOnly={!isEditing} disabled={!isEditing} />
                  </label>
                </div>
              </div>
              <div className="training-info__rating-wrapper">
                <div className="training-info__input training-info__input--rating">
                  <label>\
                    <span className="training-info__label">Рейтинг</span>
                    <span className="training-info__rating-icon">
                      <svg width="18" height="18" aria-hidden="true">
                        <use xlinkHref="#icon-star" />
                      </svg>
                    </span>
                    <input type="number" name="rating" defaultValue={rating.toFixed(0)} disabled />
                  </label>
                </div>
                <Hashtags
                  classNamePrefix='training-info'
                  divItemClassNamePrefix='hashtag--white'
                  separator='__'
                  isNotNeedSpecialClassName
                  items={hashtags}
                />
              </div>
              <div className="training-info__price-wrapper">
                <div className="training-info__input training-info__input--price">
                  <label><span className="training-info__label">Стоимость</span>
                    {/*//! для тренера тут числа? */}
                    <input type="text" name="price" defaultValue={`${price}\u00A0₽`} readOnly={!isEditing} disabled={!isEditing} />
                  </label>
                  <div className="training-info__error">Введите число</div>
                </div>
                {
                  (isSportsman)
                    ?
                    <button className="btn training-info__buy" type="button">Купить</button>
                    :
                    <button className="btn-flat btn-flat--light btn-flat--underlined training-info__discount" type="button" onClick={handleDiscountButtonClick}>
                      <svg width="14" height="14" aria-hidden="true">
                        <use xlinkHref="#icon-discount"></use>
                      </svg>
                      <span>{(isSpecialTraining) ? 'Отменить скидку' : `Сделать скидку ${SPECIAL_OFFER_PERCENT}%`}</span>
                    </button>
                }
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="training-video">
        <h2 className="training-video__title">Видео</h2>
        <div className="training-video__video">
          <div className="training-video__thumbnail">
            <video controls width="100%" height="auto" className="training-video__video">
              <source src={videoFilePath} type="video/mp4" />
              Ваш браузер не поддерживает видео
            </video>
            {/* //! visually-hidden - временно скрыл обложку*/}
            <picture>
              <img className='visually-hidden' src={backgroundPath} width="922" height="566" alt="Обложка видео" />
            </picture>
          </div>
          {/* //! visually-hidden - временно скрыл кнопку*/}
          <button className="training-video__play-button btn-reset visually-hidden">
            <svg width="18" height="30" aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
        </div>
        <div className="training-video__buttons-wrapper">
          <button className="btn training-video__button training-video__button--start" type="button" disabled>Приступить</button>
          <button className="btn training-video__button training-video__button--stop" type="button">Закончить</button>
        </div>
      </div>
    </div>
  );
}

export default TrainingInfo;
