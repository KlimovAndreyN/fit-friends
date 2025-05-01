import { RequestWithBearerAuth } from './request-with-bearer-auth.type';
import { RequestWithRequestId } from './request-with-request-id.type';
import { RequestWithUserId } from './request-with-user-id.type';

export type RequestWithRequestIdAndBearerAuthAndUserId = RequestWithRequestId & RequestWithBearerAuth & RequestWithUserId;
