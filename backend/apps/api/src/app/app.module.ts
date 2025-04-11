import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ApiConfigModule } from '@backend/api/config';

import { FileService } from './file.service';
import { UserService } from './user.service';
import { FitQuestionnaireService } from './fit-questionnaire.service';
import { UserController } from './user.controller';
import { UserProfileController } from './user-profile.controller';
import { FitTrainingController } from './fit-training.controller';

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
    UserController,
    UserProfileController,
    FitTrainingController
  ],
  providers: [
    FileService,
    UserService,
    FitQuestionnaireService
  ]
})
export class AppModule { }
