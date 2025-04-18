import CustomCheckbox from '../custom-checkbox/custom-checkbox';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsReadyForTrainingChangeExecuting, getReadyForTraining } from '../../store/user-profile-process/selectors';
import { changeReadyForTraining } from '../../store/actions/user-profile-action';

type PersonalAccountReadyCheckboxProps = {
  name: string;
  mainClassName: string;
  isSpotsmanRole: boolean;
}

function PersonalAccountReadyCheckbox({ name, mainClassName, isSpotsmanRole }: PersonalAccountReadyCheckboxProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isReadyForTrainingChangeExecuting = useAppSelector(getIsReadyForTrainingChangeExecuting);
  const readyForTraining = useAppSelector(getReadyForTraining);

  const handleeadyForTrainingCheckboxChange = () => {
    const checked = !readyForTraining;

    dispatch(changeReadyForTraining(checked));
  };

  return (
    <CustomCheckbox
      name={name}
      spanText={(isSpotsmanRole) ? 'Готов к тренировке' : 'Готов тренировать'}
      value={readyForTraining}
      isSwitch
      onChange={handleeadyForTrainingCheckboxChange}
      divExtraClassName={mainClassName}
      isDisabled={isReadyForTrainingChangeExecuting}
    />
  );
}

export default PersonalAccountReadyCheckbox;
