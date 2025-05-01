import { useEffect } from 'react';

import TrainingCard from '../training-card/training-card';
import Slider from '../slider/slider';
import Spinner from '../spinner/spinner';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCoachTrainings, getIsFetchCoachTrainingsExecuting } from '../../store/training-process/selectors';
import { fetchCoachTrainings } from '../../store/actions/training-action';

const SLIDES_COUNT = 4;

type UserDetailCoachTrainingBlockProps = {
  classNamePrefix: string;
  userId: string;
}

function UserDetailCoachTrainingBlock({ classNamePrefix, userId }: UserDetailCoachTrainingBlockProps): JSX.Element {
  //! добавить текст, если нет тренировок
  //! проработать логику 'персональной тренировки', что по ТЗ?
  //    нажал > пропала? или поменяла текст отказала
  //! задействовать CustomCheckbox
  //! проработать логику подписки
  //    нажал > меняется галочка и происходит подписка и отписка?

  const dispatch = useAppDispatch();
  const isFetchCoachTrainingsExecuting = useAppSelector(getIsFetchCoachTrainingsExecuting);
  const trainings = useAppSelector(getCoachTrainings);

  useEffect(() => {
    dispatch(fetchCoachTrainings(userId));
  }, [dispatch, userId]);

  if (isFetchCoachTrainingsExecuting) {
    return <Spinner />;
  }

  const mainClassNamePrefix = `${classNamePrefix}__training`;

  const childrens = trainings.map(
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
