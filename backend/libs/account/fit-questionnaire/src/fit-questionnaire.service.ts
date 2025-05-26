import { Injectable } from '@nestjs/common';

import { CreateBasicQuestionnaireDto, UpdateQuestionnaireDto } from '@backend/shared/core';
import { deleteItem, updateItem } from '@backend/shared/helpers';

import { FitQuestionnaireRepository } from './fit-questionnaire.repository';
import { FitQuestionnaireEntity } from './fit-questionnaire.entity';
import { FitQuestionnaireFactory } from './fit-questionnaire.factory';

@Injectable()
export class FitQuestionnaireService {
  constructor(
    private readonly fitQuestionnaireRepository: FitQuestionnaireRepository
  ) { }

  public async findByUserId(userId: string): Promise<FitQuestionnaireEntity> {
    const entity = await this.fitQuestionnaireRepository.findByUserId(userId);

    return entity;
  }

  public async create(dto: CreateBasicQuestionnaireDto, userId: string): Promise<FitQuestionnaireEntity> {
    //! добавить разбор ошибки по уникальности
    // Invalid `prisma.questionnaire.create()` invocation: - ! теперь Mongo !
    // Unique constraint failed on the fields: (`user_id`)

    const entity: FitQuestionnaireEntity = FitQuestionnaireFactory.createFromDto(dto, userId);

    await this.fitQuestionnaireRepository.save(entity);

    return entity;
  }

  public async update(dto: UpdateQuestionnaireDto, userId: string): Promise<FitQuestionnaireEntity> {
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
      await this.fitQuestionnaireRepository.update(existsQuestionnaire);
    }

    return existsQuestionnaire;
  }

  //! нужен тип? для string[]
  public async insertFileId(fileId: string, userId: string): Promise<string[]> {
    const questionnaire = await this.findByUserId(userId);
    const { fileIds } = questionnaire;

    fileIds.unshift(fileId);
    await this.fitQuestionnaireRepository.update(questionnaire);

    return fileIds;
  }

  //! нужен тип? для string[]
  public async updateFileId(fileId: string, newFileId: string, userId: string): Promise<string[]> {
    const questionnaire = await this.findByUserId(userId);

    questionnaire.fileIds = updateItem(questionnaire.fileIds, fileId, newFileId);
    await this.fitQuestionnaireRepository.update(questionnaire);

    return questionnaire.fileIds;
  }

  public async deleteFileId(fileId: string, userId: string): Promise<void> {
    const questionnaire = await this.findByUserId(userId);

    questionnaire.fileIds = deleteItem(questionnaire.fileIds, fileId);
    await this.fitQuestionnaireRepository.update(questionnaire);
  }
}
