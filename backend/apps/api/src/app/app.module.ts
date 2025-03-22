import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ApiConfigModule } from '@backend/api/config';

import { FilesService } from './files.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FitQuestionnaireController } from './fit-questionnaire.controller';

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
    FitQuestionnaireController
  ],
  providers: [
    FilesService,
    UsersService
  ]
})
export class AppModule { }
