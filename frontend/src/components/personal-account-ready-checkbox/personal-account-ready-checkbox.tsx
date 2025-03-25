import { ChangeEvent } from 'react';

type PersonalAccountReadyCheckboxProps = {
  name: string;
  mainClassName: string;
  readyForTraining: boolean;
  isSpotsmanRole: boolean;
}

function PersonalAccountReadyCheckbox({ name, mainClassName, readyForTraining, isSpotsmanRole }: PersonalAccountReadyCheckboxProps): JSX.Element {
  const handleInputReadyForTrainingChange = (event: ChangeEvent<HTMLInputElement>) => {
    //! остановить по умолчани / выполнить диспатч / продолжить выполенине действия - можно так сделать?
    //event.preventDefault();
    //! ready-for-training, нужно где-то получить, пока defaultChecked и отдельный обработчик на изменение и лоадер и т.д....

    //! отладка
    // eslint-disable-next-line no-console
    console.log('handleInputReadyForTrainingChange - event.target.checked', event.target.checked);
  };

  return (
    <div className={`custom-toggle custom-toggle--switch ${mainClassName}__toggle`}>
      <label>
        <input
          type="checkbox"
          name={name}
          defaultChecked={readyForTraining}
          onChange={handleInputReadyForTrainingChange}
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
