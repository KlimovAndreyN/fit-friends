import { ICreateBasicUserDto } from '../dto/i-create-basic-user.dto';
import { User } from '../user.interface';

export interface IBasicDetailUserRdo
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
  id: User['id']; //для обязательности
  birthday?: ICreateBasicUserDto['birthday'];
  registrationDate: string;
};
