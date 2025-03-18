import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import { CreateUserWithAvatarFileDto, ServiceRoute, UserRdo } from '@backend/shared/core';
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

  public async registerUser(dto: CreateUserWithAvatarFileDto, avatarFile: Express.Multer.File, requestId: string): Promise<UserRdo> {
    const avatar = (avatarFile) ? await this.filesService.uploadFile(avatarFile, requestId) : null;

    const registeredUser: UserRdo = { email: '11', id: '11', name: '333', registrationDate: 'asdasds' };

    console.log('dto', dto);
    console.log('avatarFile', avatarFile);
    console.log('avatar', avatar);
    console.log('requestId', requestId);

    return registeredUser;
  }
  /*
    const registeredUser = await this.usersService.registerUser(dto, avatarFile, requestId);

      const formData = new FormData();

      dtoToFormData(dto, formData);



      multerFileToFormData(avatarFile, formData, UserAvatarOption.KEY);

      const url = this.usersService.getUrl(AccountRoute.Register);
      const headers = makeHeaders(requestId);
      const { data: registerData } = await this.httpService.axiosRef.post<UserRdo>(
        url,
        formData,
        headers
      );

      return registerData;
  */

  public async getUser(id: string, requestId: string): Promise<UserRdo> {
    const url = this.getUrl(id);
    const headers = makeHeaders(requestId);
    const { data } = await this.httpService.axiosRef.get<UserRdo>(url, headers);

    return data;
  }
}
