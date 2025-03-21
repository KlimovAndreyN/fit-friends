import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { join } from 'path/posix';

import {
  ApiParamOption, AuthenticationApiOperation, AuthenticationApiResponse, User,
  USER_ID_PARAM, ServiceRoute, QuestionnaireRoute, CreateQuestionnaireUserDto
} from '@backend/shared/core';
import { fillDto } from '@backend/shared/helpers';
import { MongoIdValidationPipe } from '@backend/shared/pipes';

import { FitQuestionnaireService } from './fit-questionnaire.service';

const QuestionnaireUserRoute = join(QuestionnaireRoute.User, USER_ID_PARAM);

@ApiTags('questionnaire')
@Controller(ServiceRoute.Questionnaire)
export class FitQuestionnaireController {
  constructor(
    private readonly fitQuestionnaireService: FitQuestionnaireService
  ) { }

  //! проверка есть ли опрос у пользователя true/false/404 user
  //Get(USER_ID_PARAM)

  //@ApiOperation(AuthenticationApiOperation.Show)
  //@ApiResponse(AuthenticationApiResponse.UserFound)
  //@ApiResponse(AuthenticationApiResponse.UserNotFound)
  //@ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiParam(ApiParamOption.UserId)
  @Post(QuestionnaireUserRoute)
  public async createQuestionnaireUser(
    @Param(ApiParamOption.UserId.name, MongoIdValidationPipe) userId: User['id'],
    @Body() dto: CreateQuestionnaireUserDto
  ): Promise<string> {
    console.log('createQuestionnaireUser');
    console.log('userId', userId);
    console.log('dto', dto);

    return 'createQuestionnaireUser';
  }

  @ApiParam(ApiParamOption.UserId)
  @Patch(QuestionnaireUserRoute)
  public async updateQuestionnaireUser(
    @Param(ApiParamOption.UserId.name, MongoIdValidationPipe) userId: User['id'],
    @Body() dto: CreateQuestionnaireUserDto //! UpdateDto и не все можно менять!
  ): Promise<string> {
    console.log('updateQuestionnaireUser');
    console.log('userId', userId);
    console.log('dto', dto);

    return 'updateQuestionnaireUser';
  }

  @ApiParam(ApiParamOption.UserId)
  @Get(QuestionnaireUserRoute)
  public async showQuestionnaireUser(@Param(ApiParamOption.UserId.name, MongoIdValidationPipe) userId: User['id']): Promise<string> {
    console.log('showQuestionnaireUser');
    console.log('userId', userId);

    return 'showQuestionnaireUser';
  }
}
