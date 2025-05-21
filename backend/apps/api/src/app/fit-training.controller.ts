import { Body, Controller, Get, Param, Patch, Post, Query, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ApiServiceRoute, TrainingRoute, DetailTrainingRdo, ApiParamOption,
  TrainingQuery, BearerAuth, TrainingRdo, RequestWithRequestIdAndUser,
  IdParam, TrainingsWithPaginationRdo, VIDEO_FILE_PROPERTY,
  CreateTrainingDto, parseTrainingVideoFilePipeBuilder
} from '@backend/shared/core';
import { getQueryString } from '@backend/shared/helpers';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';

import { CheckAuthGuard } from './guards/check-auth.guard';
import { CheckRoleSportsmanGuard } from './guards/check-role-sportsman.guard';
import { CheckRoleCoachGuard } from './guards/check-role-coach.guard';
import { FitTrainingService } from './fit-training.service';

@ApiTags(ApiServiceRoute.Trainings)
@ApiBearerAuth(BearerAuth.AccessToken)
@Controller(ApiServiceRoute.Trainings)
@UseGuards(CheckAuthGuard)
@UseFilters(AxiosExceptionFilter)
export class FitTrainingController {
  constructor(
    private fitTrainingService: FitTrainingService
  ) { }

  @ApiResponse({ type: TrainingsWithPaginationRdo })
  @Get()
  public async index(
    @Query() query: TrainingQuery,
    @Req() request: RequestWithRequestIdAndUser
  ): Promise<TrainingsWithPaginationRdo> {
    const data = await this.fitTrainingService.getTrainings<TrainingsWithPaginationRdo>(getQueryString(query), request);

    return data;
  }

  @UseGuards(CheckRoleSportsmanGuard)
  @ApiResponse({ type: TrainingRdo, isArray: true }) //! вынести в описание
  @Get(TrainingRoute.ForSportsman)
  public async getForSportsman(@Req() request: RequestWithRequestIdAndUser): Promise<TrainingRdo[]> {
    const data = await this.fitTrainingService.getTrainings<TrainingRdo[]>(TrainingRoute.ForSportsman, request);

    return data;
  }

  @UseGuards(CheckRoleSportsmanGuard)
  @ApiResponse({ type: TrainingRdo, isArray: true }) //! вынести в описание
  @Get(TrainingRoute.Special)
  public async getSpecial(@Req() request: RequestWithRequestIdAndUser): Promise<TrainingRdo[]> {
    const data = await this.fitTrainingService.getTrainings<TrainingRdo[]>(TrainingRoute.Special, request);

    return data;
  }

  @UseGuards(CheckRoleSportsmanGuard)
  @ApiResponse({ type: TrainingRdo, isArray: true }) //! вынести в описание
  @Get(TrainingRoute.Popular)
  public async getPopular(@Req() request: RequestWithRequestIdAndUser): Promise<TrainingRdo[]> {
    const data = await this.fitTrainingService.getTrainings<TrainingRdo[]>(TrainingRoute.Popular, request);

    return data;
  }

  @ApiResponse({ type: DetailTrainingRdo })
  @ApiParam(ApiParamOption.TrainingId)
  @Get(IdParam.TRAINING)
  public async show(
    @Param(ApiParamOption.TrainingId.name) trainingId: string,
    @Req() { user: { sub, role }, requestId }: RequestWithRequestIdAndUser
  ): Promise<DetailTrainingRdo> {
    const training = await this.fitTrainingService.findById(trainingId, sub, role, requestId);

    return training;
  }

  @ApiConsumes('multipart/form-data')
  @ApiResponse({ type: DetailTrainingRdo })
  @UseInterceptors(FileInterceptor(VIDEO_FILE_PROPERTY))
  @UseGuards(CheckRoleCoachGuard)
  @Patch(IdParam.TRAINING)
  public async update(
    @Param(ApiParamOption.TrainingId.name) trainingId: string,
    @Body() dto: CreateTrainingDto, //! потом будет UpdateTraningDto
    @Req() { user: { sub, role }, requestId }: RequestWithRequestIdAndUser,
    @UploadedFile(parseTrainingVideoFilePipeBuilder) file: Express.Multer.File
  ): Promise<DetailTrainingRdo> {
    //! протестировать
    const training = await this.fitTrainingService.update(dto, file, sub, role, requestId);

    return training;
  }

  @ApiConsumes('multipart/form-data')
  @ApiResponse({ type: TrainingRdo })
  @UseInterceptors(FileInterceptor(VIDEO_FILE_PROPERTY))
  @UseGuards(CheckRoleCoachGuard)
  @Post()
  public async create(
    @Body() dto: CreateTrainingDto,
    @Req() { user: { sub, role }, requestId }: RequestWithRequestIdAndUser,
    @UploadedFile(parseTrainingVideoFilePipeBuilder) file: Express.Multer.File
  ): Promise<TrainingRdo> {
    const training = await this.fitTrainingService.create(dto, file, sub, role, requestId);

    return training;
  }
}
