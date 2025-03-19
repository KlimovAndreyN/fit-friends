import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

import { User, TokenPayload, ConfigAlias } from '@backend/shared/core';

export async function getJwtOptions(configService: ConfigService): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>(ConfigAlias.AppJwtAccessTokenSecret),
    signOptions: {
      expiresIn: configService.get<string>(ConfigAlias.AppJwtAccessTokenExpiresIn),
      algorithm: 'HS256'
    }
  }
}

export function createJwtPayload(user: User): TokenPayload {
  //! тестирование const { id: sub, email, name, role, existQuestionnaire } = user;
  const { id: sub, email, name, role } = user;
  const existQuestionnaire = false

  return { sub, email, name, role, existQuestionnaire };
}
