import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import 'multer'; // Express.Multer.File

import {
  AccountRoute, CreateBasicUserDto, CreateUserDto, ServiceRoute, DetailUserRdo,
  BasicDetailUserRdo, convertToDetailUserRdo, UpdateUserDto, UpdateBasicUserDto, UserRdo,
} from '@backend/shared/core';
import { fillDto, joinUrl, makeHeaders } from '@backend/shared/helpers';
import { apiConfig } from '@backend/api/config';

import { FileService } from './file.service';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    private readonly fileService: FileService,
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>
  ) { }

  public getUrl(route = ''): string {
    return joinUrl(this.apiOptions.accountServiceUrl, ServiceRoute.Account, route);
  }

  public async registerUser(dto: CreateUserDto, avatarFile: Express.Multer.File, requestId: string): Promise<DetailUserRdo> {
    const avatar = await this.fileService.uploadFile(avatarFile, requestId);
    const createUser: CreateBasicUserDto = { ...dto, avatarFileId: avatar?.id };
    const url = this.getUrl(AccountRoute.Register);
    const headers = makeHeaders(requestId);
    const { data: registeredUser } = await this.httpService.axiosRef.post<BasicDetailUserRdo>(url, createUser, headers);
    const avatarFilePath = this.fileService.makePath(avatar);

    return convertToDetailUserRdo(registeredUser, avatarFilePath);
  }

  public async updateUser(dto: UpdateUserDto, avatarFile: Express.Multer.File, bearerAuth: string, requestId: string): Promise<DetailUserRdo> {
    const { emptyAvatarFile } = dto;
    const updateUserDto: UpdateBasicUserDto = fillDto(UpdateBasicUserDto, dto);
    let avatarFilePath = '';

    if (emptyAvatarFile) {
      updateUserDto.avatarFileId = '';
    }
    else {
      const avatar = await this.fileService.uploadFile(avatarFile, requestId);

      if (avatar) {
        updateUserDto.avatarFileId = avatar.id;
        avatarFilePath = this.fileService.makePath(avatar);
      }
    }

    const url = this.getUrl();
    const headers = makeHeaders(requestId, bearerAuth);
    const { data: updateUser } = await this.httpService.axiosRef.patch<BasicDetailUserRdo>(url, updateUserDto, headers);

    return convertToDetailUserRdo(updateUser, avatarFilePath);
  }

  //! role! currentUserId!
  public async getDetailUser(userId: string, bearerAuth: string, requestId: string): Promise<DetailUserRdo> {
    const url = this.getUrl(userId);
    const headers = makeHeaders(requestId, bearerAuth, '11112222', 'sportsman'); //! временно
    const { data } = await this.httpService.axiosRef.get<BasicDetailUserRdo>(url, headers);
    const filePath = await this.fileService.getFilePath(data.avatarFileId, requestId);
    const user: DetailUserRdo = convertToDetailUserRdo(data, filePath);

    return user;
  }

  //! role! currentUserId!
  public async getUser(userId: string, bearerAuth: string, requestId: string): Promise<UserRdo> {
    const detailUser = await this.getDetailUser(userId, bearerAuth, requestId);
    const { name, avatarFilePath } = detailUser;
    const user: UserRdo = { id: userId, name, avatarFilePath };

    return user;
  }
}
