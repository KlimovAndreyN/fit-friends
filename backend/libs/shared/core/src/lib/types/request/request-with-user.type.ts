import { TokenPayloadRdo } from '../../rdo/token-payload.rdo';
import { RequestProperty } from '../../constants/request-property';

export type RequestWithUser = {
  [RequestProperty.User]?: TokenPayloadRdo;
};
