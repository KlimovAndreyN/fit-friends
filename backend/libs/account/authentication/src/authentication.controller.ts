import {
  Body, Controller, Delete, Get, HttpCode, Param,
  Post, Req, UseGuards, UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ApiParamOption, AuthenticationApiOperation, AuthenticationApiResponse, BearerAuth, User,
  LoggedUserRdo, RequestWithRequestId, RequestWithTokenPayload, TokenPayloadRdo, UserWithFileIdRdo,
  AccountRoute, USER_ID_PARAM, LoginUserDto, TokensRdo, ServiceRoute, CreateUserWithFileIdDto,
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
@Controller(ServiceRoute.Account)
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ) { }

  @ApiOperation(AuthenticationApiOperation.Check)
  @ApiResponse(AuthenticationApiResponse.CheckSuccess)
  @ApiResponse(AuthenticationApiResponse.Unauthorized)
  @ApiBearerAuth(BearerAuth.AccessToken)
  @HttpCode(AuthenticationApiResponse.CheckSuccess.status)
  @UseGuards(JwtAuthGuard)
  @Get(AccountRoute.Check)
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload): Promise<TokenPayloadRdo> {
    return fillDto(TokenPayloadRdo, payload);
  }

  @ApiOperation(AuthenticationApiOperation.RefreshTokens)
  @ApiResponse(AuthenticationApiResponse.RefreshTokensSuccess)
  @ApiResponse(AuthenticationApiResponse.Unauthorized)
  @ApiBearerAuth(BearerAuth.RefreshToken)
  @HttpCode(AuthenticationApiResponse.RefreshTokensSuccess.status)
  @UseGuards(JwtRefreshGuard)
  @Post(AccountRoute.Refresh)
  public async refreshToken(@Req() { user }: RequestWithFitUserEntity): Promise<TokensRdo> {
    const tokens = await this.authService.createUserTokens(user);

    return fillDto(TokensRdo, tokens);
  }

  @ApiOperation(AuthenticationApiOperation.Login)
  @ApiResponse(AuthenticationApiResponse.LoggedSuccess)
  @ApiResponse(AuthenticationApiResponse.LoggedError)
  @ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiResponse(AuthenticationApiResponse.Unauthorized)
  @ApiBody({ type: LoginUserDto })
  @UseGuards(LocalAuthGuard)
  @Post(AccountRoute.Login)
  public async login(@Req() { user }: RequestWithFitUserEntity): Promise<LoggedUserRdo> {
    const tokens = await this.authService.createUserTokens(user);
    const { id, name, email, role } = user;
    const data: LoggedUserRdo = { id, name, email, role, tokens };

    return data;
  }

  @ApiOperation(AuthenticationApiOperation.Logout)
  @ApiResponse(AuthenticationApiResponse.LogoutSuccess)
  @ApiResponse(AuthenticationApiResponse.Unauthorized)
  @ApiBearerAuth(BearerAuth.RefreshToken)
  @HttpCode(AuthenticationApiResponse.LogoutSuccess.status)
  @UseGuards(JwtRefreshGuard)
  @Delete(AccountRoute.Logout)
  public async logout(): Promise<void> {
    // RefreshToken будет удален при проверке токена в JwtRefreshStrategy.validate
  }

  @ApiOperation(AuthenticationApiOperation.Register)
  @ApiResponse(AuthenticationApiResponse.UserCreated)
  @ApiResponse(AuthenticationApiResponse.UserExist)
  @ApiResponse(AuthenticationApiResponse.BadRequest)
  @UseInterceptors(InjectBearerAuthInterceptor)
  @Post(AccountRoute.Register)
  public async register(@Body() dto: CreateUserWithFileIdDto, @Req() { requestId }: RequestWithRequestId): Promise<UserWithFileIdRdo> {
    const newUser = await this.authService.registerUser(dto, requestId);

    return fillDto(UserWithFileIdRdo, newUser.toPOJO());
  }

  //! нужно обновление пользователя!
  //@Patch(....)

  @ApiOperation(AuthenticationApiOperation.Show)
  @ApiResponse(AuthenticationApiResponse.UserFound)
  @ApiResponse(AuthenticationApiResponse.UserNotFound)
  @ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiParam(ApiParamOption.UserId)
  @Get(USER_ID_PARAM)
  public async show(@Param(ApiParamOption.UserId.name, MongoIdValidationPipe) userId: User['id']): Promise<UserWithFileIdRdo> {
    const existUser = await this.authService.getUser(userId);

    return fillDto(UserWithFileIdRdo, existUser.toPOJO());
  }
}
