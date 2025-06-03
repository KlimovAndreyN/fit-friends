import { JSX, useEffect } from 'react';

import ThumbnailTraining from '../thumbnail-training/thumbnail-training';
import Slider from '../slider/slider';
import Spinner from '../spinner/spinner';
import UserDetailCoachTrainingForm from '../user-detail-coach-training-form/user-detail-coach-training-form';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCoachTrainings, getIsFetchCoachTrainingsExecuting } from '../../store/training-process/selectors';
import { fetchCoachTrainings } from '../../store/actions/training-action';

const SLIDES_COUNT = 4;

type UserDetailCoachTrainingBlockProps = {
  classNamePrefix: string;
  userId: string;
  readyForTraining: boolean;
  individualTraining?: boolean;
}

function UserDetailCoachTrainingBlock(props: UserDetailCoachTrainingBlockProps): JSX.Element {
  //! проработать логику 'персональной тренировки', что по ТЗ?
  //    нажал > пропала? или поменяла текст отказала
  //! проработать логику подписки
  //    нажал > меняется галочка и происходит подписка и отписка?

  const { classNamePrefix, userId, readyForTraining, individualTraining } = props;
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
      additionalFooterElement={
        <UserDetailCoachTrainingForm
          classNamePrefix={classNamePrefix}
          userId={userId}
          readyForTraining={readyForTraining}
          individualTraining={individualTraining}
        />
      }
      textForEmpty='У тренера еще нет тренировок'
    />
  );
}

export default UserDetailCoachTrainingBlock;
