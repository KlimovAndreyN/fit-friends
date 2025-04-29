import { RequestWithRequestId } from './request-with-request-id.type';
import { RequestWithUserId } from './request-with-user-id.type';
import { RequestWithUserRole } from './request-with-user-role.type';

export type RequestWithRequestIdAndUserIdAndUserRole = RequestWithRequestId & RequestWithUserId & RequestWithUserRole;
