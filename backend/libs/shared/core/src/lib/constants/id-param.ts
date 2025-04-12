import { ApiParamOption } from './api-param-option';

export const IdParam = {
  USER: `:${ApiParamOption.UserId}`,
  FILE: `:${ApiParamOption.FileId}`,
  TRAINING: `:${ApiParamOption.TrainingId}`
} as const;
