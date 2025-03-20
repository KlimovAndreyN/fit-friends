import { ICreateUserWithFileIdDto } from '../dto/i-create-user-with-file-id.dto';
import { User, UserProp } from '../user.interface';

export interface IUserWithFileIdRdo
  extends Pick<
    User,
    'name' | 'email' | 'metroStationName' | 'backgroundPath' | 'gender' | 'avatarFileId' | 'role'
  > {
  id: User['id'];
  birthday?: ICreateUserWithFileIdDto['birthday'];
  [UserProp.RegistrationDate]: string;
};
