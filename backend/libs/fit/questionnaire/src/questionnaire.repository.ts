import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClientService } from '@backend/fit/models';
import { BasePostgresRepository } from '@backend/shared/data-access';
import { Duration, Questionnaire, Specialization, TrainingLevel } from '@backend/shared/core';

import { QuestionnaireEntity } from './questionnaire.entity';
import { QuestionnaireFactory } from './questionnaire.factory';

@Injectable()
export class QuestionnaireRepository extends BasePostgresRepository<QuestionnaireEntity, Questionnaire> {
  constructor(
    entityFactory: QuestionnaireFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async findByUserId(userId: string): Promise<QuestionnaireEntity> {
    const record = await this.client.questionnaire.findFirst({ where: { userId } });

    if (!record) {
      throw new NotFoundException(`Questionnaire for userId ${userId} not found!`);
    }

    const { readyForTraining, caloriesLose, caloriesWaste, description, fileIds, individualTraining } = record;
    const specializations: Specialization[] = record.specializations.map((specialization) => (specialization as Specialization));
    const trainingLevel: TrainingLevel = record.trainingLevel as TrainingLevel;
    const duration: Duration = record.duration as Duration;

    const questionnaire: Questionnaire = {
      userId,
      specializations,
      trainingLevel,
      readyForTraining,
      duration,
      caloriesLose,
      caloriesWaste,
      description,
      fileIds,
      individualTraining
    };

    return this.createEntityFromDocument(questionnaire);
  }

  public async save(entity: QuestionnaireEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();

    await this.client.questionnaire.create({
      data: { ...pojoEntity }
    });
  }

  public async update(entity: QuestionnaireEntity): Promise<void> {
    const { userId } = entity;
    const pojoEntity = entity.toPOJO();

    await this.client.questionnaire.update({
      where: { userId },
      data: { ...pojoEntity }
    });
  }
}
