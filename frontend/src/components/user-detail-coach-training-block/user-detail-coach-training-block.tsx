import { JSX, MouseEvent, useEffect } from 'react';

import ThumbnailTraining from '../thumbnail-training/thumbnail-training';
import CustomCheckbox from '../custom-checkbox/custom-checkbox';
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
  //! проработать логику 'персональной тренировки', что по ТЗ?
  //    нажал > пропала? или поменяла текст отказала
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
      <ThumbnailTraining key={training.id} training={training} />
    )
  );

  const handlePersonalTrainingButtonClick = (event: MouseEvent) => {
    event.preventDefault();

    //! отладка
    // eslint-disable-next-line no-console
    console.log('handlePersonalTrainingButtonClick');
  };

  const handleSubscribeCheckboxChange = (newValue: boolean) => {
    //! отладка
    // eslint-disable-next-line no-console
    console.log('handleSubscribeCheckboxChange - newValue', newValue);
  };

  const form = (
    <form className={`${mainClassNamePrefix}-form`}>
      <button className={`btn ${classNamePrefix}__btn-training`} type="button" onClick={handlePersonalTrainingButtonClick}>Хочу персональную тренировку</button>
      <div className={`${mainClassNamePrefix}-check`}>
        <CustomCheckbox
          name='user-agreement'
          valueText='user-agreement-1'
          spanText='Получать уведомление на почту о новой тренировке'
          onChange={handleSubscribeCheckboxChange}
        />
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
      textForEmpty='У тренера еще нет тренировок'
    />
  );
}

export default UserDetailCoachTrainingBlock;
