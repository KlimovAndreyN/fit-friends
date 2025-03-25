import { MouseEvent } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsReadyForTrainingChangeExecuting, getReadyForTraining } from '../../store/user-info-process/selectors';
import { changeReadyForTraning } from '../../store/user-info-action';

type PersonalAccountReadyCheckboxProps = {
  name: string;
  mainClassName: string;
  isSpotsmanRole: boolean;
}

function PersonalAccountReadyCheckbox({ name, mainClassName, isSpotsmanRole }: PersonalAccountReadyCheckboxProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isReadyForTrainingChangeExecuting = useAppSelector(getIsReadyForTrainingChangeExecuting);
  const readyForTraining = useAppSelector(getReadyForTraining);

  const handleInputReadyForTrainingClick = (event: MouseEvent<HTMLLabelElement>) => {
    event.preventDefault();

    const checked = !readyForTraining;

    dispatch(changeReadyForTraning(checked));
  };

  return (
    <div className={`custom-toggle custom-toggle--switch ${mainClassName}__toggle`}>
      <label onClick={handleInputReadyForTrainingClick}>
        <input
          type="checkbox"
          name={name}
          checked={readyForTraining}
          readOnly
          disabled={isReadyForTrainingChangeExecuting}
        />
        <span className="custom-toggle__icon">
          <svg width="9" height="6" aria-hidden="true">
            <use xlinkHref="#arrow-check"></use>
          </svg>
        </span>
        <span className="custom-toggle__label">{(isSpotsmanRole) ? 'Готов к тренировке' : 'Готов тренировать'}</span>
      </label>
    </div>
  );
}

export default PersonalAccountReadyCheckbox;
