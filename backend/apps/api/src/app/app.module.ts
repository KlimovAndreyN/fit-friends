import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ApiConfigModule } from '@backend/api/config';

import { FileService } from './file.service';
import { UserService } from './user.service';
import { AccountService } from './account.service';
import { FitQuestionnaireService } from './fit-questionnaire.service';
import { UserProfileService } from './user-profile.service';
import { FitTrainingService } from './fit-training.service';
import { FitReviewService } from './fit-review.service';
import { UserController } from './user.controller';
import { AccountController } from './account.controller';
import { UserProfileController } from './user-profile.controller';
import { FitTrainingController } from './fit-training.controller';
import { FitReviewController } from './fit-review.controller';

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
    AccountController,
    UserProfileController,
    FitTrainingController,
    FitReviewController
  ],
  providers: [
    FileService,
    UserService,
    AccountService,
    FitQuestionnaireService,
    UserProfileService,
    FitTrainingService,
    FitReviewService
  ]
})
export class AppModule { }
