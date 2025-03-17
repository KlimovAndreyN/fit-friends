import { UserProp } from '../user.interface';
import { ICreateUserDto } from './i-create-user.dto';

export type ILoginUserDto = Pick<ICreateUserDto, UserProp.Email | UserProp.Password>;
