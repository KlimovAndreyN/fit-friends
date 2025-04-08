import { ICreateUserWithFileIdDto } from './i-create-user-with-file-id.dto';

export type ILoginUserDto = Pick<
  ICreateUserWithFileIdDto,
  'email'
  | 'password'
>;
