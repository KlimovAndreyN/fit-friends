import { BasicDetailUserRdo } from '../rdo/basic-detail-user.rdo';
import { DetailUserRdo } from '../rdo/detail-user.rdo';

export function convertToDetailUserRdo(user: BasicDetailUserRdo, avatarFilePath: DetailUserRdo['avatarFilePath']): DetailUserRdo {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { avatarFileId, ...userFields } = user;
  const rdo: DetailUserRdo = { ...userFields, avatarFilePath };

  return rdo;
}
