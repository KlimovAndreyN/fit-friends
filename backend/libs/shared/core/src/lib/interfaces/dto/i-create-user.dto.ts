import { CreateUserDto } from '../../dto/create-user.dto';
import { ICreateUserWithFileIdDto } from './i-create-user-with-file-id.dto';

export interface ICreateUserDto extends Omit<ICreateUserWithFileIdDto, 'avatarFileId'> {
  avatarFile?: CreateUserDto['avatarFile'];
}
