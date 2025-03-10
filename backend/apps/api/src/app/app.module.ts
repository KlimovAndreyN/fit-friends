import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ApiConfigModule } from '@backend/api/config';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

const HTTP_CLIENT_MAX_REDIRECTS = 5;
const HTTP_CLIENT_TIMEOUT = 3000;

@Module({
  imports: [
    ApiConfigModule,
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS
    })
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class AppModule { }
