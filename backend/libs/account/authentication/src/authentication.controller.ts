import {
  Body, Controller, Delete, Get, HttpCode, Param,
  Post, Req, UploadedFile, UseGuards, UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  ApiParamOption, AuthenticationApiOperation, AuthenticationApiResponse, BearerAuth,
  LoggedUserRdo, RequestWithBearerAuth, RequestWithRequestId, RequestWithTokenPayload,
  RouteAlias, TokenPayloadRdo, USER_ID_PARAM, UserRdo, LoginUserDto, UserTokenRdo,
  parseUserAvatarFilePipeBuilder, UserAvatarOption, CreateUserDto
} from '@backend/shared/core';
import { fillDto } from '@backend/shared/helpers';
import { MongoIdValidationPipe } from '@backend/shared/pipes';
import { InjectBearerAuthInterceptor } from '@backend/shared/interceptors';
import { RequestWithFitUserEntity } from '@backend/account/fit-user';

import { AuthenticationService } from './authentication.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ) { }

  @ApiOperation(AuthenticationApiOperation.Register)
  @ApiResponse(AuthenticationApiResponse.UserCreated)
  @ApiResponse(AuthenticationApiResponse.UserExist)
  @ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(InjectBearerAuthInterceptor)
  @UseInterceptors(FileInterceptor(UserAvatarOption.KEY))
  @Post(RouteAlias.Register)
  public async register(
    @Body() dto: CreateUserDto,
    @Req() { requestId }: RequestWithRequestId,
    @UploadedFile(parseUserAvatarFilePipeBuilder) avatarFile?: Express.Multer.File
  ): Promise<UserRdo> {
    // headers: Authorization - т.к. только анонимный пользователь может регистрироваться
    const newUser = await this.authService.registerUser(dto, requestId, avatarFile);

    return fillDto(UserRdo, newUser.toPOJO());
  }

  @ApiOperation(AuthenticationApiOperation.Login)
  @ApiResponse(AuthenticationApiResponse.LoggedSuccess)
  @ApiResponse(AuthenticationApiResponse.LoggedError)
  @ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiResponse(AuthenticationApiResponse.Unauthorized)
  @ApiBody({ type: LoginUserDto })
  @UseGuards(LocalAuthGuard)
  @Post(RouteAlias.Login)
  public async login(@Req() { user }: RequestWithFitUserEntity): Promise<LoggedUserRdo> {
    const userToken = await this.authService.createUserToken(user);

    return fillDto(LoggedUserRdo, { ...user.toPOJO(), ...userToken });
  }

  @ApiOperation(AuthenticationApiOperation.Logout)
  @ApiResponse(AuthenticationApiResponse.LogoutSuccess)
  @ApiBearerAuth(BearerAuth.RefreshToken)
  @UseInterceptors(InjectBearerAuthInterceptor) //! ?
  @HttpCode(AuthenticationApiResponse.LogoutSuccess.status)
  @UseGuards(JwtRefreshGuard) //! ?
  @Delete(RouteAlias.Logout)
  public async logout(@Req() { bearerAuth }: RequestWithBearerAuth): Promise<void> {
    await this.authService.logout(bearerAuth);
  }

  @ApiOperation(AuthenticationApiOperation.RefreshTokens)
  @ApiResponse(AuthenticationApiResponse.RefreshTokens)
  @ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiResponse(AuthenticationApiResponse.Unauthorized)
  @ApiBearerAuth(BearerAuth.RefreshToken)
  @HttpCode(AuthenticationApiResponse.RefreshTokens.status)
  @UseGuards(JwtRefreshGuard)
  @Post(RouteAlias.Refresh)
  public async refreshToken(@Req() { user }: RequestWithFitUserEntity): Promise<UserTokenRdo> {
    const userToken = await this.authService.createUserToken(user);

    return fillDto(UserTokenRdo, userToken);
  }

  @ApiOperation(AuthenticationApiOperation.Check)
  @ApiResponse(AuthenticationApiResponse.CheckSuccess)
  @ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiResponse(AuthenticationApiResponse.Unauthorized)
  @ApiBearerAuth(BearerAuth.AccessToken)
  @HttpCode(AuthenticationApiResponse.CheckSuccess.status)
  @UseGuards(JwtAuthGuard)
  @Get(RouteAlias.Check)
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload): Promise<TokenPayloadRdo> {
    return fillDto(TokenPayloadRdo, payload);
  }

  @ApiOperation(AuthenticationApiOperation.Show)
  @ApiResponse(AuthenticationApiResponse.UserFound)
  @ApiResponse(AuthenticationApiResponse.UserNotFound)
  @ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiParam(ApiParamOption.UserId)
  @Get(USER_ID_PARAM)
  public async show(@Param(ApiParamOption.UserId.name, MongoIdValidationPipe) userId: string): Promise<UserRdo> {
    const existUser = await this.authService.getUser(userId);

    return fillDto(UserRdo, existUser.toPOJO());
  }
}
