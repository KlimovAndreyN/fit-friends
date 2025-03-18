import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import {
  AccountRoute, CreateUserDto, CreateUserWithAvatarFileDto,
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
    const avatar = await this.filesService.uploadFile(avatarFile, requestId);
    const createUserDto: CreateUserDto = { ...dto, [UserProp.AvatarFileId]: avatar?.id };

    const url = this.getUrl(AccountRoute.Register);
    const headers = makeHeaders(requestId);
    const { data: registeredUser } = await this.httpService.axiosRef.post<UserRdo>(url, createUserDto, headers);

    //!
    console.log('dto', dto);
    console.log('avatarFile', avatarFile);
    console.log('avatar', avatar);
    console.log('requestId', requestId);

    /*
     //! дополнить информацией о файле
    const { subDirectory, hashName } = fileRdo
    fitUser.avatarPath = join(subDirectory, hashName);
    */

    return registeredUser as UserWithAvatarFileRdo; //! временно
  }

  public async getUser(id: string, requestId: string): Promise<UserWithAvatarFileRdo> {
    const url = this.getUrl(id);
    const headers = makeHeaders(requestId);
    const { data } = await this.httpService.axiosRef.get<UserWithAvatarFileRdo>(url, headers);

    //! дополнить информацией о файле
    return data;
  }
}
