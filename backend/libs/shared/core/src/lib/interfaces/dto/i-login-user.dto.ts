import { UserProp } from '../user.interface';
import { ICreateUserWithFileIdDto } from './i-create-user.dto';

export type ILoginUserDto = Pick<ICreateUserWithFileIdDto, UserProp.Email | UserProp.Password>;
