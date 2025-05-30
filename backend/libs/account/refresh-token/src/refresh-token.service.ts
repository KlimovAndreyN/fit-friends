import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import dayjs from 'dayjs';

import { accountConfig } from '@backend/account/config';
import { RefreshTokenPayload } from '@backend/shared/core';
import { parseTime } from '@backend/shared/helpers';

import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshTokenEntity } from './refresh-token.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    @Inject(accountConfig.KEY)
    private readonly accountOptions: ConfigType<typeof accountConfig>
  ) { }

  public async createRefreshSession(payload: RefreshTokenPayload): Promise<void> {
    const timeValue = parseTime(this.accountOptions.jwt.refreshTokenExpiresIn);
    const refreshToken = new RefreshTokenEntity({
      tokenId: payload.tokenId,
      createdAt: new Date(),
      userId: payload.sub,
      expiresIn: dayjs().add(timeValue.value, timeValue.unit).toDate()
    });

    await this.refreshTokenRepository.save(refreshToken);
  }

  public async deleteRefreshSession(tokenId: string): Promise<void> {
    await this.refreshTokenRepository.deleteByTokenId(tokenId);
  }

  public async isExists(tokenId: string): Promise<boolean> {
    const refreshToken = await this.refreshTokenRepository.findByTokenId(tokenId);

    return (refreshToken !== null);
  }

  public async deleteExpiredRefreshTokens(): Promise<void> {
    await this.refreshTokenRepository.deleteExpiredTokens();
  }
}
