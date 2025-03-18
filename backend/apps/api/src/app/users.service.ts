import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import {
  AccountRoute, CreateUserWithFileIdDto, CreateUserDto,
  ServiceRoute, UserProp, UserWithFileIdRdo, UserRdo
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

  public async registerUser(dto: CreateUserDto, avatarFile: Express.Multer.File, requestId: string): Promise<UserRdo> {
    const avatar = await this.filesService.uploadFile(avatarFile, requestId);
    const createUser: CreateUserWithFileIdDto = { ...dto, [UserProp.AvatarFileId]: avatar?.id };
    const url = this.getUrl(AccountRoute.Register);
    const headers = makeHeaders(requestId);
    const { data: registeredUser } = await this.httpService.axiosRef.post<UserWithFileIdRdo>(url, createUser, headers);
    const avatarSrc = this.filesService.makeSrc(avatar);
    //! перепроверить типизацию, чтобы не было в ответе AvatarFileId, или перечислить или вызвать fillDto В контроллере
    const rdo: UserRdo = { ...registeredUser, avatarSrc };

    return rdo;
  }

  public async getUser(id: string, requestId: string): Promise<UserRdo> {
    const url = this.getUrl(id);
    const headers = makeHeaders(requestId);
    //! UserWithFileIdRdo
    const { data } = await this.httpService.axiosRef.get<UserRdo>(url, headers);

    //! дополнить информацией о файле и перепроверить типизацию
    return data;
  }
}
