import { ICreateBasicUserDto } from '../dto/i-create-basic-user.dto';
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
  birthday?: ICreateBasicUserDto['birthday'];
  registrationDate: string;
};
