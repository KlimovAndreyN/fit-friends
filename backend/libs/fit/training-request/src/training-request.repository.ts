import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { TrainingRequest as PrismaTrainingRequest } from '@prisma/client';
import { PrismaClientService } from '@backend/fit/models';
import { BasePostgresRepository } from '@backend/shared/data-access';
import { TrainingRequest, TrainingRequestStatus } from '@backend/shared/core';

import { TrainingRequestEntity } from './training-request.entity';
import { TrainingRequestFactory } from './training-request.factory';

@Injectable()
export class TrainingRequestRepository extends BasePostgresRepository<TrainingRequestEntity, TrainingRequest> {
  constructor(
    entityFactory: TrainingRequestFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  private convertPrismaTrainingRequest(record: PrismaTrainingRequest): TrainingRequestEntity {
    const { status: statusString, ...recordFields } = record;
    const status = statusString as TrainingRequestStatus;

    return this.createEntityFromDocument({ ...recordFields, status });
  }

  private checkRecord(record: PrismaTrainingRequest): void {
    if (!record) {
      //! вынести в константы
      throw new NotFoundException('Request not found!');
    }
  }

  public async findById(id: string): Promise<TrainingRequestEntity> {
    const record = await this.client.trainingRequest.findFirst({ where: { id } });

    this.checkRecord(record);

    return this.convertPrismaTrainingRequest(record);
  }

  public async find(initiatorId: string, userId: string): Promise<TrainingRequestEntity> {
    const record = await this.client.trainingRequest.findFirst({ where: { initiatorId, userId } });

    this.checkRecord(record);

    return this.convertPrismaTrainingRequest(record);
  }

  public async save(entity: TrainingRequestEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    try {
      const record = await this.client.trainingRequest.create({
        data: { ...pojoEntity }
      });

      entity.id = record.id;
      entity.createdAt = record.createdAt;
      entity.updatedAt = record.updatedAt;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      throw new ConflictException('Request already exsist!');
    }
  }

  public async update(entity: TrainingRequestEntity): Promise<void> {
    const { id } = entity;
    const pojoEntity = entity.toPOJO();

    //! тут можно проанализировать только изменные поля
    await this.client.trainingRequest.update({
      where: { id },
      data: { ...pojoEntity }
    });
  }
}
