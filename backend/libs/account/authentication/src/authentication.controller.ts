import {
  Body, Controller, Delete, Get, HttpCode, Param,
  Patch, Post, Req, UseGuards, UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  ApiParamOption, AuthenticationApiOperation, AuthenticationApiResponse, BearerAuth,
  LoggedUserRdo, RequestWithRequestId, RequestWithTokenPayload, TokenPayloadRdo,
  AccountRoute, LoginUserDto, TokensRdo, ServiceRoute, User, UpdateBasicUserDto,
  BasicDetailUserRdo, CreateBasicUserDto, IdParam
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
  public async register(
    @Body() dto: CreateBasicUserDto,
    @Req() { requestId }: RequestWithRequestId
  ): Promise<BasicDetailUserRdo> {
    const newUser = await this.authService.registerUser(dto, requestId);

    return fillDto(BasicDetailUserRdo, newUser.toPOJO());
  }

  @ApiResponse({ type: BasicDetailUserRdo }) //! перенести в описание
  @UseGuards(JwtAuthGuard) // разрешено менять только себя, но по правильному и токеп пейлоад обновить там имя... или исключить его из токеп пейлоад
  @Patch()
  public async update(
    @Body() dto: UpdateBasicUserDto,
    @Req() { user: { sub: id } }: RequestWithTokenPayload
  ): Promise<BasicDetailUserRdo> {
    const user = await this.authService.updateUser(id, dto);

    return fillDto(BasicDetailUserRdo, user.toPOJO());
  }

  //! испльзуется? нужен? доступ только авторизированным или себе/по себе?
  @ApiOperation(AuthenticationApiOperation.Show)
  @ApiResponse(AuthenticationApiResponse.UserFound)
  @ApiResponse(AuthenticationApiResponse.UserNotFound)
  @ApiResponse(AuthenticationApiResponse.BadRequest)
  @ApiParam(ApiParamOption.UserId)
  @UseGuards(JwtAuthGuard)
  @Get(IdParam.USER)
  public async show(
    @Param(ApiParamOption.UserId.name, MongoIdValidationPipe) userId: User['id'],
    @Req() { user: { sub, role } }: RequestWithTokenPayload
  ): Promise<BasicDetailUserRdo> {
    const existUser = await this.authService.getUser(userId, sub, role);

    return fillDto(BasicDetailUserRdo, existUser.toPOJO());
  }
}
