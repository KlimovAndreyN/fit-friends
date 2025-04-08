import { ICreateUserWithFileIdDto } from '../dto/i-create-user-with-file-id.dto';
import { User } from '../user.interface';

export interface IBasicDetailUserRdo
  extends Pick<
    User,
    'id'
    | 'name'
    | 'email'
    | 'location'
    | 'backgroundPath'
    | 'gender'
    | 'avatarFileId'
    | 'role'
    | 'about'
  > {
  birthday?: ICreateUserWithFileIdDto['birthday'];
  registrationDate: string;
};
