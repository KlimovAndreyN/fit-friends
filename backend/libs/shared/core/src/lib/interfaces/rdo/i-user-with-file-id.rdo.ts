import { ICreateUserWithFileIdDto } from '../dto/i-create-user-with-file-id.dto';
import { User } from '../user.interface';

export interface IUserWithFileIdRdo
  extends Pick<
    User,
    'name'
    | 'email'
    | 'location'
    | 'backgroundPath'
    | 'gender'
    | 'avatarFileId'
    | 'role'
    | 'about'
  > {
  id: User['id'];
  birthday?: ICreateUserWithFileIdDto['birthday'];
  registrationDate: string;
};
