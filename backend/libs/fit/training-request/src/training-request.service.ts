import { Injectable } from '@nestjs/common';

import { Role, TrainingRequestStatus } from '@backend/shared/core';

import { TrainingRequestRepository } from './training-request.repository';
import { TrainingRequestEntity } from './training-request.entity';

@Injectable()
export class TrainingRequestService {
  constructor(
    private readonly trainingRequestRepository: TrainingRequestRepository
  ) { }

  public async findToUserId(initiatorId: string, userId: string): Promise<TrainingRequestEntity> {
    //! отладка
    console.log('TrainingRequestService.findToUserId');
    console.log('initiatorId', initiatorId);
    console.log('initiatorId', userId);
    return null;
  }

  public async create(
    dto: { userId: string; }, //! нужен свой DTO
    initiatorId: string,
    initiatorRole: Role
  ): Promise<TrainingRequestEntity> {
    //! проверить роль, тренерам нельзя
    //! начальный статус на рассмотрении
    console.log('TrainingRequestService.create');
    console.log('dto', dto);
    console.log('initiatorId', initiatorId);
    console.log('initiatorRole', initiatorRole);
    return null;
  }

  public async updateById(
    dto: { status: TrainingRequestStatus; },//! нужен свой DTO
    trainingRequestId: string,
    userId: string
  ): Promise<TrainingRequestEntity> {
    //! проверить, что в запросе userId = userId и что может отвечать...
    //! проверить, что статус не равен исходному
    //! отладка
    console.log('TrainingRequestService.findToUserId');
    console.log('dto', dto);
    console.log('trainingRequestId', trainingRequestId);
    console.log('initiatorId', userId);
    return null;
  }
}
