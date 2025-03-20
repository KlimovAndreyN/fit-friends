import { ICreateUserWithFileIdDto } from './i-create-user-with-file-id.dto';

export interface ICreateUserDto extends Omit<ICreateUserWithFileIdDto, 'avatarFileId'> {
  avatarFile?: File;
}
