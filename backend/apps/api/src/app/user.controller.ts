import {
  Body, Controller, Delete, Get, HttpCode, Post, Req,
  UploadedFile, UseFilters, UseGuards, UseInterceptors
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer'; // Express.Multer.File

import {
  AuthenticationApiOperation, AuthenticationApiResponse, BearerAuth, DetailUserRdo,
  LoggedUserRdo, LoginUserDto, RequestWithRequestId, RequestWithRequestIdAndBearerAuth,
  RequestWithTokenPayload, ApiServiceRoute, TokenPayloadRdo, TokensRdo, ApiApiResponse,
  AVATAR_FILE_PROPERTY, parseUserAvatarFilePipeBuilder, AccountRoute, CreateUserDto
} from '@backend/shared/core';
import { makeHeaders } from '@backend/shared/helpers';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';

import { UserService } from './user.service';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { CheckNotAuthGuard } from './guards/check-not-auth.guard';

@ApiTags(ApiServiceRoute.Users)
@Controller(ApiServiceRoute.Users)
@UseFilters(AxiosExceptionFilter)
export class UserController {
  constructor(
    private readonly httpService: HttpService,
    private userService: UserService
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
  public async refreshToken(@Req() { requestId, bearerAuth }: RequestWithRequestIdAndBearerAuth): Promise<TokensRdo> {
    const url = this.userService.getUrl(AccountRoute.Refresh);
    const headers = makeHeaders(requestId, bearerAuth);
    const { data } = await this.httpService.axiosRef.post<TokensRdo>(url, null, headers);

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
    const url = this.userService.getUrl(AccountRoute.Login);
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
    const url = this.userService.getUrl(AccountRoute.Logout);
    const headers = makeHeaders(requestId, bearerAuth);

    await this.httpService.axiosRef.delete(url, headers);
  }

  @ApiOperation(AuthenticationApiOperation.Register)
  @ApiResponse(ApiApiResponse.UserCreated)
  @ApiResponse(AuthenticationApiResponse.UserExist)
  @ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiResponse(AuthenticationApiResponse.Unauthorized)
  @ApiBearerAuth(BearerAuth.AccessToken)
  @ApiConsumes('multipart/form-data')
  @UseGuards(CheckNotAuthGuard)
  @UseInterceptors(FileInterceptor(AVATAR_FILE_PROPERTY))
  @Post(AccountRoute.Register)
  public async register(
    @Body() dto: CreateUserDto,
    @Req() { requestId }: RequestWithRequestId,
    @UploadedFile(parseUserAvatarFilePipeBuilder) avatarFile?: Express.Multer.File
  ): Promise<DetailUserRdo> {
    const registeredUser = await this.userService.registerUser(dto, avatarFile, requestId);

    return registeredUser;
  }
}
