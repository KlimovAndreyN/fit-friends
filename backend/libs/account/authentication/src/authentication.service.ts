import {
  ConflictException, UnauthorizedException, HttpException, HttpStatus, Inject,
  Injectable, Logger, NotFoundException
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AuthenticationMessage, AuthUser, CreateUserWithFileIdDto, LoginUserDto, Token, User } from '@backend/shared/core';
import { createJwtPayload } from '@backend/shared/helpers';
import { FitUserRepository, FitUserEntity } from '@backend/account/fit-user';
import { accountConfig } from '@backend/account/config';
import { NotifyService } from '@backend/account/notify';
import { RefreshTokenService } from '@backend/account/refresh-token';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly fitUserRepository: FitUserRepository,
    private readonly jwtService: JwtService,
    private readonly notifyService: NotifyService,
    @Inject(accountConfig.KEY)
    private readonly accountOptions: ConfigType<typeof accountConfig>,
    private readonly refreshTokenService: RefreshTokenService
  ) { }

  public async registerUser(dto: CreateUserWithFileIdDto, requestId: string): Promise<FitUserEntity> {
    const {
      email,
      name,
      password,
      backgroundPath,
      gender,
      metroStationName,
      role,
      avatarFileId,
      birthday
    } = dto;
    const existUser = await this.fitUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthenticationMessage.Exists);
    }

    const fitUser: AuthUser = {
      email,
      name,
      backgroundPath,
      gender,
      metroStationName,
      role,
      avatarFileId,
      birthday: (birthday) ? new Date(birthday) : undefined,
      passwordHash: ''
    };

    const userEntity = new FitUserEntity(fitUser);

    await userEntity.setPassword(password);
    await this.fitUserRepository.save(userEntity);

    await this.notifyService.registerSubscriber({ email, name }, requestId);

    return userEntity;
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessTokenPayload = createJwtPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };

    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.accountOptions.jwt.refreshTokenSecret,
        expiresIn: this.accountOptions.jwt.refreshTokenExpiresIn
      });

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error(`Token generation error: ${error.message}`);

      throw new HttpException('Ошибка при создании токена.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getUser(id: string): Promise<FitUserEntity> {
    const user = await this.fitUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AuthenticationMessage.NotFound);
    }

    return user;
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.fitUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }

  public async verifyUser(dto: LoginUserDto): Promise<FitUserEntity> {
    const { email, password } = dto;
    const existUser = await this.getUserByEmail(email);

    const isCorrectPassword = await existUser.comparePassword(password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException(AuthenticationMessage.WrongPassword);
    }

    return existUser;
  }
}
