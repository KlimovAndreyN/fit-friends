import { RequestWithBearerAuth } from './request-with-bearer-auth.type';
import { RequestWithRequestId } from './request-with-request-id.type';

export type RequestWithRequestIdAndBearerAuth = RequestWithRequestId & RequestWithBearerAuth;
