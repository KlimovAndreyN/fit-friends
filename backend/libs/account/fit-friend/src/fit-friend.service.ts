import { Injectable } from '@nestjs/common';

import { FitFriendRepository } from './fit-friend.repository';
import { FitFriendEntity } from './fit-friend.entity';

@Injectable()
export class FitFriendService {
  constructor(
    private readonly fitFriendRepository: FitFriendRepository
  ) { }

  public async findByUserId(userId: string): Promise<FitFriendEntity> {
    const entity = await this.fitFriendRepository.findByUserId(userId);

    return entity;
  }
}
