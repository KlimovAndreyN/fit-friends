import { Fragment } from 'react';

import { ITrainingRdo, Specialization } from '@backend/shared/core';

import TrainingCard from '../training-card/training-card';
import Slider from '../slider/slider';

const MOCK_TRAINIGS: ITrainingRdo[] = [
  {
    id: 'id-1',
    title: 'Power',
    backgroundPath: 'img/content/user-card-coach/training-1.jpg',
    price: 1200,
    specialization: Specialization.Power,
    caloriesWaste: 600,
    rating: 4,
    description: 'Тренировка на отработку правильной техники работы с тяжелыми весами, укрепления мышц кора и спины.',
    isSpecial: false,
    createdDate: ''
  },
  {
    id: 'id-2',
    title: 'Devil\'s Cindy',
    backgroundPath: 'img/content/user-card-coach/training-2.jpg',
    price: 2200,
    specialization: Specialization.Crossfit,
    caloriesWaste: 950,
    rating: 5,
    description: 'Знаменитый кроссфит комплекс. Синди – универсальная тренировка для развития функциональной силы.',
    isSpecial: false,
    createdDate: ''
  },
  {
    id: 'id-3',
    title: 'boxing',
    backgroundPath: 'img/content/user-card-coach/training-3.jpg',
    price: 1200,
    specialization: Specialization.Power,
    caloriesWaste: 600,
    rating: 4,
    description: 'Тренировка на отработку правильной техники работы с тяжелыми весами, укрепления мышц кора и спины.',
    isSpecial: true,
    createdDate: ''
  },
  {
    id: 'id-4',
    title: 'asdfsad',
    backgroundPath: 'img/content/user-card-coach/training-4.jpg',
    price: 1200,
    specialization: Specialization.Power,
    caloriesWaste: 600,
    rating: 4,
    description: 'Тренировка на отработку правильной техники работы с тяжелыми весами, укрепления мышц кора и спины.',
    isSpecial: false,
    createdDate: ''
  }
];

const SLIDES_COUNT = 4;

type UserDetailCoachTrainingsProps = {
  classNamePrefix: string;
}

function UserDetailCoachTrainings({ classNamePrefix }: UserDetailCoachTrainingsProps): JSX.Element {
  const mainClassName = `${classNamePrefix}__training`;
  const childrens = MOCK_TRAINIGS.map(
    (training) => (
      <TrainingCard key={training.id} training={training} />
    )
  );

  /*
  const { sectionClassName, showAllLink, ...otherPorps } = props;
  const { isShowAllLight } = otherPorps;
  const navigate = useNavigate();

  const handleShowAllButtonClick = () => {
    if (showAllLink) {
      navigate(showAllLink);
    }
  };

  const sliderProps: SliderProps = {
    ...otherPorps,
    classNamePrefix: sectionClassName,
    divClassName: `${sectionClassName}__wrapper`
  };

  const showAllSliderButtonOption = {
    firstTitle: 'Смотреть все',
    className: classNames('btn-flat', { 'btn-flat--light': isShowAllLight }, `${sectionClassName}__button`),
    onClick: handleShowAllButtonClick,
    xlinkHref: '#arrow-right',
    width: 14,
    height: 10
  };

  sliderProps.additionalTitleElement = (showAllLink)
    ? <SliderButton {...showAllSliderButtonOption} />
    : undefined;
  );
  */

  const form = (
    <form className="user-card-coach__training-form">
      <button className="btn user-card-coach__btn-training" type="button">Хочу персональную тренировку</button>
      <div className="user-card-coach__training-check">
        <div className="custom-toggle custom-toggle--checkbox">
          <label>
            <input type="checkbox" value="user-agreement-1" name="user-agreement" checked />
            <span className="custom-toggle__icon" >
              <svg width="9" height="6" aria-hidden="true">
                <use xlinkHref="#arrow-check"></use>
              </svg>
            </span>
            <span className="custom-toggle__label">Получать уведомление на почту о новой тренировке</span>
          </label>
        </div>
      </div>
    </form>
  );

  return (
    <Fragment>
      <Slider
        title='Тренировки'
        classNamePrefix={`${classNamePrefix}__training`}

        childrens={childrens}
        slidesCount={SLIDES_COUNT}
        additionalFooterElement={form}
      />
      <div className={mainClassName}>
        <div className={`${mainClassName}-head`}>
          <h2 className={`${mainClassName}-title`}>Тренировки</h2>
          <div className="user-card-coach__training-bts">
            <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="back">
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-left"></use>
              </svg>
            </button>
            <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="next">
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
          </div>
        </div>
        <ul className="user-card-coach__training-list">
          {
            MOCK_TRAINIGS.map(({ id, title, price, backgroundPath, caloriesWaste, description, rating, specialization, isSpecial }) => (
              <li className="user-card-coach__training-item" key={id}>
                <TrainingCard
                  training={{ id, title, price, backgroundPath, caloriesWaste, description, rating, specialization, isSpecial, createdDate: '' }}
                />
              </li>
            ))
          }
        </ul>
        {form}
      </div>
    </Fragment>
  );
}

export default UserDetailCoachTrainings;
