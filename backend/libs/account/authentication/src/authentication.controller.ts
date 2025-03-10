import {
  Body, Controller, Delete, Get, HttpCode, Param,
  Post, Req, UploadedFile, UseGuards, UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  ApiParamOption, BearerAuth, RequestWithBearerAuth, RequestWithRequestIdAndBearerAuth,
  RequestWithTokenPayload, RouteAlias, USER_ID_PARAM, UserRdo, ApiOperationOption
} from '@backend/shared/core';
import { fillDto } from '@backend/shared/helpers';
import { MongoIdValidationPipe } from '@backend/shared/pipes';
import { InjectBearerAuthInterceptor } from '@backend/shared/interceptors';
import { RequestWithFitUserEntity } from '@backend/account/fit-user';

import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { UserTokenRdo } from './rdo/user-token.rdo';
import { TokenPayloadRdo } from './rdo/token-payload.rdo';
import { AuthenticationApiResponse, AvatarOption, parseFilePipeBuilder } from './authentication.constant';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ) { }

  @ApiOperation(ApiOperationOption.User.Register)
  @ApiResponse(AuthenticationApiResponse.UserCreated)
  @ApiResponse(AuthenticationApiResponse.UserExist)
  @ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiResponse(AuthenticationApiResponse.NotAllow)
  @ApiBearerAuth(BearerAuth.AccessToken) // для тестирования - анонимный пользователь может регистрироваться
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(InjectBearerAuthInterceptor)
  @UseInterceptors(FileInterceptor(AvatarOption.KEY))
  @Post(RouteAlias.Register)
  public async register(
    @Body() dto: CreateUserDto,
    @Req() { requestId, bearerAuth }: RequestWithRequestIdAndBearerAuth,
    @UploadedFile(parseFilePipeBuilder) avatarFile?: Express.Multer.File
  ): Promise<UserRdo> {
    // headers: Authorization - т.к. только анонимный пользователь может регистрироваться
    const newUser = await this.authService.registerUser(bearerAuth, dto, requestId, avatarFile);

    return fillDto(UserRdo, newUser.toPOJO());
  }

  @ApiOperation(ApiOperationOption.User.Login)
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

  @ApiOperation(ApiOperationOption.User.Logout)
  @ApiResponse(AuthenticationApiResponse.LogoutSuccess)
  @ApiBearerAuth(BearerAuth.RefreshToken)
  @UseInterceptors(InjectBearerAuthInterceptor)
  @HttpCode(AuthenticationApiResponse.LogoutSuccess.status)
  @Delete(RouteAlias.Logout)
  public async logout(@Req() { bearerAuth }: RequestWithBearerAuth): Promise<void> {
    await this.authService.logout(bearerAuth);
  }

  @ApiOperation(ApiOperationOption.User.RefreshTokens)
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

  @ApiOperation(ApiOperationOption.User.Check)
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

  @ApiOperation(ApiOperationOption.User.Show)
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
