import {
  ConflictException, UnauthorizedException, HttpException, HttpStatus, Inject,
  Injectable, InternalServerErrorException, Logger, NotFoundException
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { join } from 'path/posix';

import {
  AuthenticationMessage, CreateUserDto, FILE_KEY, FileStorageRoute,
  LoginUserDto, ServiceRoute, Token, UploadedFileRdo, User
} from '@backend/shared/core';
import { createJwtPayload, joinUrl, parseAxiosError, uploadFile } from '@backend/shared/helpers';
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

  public async registerUser(
    dto: CreateUserDto,
    requestId: string,
    avatarFile?: Express.Multer.File
  ): Promise<FitUserEntity> {
    const { email, name, password } = dto;
    const existUser = await this.fitUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthenticationMessage.Exists);
    }

    const fitUser = {
      email,
      name,
      avatarPath: '',
      passwordHash: ''
    };

    if (avatarFile) {
      try {
        const fileRdo = await uploadFile<UploadedFileRdo>(
          joinUrl(this.accountOptions.fileStorageServiceUrl, ServiceRoute.FileStorage, FileStorageRoute.Upload),
          avatarFile,
          FILE_KEY,
          requestId
        );
        const { subDirectory, hashName } = fileRdo

        fitUser.avatarPath = join(subDirectory, hashName);
      } catch (error) {
        this.logger.error(`RegisterUser.FileUploadError: ${parseAxiosError(error)}`);

        throw new InternalServerErrorException('File upload error!');
      }
    }

    const userEntity = new FitUserEntity(fitUser);

    await userEntity.setPassword(password);
    await this.fitUserRepository.save(userEntity);

    await this.notifyService.registerSubscriber({ email, name }, requestId);

    return userEntity;
  }

  public async changeUserPassword(email: string, oldPassword: string, newPassword: string): Promise<void> {
    const userEntity = await this.verifyUser({ email, password: oldPassword });

    await userEntity.setPassword(newPassword);
    await this.fitUserRepository.update(userEntity);
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
