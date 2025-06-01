import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import 'multer'; // Express.Multer.File

import { ServiceRoute, AccountInfoRdo, BasicAccountInfoRdo, UserProfileRoute } from '@backend/shared/core';
import { joinUrl, makeHeaders } from '@backend/shared/helpers';
import { apiConfig } from '@backend/api/config';

import { FileService } from './file.service';
import { FitQuestionnaireService } from './fit-questionnaire.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly httpService: HttpService,
    private readonly fileService: FileService,
    private readonly fitQuestionnaireService: FitQuestionnaireService,
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>
  ) { }

  private getUrl(route = ''): string {
    return joinUrl(this.apiOptions.accountServiceUrl, ServiceRoute.UsersProfiles, route);
  }

  private async convertToAccountInfoRdo(
    accountInfo: BasicAccountInfoRdo,
    avatarFilePath: AccountInfoRdo['user']['avatarFilePath'],
    requestId: string
  ): Promise<AccountInfoRdo> {
    const { user, questionnaire } = accountInfo
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { avatarFileId, ...userFields } = user;
    const rdo: AccountInfoRdo = {
      user: { ...userFields, avatarFilePath },
      questionnaire: await this.fitQuestionnaireService.convertToQuestionnaireRdo(questionnaire, requestId)
    };

    return rdo;
  }

  public async getAccountInfo(userId: string, requestId: string): Promise<AccountInfoRdo> {
    const url = this.getUrl(UserProfileRoute.AccountInfo);
    const headers = makeHeaders(requestId, null, userId);
    const { data } = await this.httpService.axiosRef.get<BasicAccountInfoRdo>(url, headers);
    const filePath = await this.fileService.getFilePath(data.user.avatarFileId, requestId);

    return this.convertToAccountInfoRdo(data, filePath, requestId);
  }
}
