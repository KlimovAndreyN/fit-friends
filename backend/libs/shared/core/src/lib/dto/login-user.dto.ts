import { PickType } from '@nestjs/swagger';

import { ILoginUserDto } from '../interfaces/dto/i-login-user.dto';
import { UserApiDoc } from '../constants/api-doc/user.api-doc';

export class LoginUserDto extends PickType(UserApiDoc, ['email', 'password']) implements ILoginUserDto { }
