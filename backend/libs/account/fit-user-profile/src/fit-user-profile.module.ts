import { Module } from '@nestjs/common';

import { FitUserModule } from '@backend/account/fit-user'
import { FitQuestionnaireModule } from '@backend/account/fit-questionnaire'

import { FitUserProfileService } from './fit-user-profile.service';
import { FitUserProfileController } from './fit-user-profile.controller';

@Module({
  imports: [
    FitUserModule,
    FitQuestionnaireModule
  ],
  providers: [
    FitUserProfileService
  ],
  controllers: [FitUserProfileController]
})
export class FitUserProfileModule { }
