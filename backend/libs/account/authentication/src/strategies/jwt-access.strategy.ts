import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { TokenPayload } from '@project/shared/core';
import { accountConfig } from '@project/account/config';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(accountConfig.KEY)
    private readonly accountOptions: ConfigType<typeof accountConfig>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: accountOptions.jwt.accessTokenSecret
    });
  }

  public async validate(payload: TokenPayload) {
    return payload;
  }
}
