import { FileApiProperty } from './api-property/file.api-property';
import { TrainingApiProperty } from './api-property/training.api-property';
import { UserApiProperty } from './api-property/user.api-property';

export const ApiParamOption = {
  UserId: {
    name: 'userId',
    schema: UserApiProperty.Id
  },
  FileId: {
    name: 'fileId',
    schema: FileApiProperty.Id
  },
  TrainingId: {
    name: 'trainingId',
    schema: TrainingApiProperty.Id
  }
} as const;

export const ParamIdOption = {
  USER: `:${ApiParamOption.UserId.name}`,
  FILE: `:${ApiParamOption.FileId.name}`,
  TRANING: `:${ApiParamOption.TrainingId.name}`
} as const;

//! переделать на ParamId и проверить!
export const USER_ID_PARAM = `:${ApiParamOption.UserId.name}`;
export const FILE_ID_PARAM = `:${ApiParamOption.FileId.name}`;
