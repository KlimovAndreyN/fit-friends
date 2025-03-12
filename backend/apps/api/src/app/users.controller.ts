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
  RequestWithTokenPayload, RouteAlias, TokenPayloadRdo, USER_ID_PARAM, UserTokenRdo,
  UserAvatarOption, parseUserAvatarFilePipeBuilder, CreateUserDto, UserRdo
} from '@backend/shared/core';
import { dtoToFormData, makeHeaders, multerFileToFormData } from '@backend/shared/helpers';
import { MongoIdValidationPipe } from '@backend/shared/pipes';
import { AxiosExceptionFilter } from '@backend/shared/exception-filters';

import { UsersService } from './users.service';
import { CheckAuthGuard } from './guards/check-auth.guard';

@ApiTags('users')
@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService,
    private usersService: UsersService
  ) { }

  @ApiOperation(AuthenticationApiOperation.Register)
  @ApiResponse(AuthenticationApiResponse.UserCreated)
  @ApiResponse(AuthenticationApiResponse.UserExist)
  @ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiResponse(AuthenticationApiResponse.NotAllow)
  @ApiBearerAuth(BearerAuth.AccessToken)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor(UserAvatarOption.KEY))
  @Post(RouteAlias.Register)
  public async register(
    @Body() dto: CreateUserDto,
    @Req() { requestId, bearerAuth }: RequestWithRequestIdAndBearerAuth,
    @UploadedFile(parseUserAvatarFilePipeBuilder) avatarFile?: Express.Multer.File
  ): Promise<UserRdo> {
    // можно сразу проверить есть ли bearerAuth, и выкинуть ошибку, что требуется logout, пока передаю в account, там есть проверка
    const formData = new FormData();

    dtoToFormData(dto, formData);

    if (avatarFile) {
      multerFileToFormData(avatarFile, formData, UserAvatarOption.KEY);
    }

    const url = this.usersService.getUrl(RouteAlias.Register);
    // headers: Authorization - т.к. только анонимный пользователь может регистрироваться
    const headers = makeHeaders(requestId, bearerAuth);
    const { data: registerData } = await this.httpService.axiosRef.post<UserRdo>(
      url,
      formData,
      headers
    );

    return registerData;
  }

  @ApiOperation(AuthenticationApiOperation.Login)
  @ApiResponse(AuthenticationApiResponse.LoggedSuccess)
  @ApiResponse(AuthenticationApiResponse.LoggedError)
  @ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiResponse(AuthenticationApiResponse.Unauthorized)
  @Post(RouteAlias.Login)
  public async login(@Body() dto: LoginUserDto, @Req() { requestId }: RequestWithRequestId): Promise<LoggedUserRdo> {
    const url = this.usersService.getUrl(RouteAlias.Login);
    const headers = makeHeaders(requestId);
    const { data } = await this.httpService.axiosRef.post<LoggedUserRdo>(url, dto, headers);

    return data;
  }

  @ApiOperation(AuthenticationApiOperation.Logout)
  @ApiResponse(AuthenticationApiResponse.LogoutSuccess)
  @ApiBearerAuth(BearerAuth.RefreshToken)
  @HttpCode(AuthenticationApiResponse.LogoutSuccess.status)
  @Delete(RouteAlias.Logout)
  public async logout(@Req() { requestId, bearerAuth }: RequestWithRequestIdAndBearerAuth): Promise<void> {
    const url = this.usersService.getUrl(RouteAlias.Logout);
    const headers = makeHeaders(requestId, bearerAuth);

    await this.httpService.axiosRef.delete(url, headers);
  }

  @ApiOperation(AuthenticationApiOperation.RefreshTokens)
  @ApiResponse(AuthenticationApiResponse.RefreshTokens)
  @ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiResponse(AuthenticationApiResponse.Unauthorized)
  @ApiBearerAuth(BearerAuth.RefreshToken)
  @HttpCode(AuthenticationApiResponse.RefreshTokens.status)
  @Post(RouteAlias.Refresh)
  public async refreshToken(@Req() { requestId, bearerAuth }: RequestWithRequestIdAndBearerAuth): Promise<UserTokenRdo> {
    const url = this.usersService.getUrl(RouteAlias.Refresh);
    const headers = makeHeaders(requestId, bearerAuth);
    const { data } = await this.httpService.axiosRef.post<UserTokenRdo>(url, null, headers);

    return data;
  }

  @ApiOperation(AuthenticationApiOperation.Check)
  @ApiResponse(AuthenticationApiResponse.CheckSuccess)
  @ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiResponse(AuthenticationApiResponse.Unauthorized)
  @ApiBearerAuth(BearerAuth.AccessToken)
  @HttpCode(AuthenticationApiResponse.CheckSuccess.status)
  @UseGuards(CheckAuthGuard)
  @Get(RouteAlias.Check)
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload): Promise<TokenPayloadRdo> {
    return payload;
  }

  @ApiOperation(AuthenticationApiOperation.Show)
  @ApiResponse(AuthenticationApiResponse.UserFound)
  @ApiResponse(AuthenticationApiResponse.UserNotFound)
  @ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiParam(ApiParamOption.UserId)
  @Get(USER_ID_PARAM)
  public async show(
    @Param(ApiParamOption.UserId.name, MongoIdValidationPipe) userId: string,
    @Req() { requestId }: RequestWithRequestId
  ): Promise<UserRdo> {
    const user = await this.usersService.getUser(userId, requestId);

    return user;
  }
}
