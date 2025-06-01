import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import 'multer'; // Express.Multer.File

import { ServiceRoute, AccountInfoRdo, BasicAccountInfoRdo, UserProfileRoute } from '@backend/shared/core';
import { joinUrl, makeHeaders } from '@backend/shared/helpers';
import { apiConfig } from '@backend/api/config';

import { FileService } from './file.service';
import { UserService } from './user.service';
import { FitQuestionnaireService } from './fit-questionnaire.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly httpService: HttpService,
    private readonly fileService: FileService,
    private readonly userService: UserService,
    private readonly fitQuestionnaireService: FitQuestionnaireService,
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>
  ) { }

  private getUrl(route = ''): string {
    return joinUrl(this.apiOptions.accountServiceUrl, ServiceRoute.UsersProfiles, route);
  }

  private async makeAccountInfoRdo(accountInfo: BasicAccountInfoRdo, requestId: string): Promise<AccountInfoRdo> {
    const { user, questionnaire } = accountInfo
    const rdo: AccountInfoRdo = {
      user: await this.userService.makeDetailUserRdo(user, requestId),
      questionnaire: await this.fitQuestionnaireService.makeQuestionnaireRdo(questionnaire, requestId)
    };

    return rdo;
  }

  public async getAccountInfo(userId: string, requestId: string): Promise<AccountInfoRdo> {
    const url = this.getUrl(UserProfileRoute.AccountInfo);
    const headers = makeHeaders(requestId, null, userId);
    const { data } = await this.httpService.axiosRef.get<BasicAccountInfoRdo>(url, headers);

    return this.makeAccountInfoRdo(data, requestId);
  }
}
