import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { AUTH_NAME, AuthenticationMessage, LoginUserDto } from '@backend/shared/core';
import { getValidationErrorString } from '@backend/shared/helpers';
import { FitUserEntity } from '@backend/account/fit-user';

import { AuthenticationService } from '../authentication.service';

const USERNAME_FIELD_NAME = 'email';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthenticationService) {
    super({
      usernameField: USERNAME_FIELD_NAME,
      passReqToCallback: true
    });
  }

  public async validate(req: Request, email: string, password: string): Promise<FitUserEntity> {
    const bearerAuth: string = req.headers[AUTH_NAME] || '';

    // только анонимный пользователь может войти
    if (bearerAuth) {
      const [, token] = bearerAuth.split(' ');

      throw new BadRequestException([AuthenticationMessage.RequireLogout, 'Token:', token].join(' '));
    }

    const dto = { email, password };
    const error = validateSync(plainToClass(LoginUserDto, dto));

    if (error.length) {
      throw new BadRequestException(getValidationErrorString(error));
    }

    const userEntity = await this.authService.verifyUser({ email, password });

    return userEntity;
  }
}
