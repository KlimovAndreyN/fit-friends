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

type UserDetailCoachTrainingBlockProps = {
  classNamePrefix: string;
}

function UserDetailCoachTrainingBlock({ classNamePrefix }: UserDetailCoachTrainingBlockProps): JSX.Element {
  //! получить тренировки можно сделать, а можно в предке, если здесь, то сделать как в тренировке, с очиской состояния
  //    убрать моки
  //! добавить текс если нет тренировок
  //! проработать логику 'персональной тренировки', что по ТЗ?
  //    нажал > пропала? или поменяла текст отказала
  //! задействовать CustomCheckbox
  //! проработать логику подписки
  //    нажал > меняется галочка и происходит подписка и отписка?

  const mainClassNamePrefix = `${classNamePrefix}__training`;

  const childrens = MOCK_TRAINIGS.map(
    (training) => (
      <TrainingCard key={training.id} training={training} />
    )
  );
  const form = (
    <form className={`${mainClassNamePrefix}-form`}>
      <button className={`btn ${classNamePrefix}__btn-training`} type="button">Хочу персональную тренировку</button>
      <div className={`${mainClassNamePrefix}-check`}>
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
    <Slider
      title='Тренировки'
      classNamePrefix={mainClassNamePrefix}
      titleDivClassNamePostfix='head'
      titleClassNamePostfix='title'
      controlsClassNamePostfix='bts'
      controlClassNamePostfix='btn'
      previousAriaLabel='back'
      sliderButtonWidth={14}
      sliderButtonHeight={10}
      childrens={childrens}
      slidesCount={SLIDES_COUNT}
      marginRight={20}
      additionalFooterElement={form}
    />
  );
}

export default UserDetailCoachTrainingBlock;
