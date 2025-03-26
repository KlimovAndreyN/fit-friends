import { RequestProperty } from '../../constants/request-property';

export type RequestWithBearerAuth = {
  [RequestProperty.BearerAuth]?: string;
};
