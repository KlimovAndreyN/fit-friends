import { Injectable } from '@nestjs/common';

import { CreateQuestionnaireWithFileIdsDto, UpdateQuestionnaireDto } from '@backend/shared/core';

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

  public async create(dto: CreateQuestionnaireWithFileIdsDto, userId: string): Promise<QuestionnaireEntity> {
    const entity: QuestionnaireEntity = QuestionnaireFactory.createFromDto(dto, userId);

    await this.questionnaireRepository.save(entity);

    return entity;
  }

  public async update(dto: UpdateQuestionnaireDto, userId: string): Promise<QuestionnaireEntity> {
    const existsPost = await this.findByUserId(userId);
    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existsPost[key] !== value) {
        //! для dto.specializations нужно ли Arrai.isArray() и проверить по элементам и existsPost[key] = [...value];
        existsPost[key] = value;
        hasChanges = true;
      }
    }

    if (hasChanges) {
      await this.questionnaireRepository.update(existsPost);
    }

    return existsPost;
  }
}
