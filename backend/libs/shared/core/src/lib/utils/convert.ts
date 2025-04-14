import { BasicDetailUserRdo } from '../rdo/basic-detail-user.rdo';
import { DetailUserRdo } from '../rdo/detail-user.rdo';

export function convertToDetailUserRdo(user: BasicDetailUserRdo, avatarFilePath: DetailUserRdo['avatarFilePath']): DetailUserRdo {
  const {
    id,
    name,
    about,
    email,
    birthday,
    backgroundPath,
    gender,
    location,
    registrationDate,
    role
  } = user;
  const rdo: DetailUserRdo = {
    id,
    name,
    about,
    email,
    birthday,
    backgroundPath,
    gender,
    location,
    registrationDate,
    role,
    avatarFilePath
  };

  return rdo;
}
