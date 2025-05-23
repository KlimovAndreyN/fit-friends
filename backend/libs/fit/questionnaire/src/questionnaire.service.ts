import { Injectable } from '@nestjs/common';

import { CreateBasicQuestionnaireDto, UpdateQuestionnaireDto } from '@backend/shared/core';
import { deleteItem, updateItem } from '@backend/shared/helpers';

import { QuestionnaireRepository } from './questionnaire.repository';
import { QuestionnaireEntity } from './questionnaire.entity';
import { QuestionnaireFactory } from './questionnaire.factory';

@Injectable()
export class QuestionnaireService {
  constructor(
    private readonly questionnaireRepository: QuestionnaireRepository
  ) { }

  public async findByUserId(userId: string): Promise<QuestionnaireEntity> {
    const entity = await this.questionnaireRepository.findByUserId(userId);

    return entity;
  }

  public async create(dto: CreateBasicQuestionnaireDto, userId: string): Promise<QuestionnaireEntity> {
    //! добавить разбор ошибки по уникальности
    // Invalid `prisma.questionnaire.create()` invocation:
    // Unique constraint failed on the fields: (`user_id`)

    const entity: QuestionnaireEntity = QuestionnaireFactory.createFromDto(dto, userId);

    await this.questionnaireRepository.save(entity);

    return entity;
  }

  public async update(dto: UpdateQuestionnaireDto, userId: string): Promise<QuestionnaireEntity> {
    const existsQuestionnaire = await this.findByUserId(userId);
    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existsQuestionnaire[key] !== value) {
        //! для dto.specializations нужно ли Arrai.isArray() и проверить по элементам и existsQuestionnaire[key] = [...value];
        existsQuestionnaire[key] = value;
        hasChanges = true;
      }
    }

    if (hasChanges) {
      await this.questionnaireRepository.update(existsQuestionnaire);
    }

    return existsQuestionnaire;
  }

  //! нужен тип? для string[]
  public async insertFileId(fileId: string, userId: string): Promise<string[]> {
    const questionnaire = await this.findByUserId(userId);
    const { fileIds } = questionnaire;

    fileIds.unshift(fileId);
    await this.questionnaireRepository.update(questionnaire);

    return fileIds;
  }

  //! нужен тип? для string[]
  public async updateFileId(fileId: string, newFileId: string, userId: string): Promise<string[]> {
    const questionnaire = await this.findByUserId(userId);

    questionnaire.fileIds = updateItem(questionnaire.fileIds, fileId, newFileId);
    await this.questionnaireRepository.update(questionnaire);

    return questionnaire.fileIds;
  }

  public async deleteFileId(fileId: string, userId: string): Promise<void> {
    const questionnaire = await this.findByUserId(userId);

    questionnaire.fileIds = deleteItem(questionnaire.fileIds, fileId);
    await this.questionnaireRepository.update(questionnaire);
  }

  public async getReadyForTraining(): Promise<QuestionnaireEntity[]> {
    const entities = await this.questionnaireRepository.getReadyForTraining();

    return entities;
  }
}
