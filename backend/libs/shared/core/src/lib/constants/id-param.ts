import { ApiParamOption } from './api-param-option';

export const IdParam = {
  USER: `:${ApiParamOption.UserId.name}`,
  FILE: `:${ApiParamOption.FileId.name}`,
  TRAINING: `:${ApiParamOption.TrainingId.name}`
} as const;
