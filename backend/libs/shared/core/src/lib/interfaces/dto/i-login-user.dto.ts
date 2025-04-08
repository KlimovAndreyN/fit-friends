import { ICreateBasicUserDto } from './i-create-basic-user.dto';

export type ILoginUserDto = Pick<
  ICreateBasicUserDto,
  'email'
  | 'password'
>;
