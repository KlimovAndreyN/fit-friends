import { RequestProperty } from '../../constants/request-property';
import { TokenPayload } from '../../interfaces/token-payload.interface';

export type RequestWithTokenPayload = {
  [RequestProperty.User]?: TokenPayload
};
