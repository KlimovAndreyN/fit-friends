import { User, UserProp } from './user.interface';

export enum TokenPayloadProp {
  Sub = 'sub'
}

export interface TokenPayload extends Pick<User, UserProp.Email | UserProp.Name | UserProp.Role> {
  [TokenPayloadProp.Sub]: User[UserProp.Id];
}
