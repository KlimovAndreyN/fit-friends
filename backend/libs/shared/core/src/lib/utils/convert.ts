import { UserWithFileIdRdo } from '../rdo/user-with-file-id.rdo';
import { DetailUserRdo } from '../rdo/detail-user.rdo';

export function convertToUserRdo(user: UserWithFileIdRdo, avatarFilePath: DetailUserRdo['avatarFilePath']): DetailUserRdo {
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
