import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import UserPhoto from '../user-photo/user-photo';

import { getUserRoute } from '../../utils/common';

type TrainingInfoHeaderProps = {
  coachId?: string;
  coachName: string;
  coachAvatarFilePath?: string;
}

function TrainingInfoHeader({ coachId, coachName, coachAvatarFilePath }: TrainingInfoHeaderProps): JSX.Element {
  const coachInfo = (
    <Fragment>
      <UserPhoto path={coachAvatarFilePath} className='training-info__photo' />
      <div className="training-info__coach-info"><span className="training-info__label">Тренер</span>
        <span className="training-info__name">{coachName}</span>
      </div>
    </Fragment>
  );

  return (
    <div className="training-info__header">
      <div className="training-info__coach">
        {
          (coachId)
            ?
            <Link to={getUserRoute(coachId)} className="training-info__coach">
              {coachInfo}
            </Link>
            :
            coachInfo
        }
      </div>
    </div>
  );
}

export default TrainingInfoHeader;
