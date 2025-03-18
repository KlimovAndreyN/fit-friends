import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import {
  AccountRoute, CreateUserWithFileIdDto, CreateUserWithAvatarFileDto,
  ServiceRoute, UserProp, UserRdo, UserWithAvatarFileRdo
} from '@backend/shared/core';
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

  public async registerUser(dto: CreateUserWithAvatarFileDto, avatarFile: Express.Multer.File, requestId: string): Promise<UserWithAvatarFileRdo> {
    //!
    console.log('dto', dto);
    console.log('avatarFile', avatarFile);
    const avatar = await this.filesService.uploadFile(avatarFile, requestId);
    //!
    console.log('avatar', avatar);
    const createUser: CreateUserWithFileIdDto = { ...dto, [UserProp.AvatarFileId]: avatar?.id };
    const url = this.getUrl(AccountRoute.Register);
    const headers = makeHeaders(requestId);
    const { data: registeredUser } = await this.httpService.axiosRef.post<UserRdo>(url, createUser, headers);
    //!
    console.log('registeredUser', registeredUser);
    const avatarSrc = this.filesService.makeSrc(avatar);
    const rdo: UserWithAvatarFileRdo = { ...registeredUser, avatarSrc };
    //!
    console.log('rdo', rdo);

    return rdo;
  }

  public async getUser(id: string, requestId: string): Promise<UserWithAvatarFileRdo> {
    const url = this.getUrl(id);
    const headers = makeHeaders(requestId);
    //! UserRdo
    const { data } = await this.httpService.axiosRef.get<UserWithAvatarFileRdo>(url, headers);

    //! дополнить информацией о файле
    return data;
  }
}
