import { PickType } from '@nestjs/swagger';

import { UserProp } from '../interfaces/user.interface';
import { ILoginUserDto } from '../interfaces/dto/i-login-user.dto';
import { BaseUserDto } from './base-user.dto';

export class LoginUserDto extends PickType(BaseUserDto, ['email', UserProp.Password]) implements ILoginUserDto { }
