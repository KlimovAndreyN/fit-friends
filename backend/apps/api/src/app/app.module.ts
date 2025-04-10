import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ApiConfigModule } from '@backend/api/config';

import { FilesService } from './files.service';
import { UsersService } from './users.service';
import { FitQuestionnaireService } from './fit-questionnaire.service';
import { UsersController } from './users.controller';
import { UserInfoController } from './user-info.controller';
import { TrainingController } from './training.controller';

const HttpClient = {
  MAX_REDIRECTS: 5,
  TIMEOUT: 3000
} as const;

@Module({
  imports: [
    ApiConfigModule,
    HttpModule.register({
      timeout: HttpClient.TIMEOUT,
      maxRedirects: HttpClient.MAX_REDIRECTS
    })
  ],
  controllers: [
    UsersController,
    UserInfoController,
    TrainingController
  ],
  providers: [
    FilesService,
    UsersService,
    FitQuestionnaireService
  ]
})
export class AppModule { }
