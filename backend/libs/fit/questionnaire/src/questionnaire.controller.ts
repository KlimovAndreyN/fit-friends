import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ServiceRoute, CreateQuestionnaireWithFileIdsDto, BasicQuestionnaireRdo,
  RequestWithUserId, XApiHeaderOptions, UpdateQuestionnaireDto
} from '@backend/shared/core';
import { fillDto } from '@backend/shared/helpers';

import { QuestionnaireService } from './questionnaire.service';

@ApiTags(ServiceRoute.Questionnaire)
@ApiHeaders(XApiHeaderOptions)
@Controller(ServiceRoute.Questionnaire)
export class QuestionnaireController {
  constructor(
    private readonly questionnaireService: QuestionnaireService
  ) { }

  //! добавить описание
  //@ApiOperation(AuthenticationApiOperation.Show)
  //@ApiResponse(AuthenticationApiResponse.UserFound)
  @ApiResponse({ type: BasicQuestionnaireRdo }) //! вынести в описание
  @Post()
  public async create(
    @Body() dto: CreateQuestionnaireWithFileIdsDto,
    @Req() { userId }: RequestWithUserId
  ): Promise<BasicQuestionnaireRdo> {
    const entity = await this.questionnaireService.create(dto, userId);

    return fillDto(BasicQuestionnaireRdo, entity.toPOJO());
  }

  @ApiResponse({ type: BasicQuestionnaireRdo }) //! вынести в описание
  @Patch()
  public async update(
    @Body() dto: UpdateQuestionnaireDto,
    @Req() { userId }: RequestWithUserId
  ): Promise<BasicQuestionnaireRdo> {
    const entity = await this.questionnaireService.update(dto, userId);

    return fillDto(BasicQuestionnaireRdo, entity.toPOJO());
  }

  @ApiResponse({ type: BasicQuestionnaireRdo }) //! вынести в описание
  @Get()
  public async show(@Req() { userId }: RequestWithUserId): Promise<BasicQuestionnaireRdo> {
    const entity = await this.questionnaireService.findByUserId(userId);

    return fillDto(BasicQuestionnaireRdo, entity.toPOJO());
  }
}
