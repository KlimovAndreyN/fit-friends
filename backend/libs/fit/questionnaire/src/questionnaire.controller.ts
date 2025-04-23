import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ServiceRoute, CreateBasicQuestionnaireDto, BasicQuestionnaireRdo, RequestWithUserId,
  XApiHeaderOptions, UpdateQuestionnaireDto, QuestionnaireMiniRdo, QuestionnaireRoute
} from '@backend/shared/core';
import { fillDto } from '@backend/shared/helpers';

import { QuestionnaireService } from './questionnaire.service';

@ApiTags(ServiceRoute.Questionnaires)
@ApiHeaders(XApiHeaderOptions)
@Controller(ServiceRoute.Questionnaires)
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
    @Body() dto: CreateBasicQuestionnaireDto,
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

  @ApiResponse({ type: 'string', isArray: true }) //! вынести в описание
  @Patch(QuestionnaireRoute.Files)
  public async insertFileId(
    //! нужен тип
    @Body() dto: { fileId: string },
    @Req() { userId }: RequestWithUserId
  ): Promise<string[]> {
    const fileIds = await this.questionnaireService.insertFileId(dto.fileId, userId);

    return fileIds;
  }

  @ApiResponse({ type: QuestionnaireMiniRdo, isArray: true }) //! вынести в описание
  @Get(QuestionnaireRoute.LookForCompany)
  public async getReadyForTraining(): Promise<QuestionnaireMiniRdo[]> {
    const entities = await this.questionnaireService.getReadyForTraining();

    return entities.map((entity) => (fillDto(BasicQuestionnaireRdo, entity.toPOJO())));
  }
}
