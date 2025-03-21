import { Controller, Get, Param, Post, } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ApiParamOption, AuthenticationApiOperation, AuthenticationApiResponse, User,
  UserWithFileIdRdo, USER_ID_PARAM, ServiceRoute
} from '@backend/shared/core';
import { fillDto } from '@backend/shared/helpers';
import { MongoIdValidationPipe } from '@backend/shared/pipes';

import { FitQuestionnaireService } from './fit-questionnaire.service';

@ApiTags('questionnaire')
@Controller(ServiceRoute.Questionnaire)
export class FitQuestionnaireController {
  constructor(
    private readonly fitQuestionnaireService: FitQuestionnaireService
  ) { }

  //@ApiOperation(AuthenticationApiOperation.Show)
  //@ApiResponse(AuthenticationApiResponse.UserFound)
  //@ApiResponse(AuthenticationApiResponse.UserNotFound)
  //@ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiParam(ApiParamOption.UserId)
  @Post(USER_ID_PARAM)
  public async show(@Param(ApiParamOption.UserId.name, MongoIdValidationPipe) userId: User['id']): Promise<string> {
    return 'aaa';
  }
}
