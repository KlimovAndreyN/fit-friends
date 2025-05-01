import classNames from 'classnames';

type UserDetailStatusProps = {
  isSportsman: boolean;
  readyForTraining: boolean;
}

function UserDetailStatus({ isSportsman, readyForTraining }: UserDetailStatusProps): JSX.Element {
  //! напутано с разметкой....
  //    'user-card-coach-2__status user-card-coach-2__status--check' серое
  //    'user-card-coach__status user-card-coach__status--check' зелоное
  //  у спортсмена тоже не то
  //    'user-card__status user-card__status--check' зелоное
  //    'user-card__status' зелоное
  //  а у 'user-card-coach-2__status user-card-coach-2__status--check' серое - нет - margin-bottom: 35px;
  //    добавил в style
  //  classNamePrefix исключил из пропсов

  const text = (isSportsman) ? 'Готов к тренировке' : 'Готов тренировать';
  const caption = ((readyForTraining) ? text : `Не ${text.toLowerCase()}`);
  const mainClassNamePrefix = (isSportsman) ? 'user-card' : 'user-card-coach';
  const classNamePrefix = (readyForTraining) ? mainClassNamePrefix : 'user-card-coach-2';
  const divMainClassName = `${classNamePrefix}__status`;
  const divCheckClassName = `${divMainClassName}--check`;

  const content = (
    <div className={classNames(divMainClassName, divCheckClassName)} style={{ marginBottom: (isSportsman && !readyForTraining) ? '35px' : undefined }}>
      <span>{caption}</span>
    </div>
  );

  return (
    (isSportsman)
      ?
      content
      :
      <div className={`${classNamePrefix}__status-container`}>
        <div className={`${classNamePrefix}__status ${classNamePrefix}__status--tag`}>
          <svg className={`${classNamePrefix}__icon-cup`} width="12" height="13" aria-hidden="true">
            <use xlinkHref="#icon-cup"></use>
          </svg>
          <span>Тренер</span>
        </div>
        {content}
      </div>
  );
}

export default UserDetailStatus;
