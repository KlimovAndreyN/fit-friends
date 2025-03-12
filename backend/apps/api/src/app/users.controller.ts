import {
  Body, Controller, Delete, Get, HttpCode, Param, Post,
  Req, UploadedFile, UseFilters, UseGuards, UseInterceptors
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  ApiParamOption, AuthenticationApiOperation, AuthenticationApiResponse, BearerAuth,
  LoggedUserRdo, LoginUserDto, RequestWithRequestId, RequestWithRequestIdAndBearerAuth,
  RequestWithTokenPayload, ApiServiceRoute, TokenPayloadRdo, USER_ID_PARAM, UserTokenRdo,
  UserAvatarOption, parseUserAvatarFilePipeBuilder, CreateUserDto, UserRdo,
  AccountRoute,
} from '@backend/shared/core';
import { dtoToFormData, makeHeaders, multerFileToFormData } from '@backend/shared/helpers';
import { MongoIdValidationPipe } from '@backend/shared/pipes';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';

import { UsersService } from './users.service';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { CheckNotAuthGuard } from './guards/check-not-auth.guard';

@ApiTags(ApiServiceRoute.Users)
@Controller(ApiServiceRoute.Users)
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService,
    private usersService: UsersService
  ) { }

  @ApiOperation(AuthenticationApiOperation.Check)
  @ApiResponse(AuthenticationApiResponse.CheckSuccess)
  @ApiResponse(AuthenticationApiResponse.Unauthorized)
  @ApiBearerAuth(BearerAuth.AccessToken)
  @HttpCode(AuthenticationApiResponse.CheckSuccess.status)
  @UseGuards(CheckAuthGuard)
  @Get(AccountRoute.Check)
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload): Promise<TokenPayloadRdo> {
    return payload;
  }

  @ApiOperation(AuthenticationApiOperation.RefreshTokens)
  @ApiResponse(AuthenticationApiResponse.RefreshTokensSuccess)
  @ApiResponse(AuthenticationApiResponse.Unauthorized)
  @ApiBearerAuth(BearerAuth.RefreshToken)
  @HttpCode(AuthenticationApiResponse.RefreshTokensSuccess.status)
  @Post(AccountRoute.Refresh)
  public async refreshToken(@Req() { requestId, bearerAuth }: RequestWithRequestIdAndBearerAuth): Promise<UserTokenRdo> {
    const url = this.usersService.getUrl(AccountRoute.Refresh);
    const headers = makeHeaders(requestId, bearerAuth);
    const { data } = await this.httpService.axiosRef.post<UserTokenRdo>(url, null, headers);

    return data;
  }

  @ApiOperation(AuthenticationApiOperation.Login)
  @ApiResponse(AuthenticationApiResponse.LoggedSuccess)
  @ApiResponse(AuthenticationApiResponse.LoggedError)
  @ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiResponse(AuthenticationApiResponse.Unauthorized)
  @ApiBearerAuth(BearerAuth.AccessToken)
  @UseGuards(CheckNotAuthGuard)
  @Post(AccountRoute.Login)
  public async login(
    @Body() dto: LoginUserDto,
    @Req() { requestId }: RequestWithRequestId
  ): Promise<LoggedUserRdo> {
    const url = this.usersService.getUrl(AccountRoute.Login);
    const headers = makeHeaders(requestId);
    const { data } = await this.httpService.axiosRef.post<LoggedUserRdo>(url, dto, headers);

    return data;
  }

  @ApiOperation(AuthenticationApiOperation.Logout)
  @ApiResponse(AuthenticationApiResponse.LogoutSuccess)
  @ApiResponse(AuthenticationApiResponse.Unauthorized)
  @ApiBearerAuth(BearerAuth.RefreshToken)
  @HttpCode(AuthenticationApiResponse.LogoutSuccess.status)
  @Delete(AccountRoute.Logout)
  public async logout(@Req() { requestId, bearerAuth }: RequestWithRequestIdAndBearerAuth): Promise<void> {
    const url = this.usersService.getUrl(AccountRoute.Logout);
    const headers = makeHeaders(requestId, bearerAuth);

    await this.httpService.axiosRef.delete(url, headers);
  }

  @ApiOperation(AuthenticationApiOperation.Register)
  @ApiResponse(AuthenticationApiResponse.UserCreated)
  @ApiResponse(AuthenticationApiResponse.UserExist)
  @ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiResponse(AuthenticationApiResponse.Unauthorized)
  @ApiBearerAuth(BearerAuth.AccessToken)
  @ApiConsumes('multipart/form-data')
  @UseGuards(CheckNotAuthGuard)
  @UseInterceptors(FileInterceptor(UserAvatarOption.KEY))
  @Post(AccountRoute.Register)
  public async register(
    @Body() dto: CreateUserDto,
    @Req() { requestId }: RequestWithRequestId,
    @UploadedFile(parseUserAvatarFilePipeBuilder) avatarFile?: Express.Multer.File
  ): Promise<UserRdo> {
    const formData = new FormData();

    dtoToFormData(dto, formData);

    if (avatarFile) {
      multerFileToFormData(avatarFile, formData, UserAvatarOption.KEY);
    }

    const url = this.usersService.getUrl(AccountRoute.Register);
    const headers = makeHeaders(requestId);
    const { data: registerData } = await this.httpService.axiosRef.post<UserRdo>(
      url,
      formData,
      headers
    );

    return registerData;
  }

  @ApiOperation(AuthenticationApiOperation.Show)
  @ApiResponse(AuthenticationApiResponse.UserFound)
  @ApiResponse(AuthenticationApiResponse.UserNotFound)
  @ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiResponse(AuthenticationApiResponse.Unauthorized)
  @ApiParam(ApiParamOption.UserId)
  @ApiBearerAuth(BearerAuth.AccessToken)
  @UseGuards(CheckAuthGuard)
  @Get(USER_ID_PARAM)
  public async show(
    @Param(ApiParamOption.UserId.name, MongoIdValidationPipe) userId: string,
    @Req() { requestId }: RequestWithRequestId
  ): Promise<UserRdo> {
    const user = await this.usersService.getUser(userId, requestId);

    return user;
  }
}
