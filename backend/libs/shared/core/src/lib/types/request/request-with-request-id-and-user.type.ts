import { RequestWithRequestId } from './request-with-request-id.type';
import { RequestWithUser } from './request-with-user.type';

export type RequestWithRequestIdAndUser = RequestWithRequestId & RequestWithUser;
