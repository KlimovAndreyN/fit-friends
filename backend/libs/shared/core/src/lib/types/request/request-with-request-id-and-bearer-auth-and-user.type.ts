import { RequestWithBearerAuth } from './request-with-bearer-auth.type';
import { RequestWithRequestId } from './request-with-request-id.type';
import { RequestWithUser } from './request-with-user.type';

export type RequestWithRequestIdAndBearerAuthAndUser = RequestWithRequestId & RequestWithBearerAuth & RequestWithUser;
