import { User } from '../user.interface';

export type IUpdateUserWithFileIdDto =
  Pick<
    Partial<User>,
    'name'
    | 'about'
    | 'location'
    | 'gender'
    | 'avatarFileId'
  >;
