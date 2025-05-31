import { JSX } from 'react';

import { Role } from '@backend/shared/core';

import CustomCheckbox from '../custom-checkbox/custom-checkbox';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsReadyForTrainingChangeExecuting, getReadyForTraining } from '../../store/account-process/selectors';
import { changeReadyForTraining } from '../../store/actions/account-action';
import { getReadyTraining } from '../../utils/common';

type PersonalAccountReadyCheckboxProps = {
  name: string;
  mainClassName: string;
  role: Role;
}

function PersonalAccountReadyCheckbox({ name, mainClassName, role }: PersonalAccountReadyCheckboxProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isReadyForTrainingChangeExecuting = useAppSelector(getIsReadyForTrainingChangeExecuting);
  const readyForTraining = useAppSelector(getReadyForTraining);

  const handleReadyForTrainingCheckboxChange = () => {
    dispatch(changeReadyForTraining(!readyForTraining));
  };

  return (
    <CustomCheckbox
      name={name}
      spanText={getReadyTraining(role)}
      value={readyForTraining}
      isSwitch
      onChange={handleReadyForTrainingCheckboxChange}
      divExtraClassName={mainClassName}
      isDisabled={isReadyForTrainingChangeExecuting}
    />
  );
}

export default PersonalAccountReadyCheckbox;
