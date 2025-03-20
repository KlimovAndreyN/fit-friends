import { ICreateUserWithFileIdDto } from '../dto/i-create-user-with-file-id.dto';
import { User, UserProp } from '../user.interface';

export interface IUserWithFileIdRdo
  extends Pick<
    User,
    'name' | 'email' | UserProp.MetroStationName | UserProp.BackgroundPath | UserProp.Gender | UserProp.AvatarFileId | UserProp.Role
  > {
  id: User['id'];
  birthday?: ICreateUserWithFileIdDto['birthday'];
  [UserProp.RegistrationDate]: string;
};
