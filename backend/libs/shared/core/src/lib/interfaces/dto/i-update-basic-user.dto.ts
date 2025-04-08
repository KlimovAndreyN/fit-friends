import { User } from '../user.interface';

export type IUpdateBasicUserDto =
  Pick<
    Partial<User>,
    'name'
    | 'about'
    | 'location'
    | 'gender'
    | 'avatarFileId'
  >;
