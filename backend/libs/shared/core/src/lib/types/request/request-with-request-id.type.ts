import { RequestProperty } from '../../constants/request-property';

export type RequestWithRequestId = {
  [RequestProperty.RequestId]?: string;
};
