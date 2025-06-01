import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import 'multer'; // Express.Multer.File

import {
  AccountRoute, CreateBasicUserDto, CreateUserDto, ServiceRoute,
  DetailUserRdo, Role, BasicDetailUserRdo, convertToDetailUserRdo,
  UpdateUserDto, UpdateBasicUserDto, UserRdo, RequestWithRequestIdAndUser
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

  public async makeDetailUserRdo(rdo: BasicDetailUserRdo, requestId: string): Promise<DetailUserRdo> {
    const { avatarFileId, ...userFields } = rdo;
    const avatarFilePath = await this.fileService.getFilePath(avatarFileId, requestId);

    return { ...userFields, avatarFilePath };
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

  //! где используется ?
  public async getDetailUser(userId: string, currentUserId: string, userRole: Role, requestId: string): Promise<DetailUserRdo> {
    const url = this.getUrl(userId);
    const headers = makeHeaders(requestId, null, currentUserId, userRole);
    const { data } = await this.httpService.axiosRef.get<BasicDetailUserRdo>(url, headers);
    const user = await this.makeDetailUserRdo(data, requestId);

    return user;
  }

  //! где используется ?
  public async getDetailUserFromRequest(request: RequestWithRequestIdAndUser): Promise<DetailUserRdo> {
    const { user: { sub: userId, role }, requestId } = request;

    return this.getDetailUser(userId, userId, role, requestId);
  }

  public async getUser(userId: string, currentUserId: string, userRole: Role, requestId: string): Promise<UserRdo> {
    const detailUser = await this.getDetailUser(userId, currentUserId, userRole, requestId);
    const { name, avatarFilePath } = detailUser;
    const user: UserRdo = { id: userId, name, avatarFilePath };

    return user;
  }
}
