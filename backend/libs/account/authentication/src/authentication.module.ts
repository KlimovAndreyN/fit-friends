import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { getJwtOptions } from '@backend/shared/helpers';
import { FitUserModule } from '@backend/account/fit-user';
import { NotifyModule } from '@backend/account/notify';
import { RefreshTokenModule } from '@backend/account/refresh-token';

import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

const JwtModuleOption = {
  inject: [ConfigService],
  useFactory: getJwtOptions
}

@Module({
  imports: [
    FitUserModule,
    JwtModule.registerAsync(JwtModuleOption),
    NotifyModule,
    RefreshTokenModule
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
    LocalStrategy,
    JwtRefreshStrategy
  ]
})
export class AuthenticationModule { }
