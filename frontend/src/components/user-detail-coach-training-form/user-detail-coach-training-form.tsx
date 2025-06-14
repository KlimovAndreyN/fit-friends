import { JSX, MouseEvent } from 'react';
import classNames from 'classnames';

import './user-detail-coach-training-form.css';

import CustomCheckbox from '../custom-checkbox/custom-checkbox';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsCreateRequestExecuting, getIsFriendUserProfile, getPersonalTrainingRequest } from '../../store/user-profile-process/selectors';
import { createTrainingRequest } from '../../store/actions/user-profile-action';

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
  const dispatch = useAppDispatch();
  const isFriendUserProfile = useAppSelector(getIsFriendUserProfile);
  const isCreateRequestExecuting = useAppSelector(getIsCreateRequestExecuting);
  const personalTrainingRequest = useAppSelector(getPersonalTrainingRequest);
  const buttonPersonalTrainingDisabled = !readyForTraining || isCreateRequestExecuting || !!personalTrainingRequest;
  const mainClassNamePrefix = `${classNamePrefix}__training`;
  const buttonPersonalTrainingClassName = classNames(
    'btn',
    `${classNamePrefix}__btn-training`,
    { 'btn--border': buttonPersonalTrainingDisabled }
  );

  const handlePersonalTrainingButtonClick = (event: MouseEvent) => {
    event.preventDefault();

    dispatch(createTrainingRequest({ userId }));
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
          disabled={buttonPersonalTrainingDisabled}
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
