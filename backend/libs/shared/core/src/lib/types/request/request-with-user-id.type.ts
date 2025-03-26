import { RequestProperty } from '../../constants/request-property';

export type RequestWithUserId = {
  [RequestProperty.UserId]?: string;
};
