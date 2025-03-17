import { ICreateUserDto } from './i-create-user.dto';

export type ILoginUserDto = Pick<ICreateUserDto, 'email' | 'password'>;
