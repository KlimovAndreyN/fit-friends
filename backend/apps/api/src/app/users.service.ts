import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import { AccountRoute, CreateUserWithFileIdDto, CreateUserDto, ServiceRoute, UserWithFileIdRdo, UserRdo, convertToUserRdo } from '@backend/shared/core';
import { joinUrl, makeHeaders } from '@backend/shared/helpers';
import { apiConfig } from '@backend/api/config';

import { FilesService } from './files.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly filesService: FilesService,
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>
  ) { }

  public getUrl(route = ''): string {
    return joinUrl(this.apiOptions.accountServiceUrl, ServiceRoute.Account, route);
  }

  public async registerUser(dto: CreateUserDto, avatarFile: Express.Multer.File, requestId: string): Promise<UserRdo> {
    const avatar = await this.filesService.uploadFile(avatarFile, requestId);
    const createUser: CreateUserWithFileIdDto = { ...dto, avatarFileId: avatar?.id };
    const url = this.getUrl(AccountRoute.Register);
    const headers = makeHeaders(requestId);
    const { data: registeredUser } = await this.httpService.axiosRef.post<UserWithFileIdRdo>(url, createUser, headers);
    const avatarPath = this.filesService.makePath(avatar);

    return convertToUserRdo(registeredUser, avatarPath);
  }

  public async getUser(id: string, requestId: string): Promise<UserRdo> {
    const url = this.getUrl(id);
    const headers = makeHeaders(requestId);
    const { data } = await this.httpService.axiosRef.get<UserWithFileIdRdo>(url, headers);
    const filePath = await this.filesService.getFilePath(data.avatarFileId, requestId);
    const user: UserRdo = convertToUserRdo(data, filePath);

    return user;
  }
}
