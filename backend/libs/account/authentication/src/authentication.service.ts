import {
  ConflictException, BadRequestException, HttpException, HttpStatus, Inject,
  Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { join } from 'path/posix';

import { AuthenticationMessage, CreateUserDto, FILE_KEY, LoginUserDto, RouteAlias, Token, UploadedFileRdo, User } from '@backend/shared/core';
import { createJWTPayload, joinUrl, parseAxiosError, uploadFile } from '@backend/shared/helpers';
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
    authorizationHeader: string,
    dto: CreateUserDto,
    requestId: string,
    avatarFile?: Express.Multer.File
  ): Promise<FitUserEntity> {
    if (authorizationHeader) {
      throw new BadRequestException(AuthenticationMessage.RequireLogout);
    }

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
          joinUrl(this.accountOptions.fileStorageServiceUrl, RouteAlias.Upload),
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
    const accessTokenPayload = createJWTPayload(user);
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

  public async logout(authorizationHeader: string): Promise<void> {
    if (!authorizationHeader) {
      return;
    }

    this.logger.log('AuthenticationService.logout');
    // доделать позже проверить, что это refreh token... удалить его ...refreshTokenService.deleteRefreshSession...
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
