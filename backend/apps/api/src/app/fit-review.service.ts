import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import { RequestWithRequestIdAndUserId, ServiceRoute, ReviewRdo, BasicReviewRdo } from '@backend/shared/core';
import { joinUrl, makeHeaders } from '@backend/shared/helpers';
import { apiConfig } from '@backend/api/config';

import { UserService } from './user.service';

@Injectable()
export class FitReviewService {
  constructor(
    private readonly httpService: HttpService,
    private userService: UserService,
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>
  ) { }

  private getUrl(route = ''): string {
    return joinUrl(this.apiOptions.fitServiceUrl, ServiceRoute.Reviews, route);
  }

  public async getReviews(trainingId: string, { userId: currentUserId, requestId }: RequestWithRequestIdAndUserId): Promise<ReviewRdo[]> {
    const url = this.getUrl(trainingId);
    const headers = makeHeaders(requestId, null, currentUserId);
    const { data } = await this.httpService.axiosRef.get<BasicReviewRdo[]>(url, headers);
    const reviews = [];

    for (const item of data) {
      const { userId, ...fields } = item;
      const user = await this.userService.getUser(userId, requestId, currentUserId);
      const review: ReviewRdo = { ...fields, user };

      reviews.push(review);
    }

    return reviews;
  }
}
