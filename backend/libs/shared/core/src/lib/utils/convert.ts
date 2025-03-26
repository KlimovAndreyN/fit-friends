import { UserWithFileIdRdo } from '../rdo/user-with-file-id.rdo';
import { UserRdo } from '../rdo/user.rdo';

export function convertToUserRdo(user: UserWithFileIdRdo, avatarFilePath: UserRdo['avatarFilePath']): UserRdo {
  const {
    id,
    name,
    email,
    birthday,
    backgroundPath,
    gender,
    metroStationName,
    registrationDate,
    role
  } = user;
  const rdo: UserRdo = {
    id,
    name,
    email,
    birthday,
    backgroundPath,
    gender,
    metroStationName,
    registrationDate,
    role,
    avatarFilePath
  };

  return rdo;
}
