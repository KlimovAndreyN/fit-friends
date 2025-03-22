import {
  Body, Controller, Delete, Get, HttpCode, Inject, Param, Post,
  Req, UploadedFile, UseFilters, UseGuards, UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { ConfigType } from '@nestjs/config';
import { join } from 'path/posix';

import {
  ApiParamOption, AuthenticationApiOperation, AuthenticationApiResponse, BearerAuth,
  LoggedUserRdo, LoginUserDto, RequestWithRequestId, RequestWithRequestIdAndBearerAuth,
  RequestWithTokenPayload, ApiServiceRoute, TokenPayloadRdo, USER_ID_PARAM, UserTokenRdo,
  UserAvatarOption, parseUserAvatarFilePipeBuilder, AccountRoute, CreateUserDto,
  UserRdo, ApiApiResponse,
  QuestionnaireRoute,
  ServiceRoute
} from '@backend/shared/core';
import { joinUrl, makeHeaders } from '@backend/shared/helpers';
import { MongoIdValidationPipe } from '@backend/shared/pipes';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';
import { apiConfig } from '@backend/api/config';

import { CheckAuthGuard } from './guards/check-auth.guard';

@ApiTags(ApiServiceRoute.FitQuestionnaires)
@ApiBearerAuth(BearerAuth.AccessToken)
@Controller(ApiServiceRoute.FitQuestionnaires)
@UseFilters(AxiosExceptionFilter)
export class FitQuestionnaireController {
  constructor(
    private readonly httpService: HttpService,
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>
  ) { }

  @UseGuards(CheckAuthGuard)
  @ApiParam(ApiParamOption.UserId)
  @Get(join(QuestionnaireRoute.Exist, USER_ID_PARAM))
  public async existQuestionnaire(
    @Param(ApiParamOption.UserId.name, MongoIdValidationPipe) userId: string,
    @Req() { requestId, bearerAuth }: RequestWithRequestIdAndBearerAuth
  ): Promise<boolean> {
    const url = joinUrl(this.apiOptions.fitServiceUrl, ServiceRoute.Questionnaire, QuestionnaireRoute.Exist, userId);
    const headers = makeHeaders(requestId, bearerAuth);
    const { data } = await this.httpService.axiosRef.get<boolean>(url, headers);

    console.log('existQuestionnaire');
    console.log('userId', userId);

    return data;
  }
}
