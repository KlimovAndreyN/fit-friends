import { Specialization } from '@backend/shared/core';

import TrainingCard from '../training-card/training-card';

const MOCK_TRAINIGS = [
  {
    id: 'id-1',
    title: 'Power',
    backgroundPath: 'img/content/user-card-coach/training-1.jpg',
    price: 1200,
    specialization: Specialization.Power,
    caloriesWaste: 600,
    rating: 4,
    description: 'Тренировка на отработку правильной техники работы с тяжелыми весами, укрепления мышц кора и спины.',
    isSpecial: false
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
    isSpecial: false
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
    isSpecial: true
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
    isSpecial: false
  }
];

type UserDetailCoachTrainingsProps = {
  classNamePrefix: string;
}

function UserDetailCoachTrainings({ classNamePrefix }: UserDetailCoachTrainingsProps): JSX.Element {
  const mainClassName = `${classNamePrefix}__training`;

  return (
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
    </div>
  );
}

export default UserDetailCoachTrainings;
