import {
  ConflictException, UnauthorizedException, HttpException, HttpStatus,
  Inject, Injectable, Logger, NotFoundException, ForbiddenException
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'node:crypto';

import {
  AuthenticationMessage, AuthUser, CreateBasicUserDto, User,
  isCoachRole, LoginUserDto, Role, Tokens, UpdateBasicUserDto
} from '@backend/shared/core';
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

  public async registerUser(dto: CreateBasicUserDto, requestId: string): Promise<FitUserEntity> {
    const {
      email,
      name,
      password,
      backgroundPath,
      gender,
      location,
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
      location,
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

  public async updateUser(id: string, dto: UpdateBasicUserDto): Promise<FitUserEntity> {
    const existUser = await this.fitUserRepository.findById(id);

    let hasChanges = false;

    //! есть несколько таких мест - вытащить в однин хелпер / QuestionnaireService.update
    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existUser[key] !== value) {
        existUser[key] = value;
        hasChanges = true;
      }
    }

    if (hasChanges) {
      await this.fitUserRepository.update(existUser);
    }

    return existUser;
  }

  public async createUserTokens(user: User): Promise<Tokens> {
    const accessTokenPayload = createJwtPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: randomUUID() };

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

      throw new HttpException('Error creating token.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getUser(id: string, currentUserId: string, role: Role): Promise<FitUserEntity> {
    console.log('currentUserId', currentUserId);
    console.log('role', role);

    const foundUser = await this.fitUserRepository.findById(id);

    if (!foundUser) {
      throw new NotFoundException(AuthenticationMessage.NotFound);
    }

    const { id: foundUserId, role: foundUserRole } = foundUser;

    //! ограничение: тренеру нельзя просматривать других тренеров, кроме себя, будет такое по ТЗ?
    if (isCoachRole(role) && (currentUserId !== foundUserId) && isCoachRole(foundUserRole)) {
      throw new ForbiddenException('Not allow to view other coach!'); //! в описание AuthenticationMessage
    }

    return foundUser;
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
