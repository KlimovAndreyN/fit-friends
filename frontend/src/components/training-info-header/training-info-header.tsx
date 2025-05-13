import { JSX, Fragment, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import UserPhoto from '../user-photo/user-photo';

import { getUserRoute } from '../../utils/common';

type TrainingInfoHeaderProps = {
  isSportsman: boolean;
  isEditing?: boolean;
  coachId: string;
  coachName: string;
  coachAvatarFilePath?: string;
  onEditClick?: () => void;
  onSaveClick?: () => void;
}

function TrainingInfoHeader(props: TrainingInfoHeaderProps): JSX.Element {
  const { isSportsman, isEditing, coachId, coachName, coachAvatarFilePath, onEditClick, onSaveClick } = props;
  const editButtonClassName = classNames(
    'btn-flat btn-flat--light training-info__edit',
    { 'training-info__edit--edit': isEditing }
  );
  const saveButtonClassName = classNames(
    'btn-flat btn-flat--light btn-flat--underlined training-info__edit',
    {
      'training-info__edit--save': isEditing,
      'training-info__edit--edit': !isEditing
    }
  );
  const coachInfo = (
    <Fragment>
      <UserPhoto path={coachAvatarFilePath} className='training-info__photo' />
      <div className="training-info__coach-info"><span className="training-info__label">Тренер</span>
        <span className="training-info__name">{coachName}</span>
      </div>
    </Fragment>
  );

  const handleEditButtonClick = (isSportsman) ? undefined : (event: MouseEvent) => {
    event.preventDefault();
    onEditClick?.();
  };

  const handleSaveButtonClick = (isSportsman) ? undefined : (event: MouseEvent) => {
    event.preventDefault();
    onSaveClick?.();
  };

  return (
    <div className="training-info__header">
      <div className="training-info__coach">
        {
          (isSportsman)
            ?
            <Link to={getUserRoute(coachId)} className="training-info__coach">
              {coachInfo}
            </Link>
            :
            coachInfo
        }
      </div>
      {
        (!isSportsman) &&
        <Fragment>
          <button className={editButtonClassName} type="button" onClick={handleEditButtonClick}>
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"></use>
            </svg>
            <span>Редактировать</span>
          </button>
          <button className={saveButtonClassName} type="button" onClick={handleSaveButtonClick}>
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"></use>
            </svg>
            <span>Сохранить</span>
          </button>
        </Fragment>
      }
    </div>
  );
}

export default TrainingInfoHeader;
