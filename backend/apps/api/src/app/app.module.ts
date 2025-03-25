import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ApiConfigModule } from '@backend/api/config';

import { FilesService } from './files.service';
import { UsersService } from './users.service';
import { FitQuestionnaireService } from './fit-questionnaire.service';
import { UsersController } from './users.controller';
import { UserInfoController } from './user-info.controller';

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
  controllers: [
    UsersController,
    UserInfoController
  ],
  providers: [
    FilesService,
    UsersService,
    FitQuestionnaireService
  ]
})
export class AppModule { }
