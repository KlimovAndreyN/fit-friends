import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { join } from 'path/posix';

import {
  ApiParamOption, AuthenticationApiOperation, AuthenticationApiResponse,
  USER_ID_PARAM, ServiceRoute, QuestionnaireRoute, CreateQuestionnaireUserDto
} from '@backend/shared/core';
import { fillDto } from '@backend/shared/helpers';
import { MongoIdValidationPipe } from '@backend/shared/pipes';

import { QuestionnaireService } from './questionnaire.service';

@ApiTags('questionnaire')
@Controller(ServiceRoute.Questionnaire)
export class QuestionnaireController {
  constructor(
    private readonly questionnaireService: QuestionnaireService
  ) { }

  //@ApiOperation(AuthenticationApiOperation.Show)
  //@ApiResponse(AuthenticationApiResponse.UserFound)
  //@ApiResponse(AuthenticationApiResponse.UserNotFound)
  //@ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiParam(ApiParamOption.UserId)
  @Post(USER_ID_PARAM)
  public async create(
    @Param(ApiParamOption.UserId.name, MongoIdValidationPipe) userId: string,
    @Body() dto: CreateQuestionnaireUserDto
  ): Promise<string> {
    console.log('createQuestionnaireUser');
    console.log('userId', userId);
    console.log('dto', dto);

    await this.questionnaireService.createQuestionnaireUser(dto, userId);

    //!
    return 'createQuestionnaireUser';
  }

  @ApiParam(ApiParamOption.UserId)
  @Patch(USER_ID_PARAM)
  public async update(
    @Param(ApiParamOption.UserId.name, MongoIdValidationPipe) userId: string,
    @Body() dto: CreateQuestionnaireUserDto //! UpdateDto и не все можно менять!
  ): Promise<string> {
    console.log('updateQuestionnaireUser');
    console.log('userId', userId);
    console.log('dto', dto);

    return 'updateQuestionnaireUser';
  }

  @ApiParam(ApiParamOption.UserId)
  @Get(USER_ID_PARAM)
  public async show(@Param(ApiParamOption.UserId.name, MongoIdValidationPipe) userId: string): Promise<string> {
    const questionnaire = await this.questionnaireService.findByUserId(userId);
    console.log('showQuestionnaireUser');
    console.log('userId', userId);
    console.log('userId', questionnaire);

    return 'showQuestionnaireUser';
  }
}
