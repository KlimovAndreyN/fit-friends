import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

import { ServiceRoute, CreateQuestionnaireWithFileIdsDto, QuestionnaireWithFileIdsRdo, ApiHeaderOption, RequestWithUserId } from '@backend/shared/core';
import { fillDto } from '@backend/shared/helpers';

import { QuestionnaireService } from './questionnaire.service';

@ApiTags('questionnaire')
@ApiHeader(ApiHeaderOption.RequestId)
@ApiHeader(ApiHeaderOption.UserId)
@Controller(ServiceRoute.Questionnaire)
export class QuestionnaireController {
  constructor(
    private readonly questionnaireService: QuestionnaireService
  ) { }

  //@ApiOperation(AuthenticationApiOperation.Show)
  //@ApiResponse(AuthenticationApiResponse.UserFound)
  @Post()
  public async create(
    @Body() dto: CreateQuestionnaireWithFileIdsDto,
    @Req() { userId }: RequestWithUserId
  ): Promise<QuestionnaireWithFileIdsRdo> {
    const entity = await this.questionnaireService.createQuestionnaireUser(dto, userId);

    return fillDto(QuestionnaireWithFileIdsRdo, entity);
  }

  @Patch()
  public async update(
    @Body() dto: CreateQuestionnaireWithFileIdsDto, //! UpdateDto и не все можно менять!
    @Req() { userId }: RequestWithUserId
  ): Promise<string> {
    //!
    console.log('updateQuestionnaireUser');
    console.log('userId', userId);
    console.log('dto', dto);

    return 'updateQuestionnaireUser';
  }

  @Get()
  public async show(@Req() { userId }: RequestWithUserId): Promise<QuestionnaireWithFileIdsRdo> {
    const entity = await this.questionnaireService.findByUserId(userId);

    return fillDto(QuestionnaireWithFileIdsRdo, entity);
  }
}
