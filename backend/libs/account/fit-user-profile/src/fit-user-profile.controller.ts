import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ServiceRoute, BasicQuestionnaireRdo, XApiHeaderOptions, QuestionnaireRoute, QuestionnaireMiniRdo } from '@backend/shared/core';
import { fillDto } from '@backend/shared/helpers';
import { InjectUserIdInterceptor } from '@backend/shared/interceptors';

import { FitUserProfileService } from './fit-user-profile.service';

@ApiTags(ServiceRoute.UsersProfiles)
@ApiHeaders(XApiHeaderOptions) //! тут роль или определить по userId
@UseInterceptors(InjectUserIdInterceptor) //! тут роль или определить по userId, что тренер
@Controller(ServiceRoute.UsersProfiles)
export class FitUserProfileController {
  constructor(
    private readonly fitUserProfileService: FitUserProfileService
  ) { }

  //! добавить описание
  //! тут роль или определить по userId, что тренер
  @ApiResponse({ type: QuestionnaireMiniRdo, isArray: true }) //! вынести в описание
  @Get(QuestionnaireRoute.LookForCompany)
  public async getReadyForTraining(): Promise<QuestionnaireMiniRdo[]> {
    const entities = await this.fitUserProfileService.getReadyForTraining();

    return entities.map((entity) => (fillDto(BasicQuestionnaireRdo, entity.toPOJO())));
  }
}
