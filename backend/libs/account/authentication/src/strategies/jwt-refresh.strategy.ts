import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';

import { RefreshTokenPayload } from '@backend/shared/core';
import { accountConfig } from '@backend/account/config';
import { RefreshTokenService } from '@backend/account/refresh-token';

import { AuthenticationService } from '../authentication.service';
import { TokenNotExistsException } from '../exceptions/token-not-exists.exception';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(accountConfig.KEY)
    private readonly accountOptions: ConfigType<typeof accountConfig>,
    private readonly authService: AuthenticationService,
    private readonly refreshTokenService: RefreshTokenService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: accountOptions.jwt.refreshTokenSecret
    });
  }

  public async validate(payload: RefreshTokenPayload) {
    const exists = await this.refreshTokenService.isExists(payload.tokenId);

    if (!exists) {
      throw new TokenNotExistsException(payload.tokenId);
    }

    await this.refreshTokenService.deleteRefreshSession(payload.tokenId);
    await this.refreshTokenService.deleteExpiredRefreshTokens();

    return this.authService.getUserByEmail(payload.email);
  }
}
