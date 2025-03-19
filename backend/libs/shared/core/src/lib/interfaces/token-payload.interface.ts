import { User, UserProp } from './user.interface';

export enum TokenPayloadProp {
  Sub = 'sub',
  ExistQuestionnaire = 'existQuestionnaire'
}

export interface TokenPayload extends Pick<User, UserProp.Email | UserProp.Name | UserProp.Role> {
  [TokenPayloadProp.Sub]: User[UserProp.Id];
  [TokenPayloadProp.ExistQuestionnaire]: boolean;
}
