import { JSX, MouseEvent } from 'react';
import classNames from 'classnames';

import './user-detail-coach-training-form.css';

import CustomCheckbox from '../custom-checkbox/custom-checkbox';

import { useAppSelector } from '../../hooks';
import { getIsFriendUserProfile } from '../../store/user-profile-process/selectors';

type UserDetailCoachTrainingFormProps = {
  classNamePrefix: string;
  userId: string;
  readyForTraining: boolean;
  individualTraining?: boolean;
}

function UserDetailCoachTrainingForm(props: UserDetailCoachTrainingFormProps): JSX.Element {
  //! проработать логику 'персональной тренировки', что по ТЗ?
  //    нажал > пропала? или поменяла текст отказала
  //! проработать логику подписки
  //    нажал > меняется галочка и происходит подписка и отписка?

  const { classNamePrefix, userId, readyForTraining, individualTraining } = props;
  //const dispatch = useAppDispatch();//! позже нужно
  const isFriendUserProfile = useAppSelector(getIsFriendUserProfile);
  const mainClassNamePrefix = `${classNamePrefix}__training`;
  const buttonPersonalTrainingClassName = classNames(
    'btn',
    `${classNamePrefix}__btn-training`,
    { 'btn--border': !readyForTraining }
  );

  const handlePersonalTrainingButtonClick = (event: MouseEvent) => {
    event.preventDefault();

    //! отладка
    // eslint-disable-next-line no-console
    console.log('handlePersonalTrainingButtonClick - userId', userId);
  };

  const handleSubscribeCheckboxChange = (newValue: boolean) => {
    //! отладка
    // eslint-disable-next-line no-console
    console.log('handleSubscribeCheckboxChange - newValue', newValue);
    // eslint-disable-next-line no-console
    console.log('handleSubscribeCheckboxChange - userId', userId);
  };

  return (
    <form className={`${mainClassNamePrefix}-form`}>
      {
        individualTraining && isFriendUserProfile &&
        <button
          className={buttonPersonalTrainingClassName}
          type="button"
          onClick={handlePersonalTrainingButtonClick}
          disabled={!readyForTraining}
        >Хочу персональную тренировку
        </button>
      }
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
}

export default UserDetailCoachTrainingForm;
