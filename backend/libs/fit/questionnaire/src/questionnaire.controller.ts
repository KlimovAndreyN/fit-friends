import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';

import { ServiceRoute, CreateQuestionnaireWithFileIdsDto, QuestionnaireWithFileIdsRdo, RequestWithUserId, XApiHeaderOptions, UpdateQuestionnaireDto, QuestionnaireRdo } from '@backend/shared/core';
import { fillDto } from '@backend/shared/helpers';

import { QuestionnaireService } from './questionnaire.service';

@ApiTags('questionnaire')
@ApiHeaders(XApiHeaderOptions)
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
    const entity = await this.questionnaireService.create(dto, userId);

    return fillDto(QuestionnaireWithFileIdsRdo, entity);
  }

  @Patch()
  public async update(
    @Body() dto: UpdateQuestionnaireDto,
    @Req() { userId }: RequestWithUserId
  ): Promise<QuestionnaireRdo> {
    const entity = await this.questionnaireService.update(dto, userId);

    return fillDto(QuestionnaireRdo, entity);
  }

  @Get()
  public async show(@Req() { userId }: RequestWithUserId): Promise<QuestionnaireWithFileIdsRdo> {
    const entity = await this.questionnaireService.findByUserId(userId);

    return fillDto(QuestionnaireWithFileIdsRdo, entity);
  }
}
