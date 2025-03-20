import { User, UserProp } from './user.interface';

export enum TokenPayloadProp {
  Sub = 'sub'
}

export interface TokenPayload extends Pick<User, 'email' | 'name' | 'role' | 'existQuestionnaire'> {
  [TokenPayloadProp.Sub]: User['id'];
}
