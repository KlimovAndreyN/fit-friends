import { Body, Controller, Get, Param, Post, Query, Req, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ApiServiceRoute, TrainingRoute, DetailTrainingRdo, ApiParamOption, IdParam,
  TrainingQuery, BearerAuth, TrainingRdo, RequestWithRequestIdAndUser,
  TrainingsWithPaginationRdo, RequestWithRequestIdAndBearerAuthAndUser,
  VIDEO_FILE_PROPERTY, CreateTrainingDto, parseTrainingVideoFilePipeBuilder
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
    @Req() request: RequestWithRequestIdAndBearerAuthAndUser
  ): Promise<DetailTrainingRdo> {
    const training = await this.fitTrainingService.findById(trainingId, request);

    return training;
  }

  @ApiConsumes('multipart/form-data')
  @ApiResponse({ type: DetailTrainingRdo })
  @UseInterceptors(FileInterceptor(VIDEO_FILE_PROPERTY))
  @UseGuards(CheckRoleCoachGuard)
  @Post()
  public async create(
    @Body() dto: CreateTrainingDto,
    @Req() request: RequestWithRequestIdAndBearerAuthAndUser,
    @UploadedFile(parseTrainingVideoFilePipeBuilder) file: Express.Multer.File
  ): Promise<DetailTrainingRdo> {
    const training = await this.fitTrainingService.create(dto, file, request);

    return training;
  }
}
