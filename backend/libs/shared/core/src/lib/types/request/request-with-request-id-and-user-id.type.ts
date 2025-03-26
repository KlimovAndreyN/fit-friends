import { RequestWithRequestId } from './request-with-request-id.type';
import { RequestWithUserId } from './request-with-user-id.type';

export type RequestWithRequestIdAndUserId = RequestWithRequestId & RequestWithUserId;
