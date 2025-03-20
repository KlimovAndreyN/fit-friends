import { PickType } from '@nestjs/swagger';

import { ILoginUserDto } from '../interfaces/dto/i-login-user.dto';
import { BaseUserDto } from './base-user.dto';

export class LoginUserDto extends PickType(BaseUserDto, ['email', 'password']) implements ILoginUserDto { }
