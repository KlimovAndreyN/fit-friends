import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

import { User, TokenPayload, ConfigAlias } from '@project/shared/core';

export async function getJwtOptions(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>(ConfigAlias.AppJwtAccessTokenSecret),
    signOptions: {
      expiresIn: configService.get<string>(ConfigAlias.AppJwtAccessTokenExpiresIn),
      algorithm: 'HS256'
    }
  }
}

export function createJWTPayload(user: User): TokenPayload {
  return {
    sub: user.id,
    email: user.email,
    name: user.name
  };
}
