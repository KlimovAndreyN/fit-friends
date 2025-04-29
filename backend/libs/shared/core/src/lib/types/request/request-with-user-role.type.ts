import { Role } from '../role.enum';
import { RequestProperty } from '../../constants/request-property';

export type RequestWithUserRole = {
  [RequestProperty.UserRole]?: Role;
};
