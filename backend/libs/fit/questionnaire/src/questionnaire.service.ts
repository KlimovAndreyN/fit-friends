import { Injectable } from '@nestjs/common';

import { CreateQuestionnaireUserDto } from '@backend/shared/core';

import { QuestionnaireRepository } from './questionnaire.repository';
import { QuestionnaireEntity } from './questionnaire.entity';
import { QuestionnaireFactory } from './questionnaire.factory';

@Injectable()
export class QuestionnaireService {
  constructor(
    private readonly questionnaireRepository: QuestionnaireRepository
  ) { }
  /*
  private create
  private update
  public show / а контроллеры сами преобразовывают по своему
  */

  public async findByUserId(userId: string): Promise<QuestionnaireEntity> {
    const entity = await this.questionnaireRepository.findByUserId(userId);

    return entity;
  }

  public async createQuestionnaireUser(dto: CreateQuestionnaireUserDto, userId: string): Promise<QuestionnaireEntity> {
    const entity: QuestionnaireEntity = QuestionnaireFactory.createFromDto(dto, userId);

    await this.questionnaireRepository.save(entity);

    return entity;
  }
  /*
    public async registerUser(dto: CreateUserWithFileIdDto, requestId: string): Promise<FitUserEntity> {
      const {
        email,
        name,
        password,
        backgroundPath,
        gender,
        metroStationName,
        role,
        avatarFileId,
        birthday
      } = dto;
      const existUser = await this.fitUserRepository.findByEmail(email);

      if (existUser) {
        throw new ConflictException(AuthenticationMessage.Exists);
      }

      const fitUser: AuthUser = {
        email,
        name,
        backgroundPath,
        gender,
        metroStationName,
        role,
        avatarFileId,
        birthday: (birthday) ? new Date(birthday) : undefined,
        passwordHash: ''
      };

      const userEntity = new FitUserEntity(fitUser);


      //await this.notifyService.registerSubscriber({ email, name }, requestId);

      return userEntity;
    }
      */
}
