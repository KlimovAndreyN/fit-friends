import { ConflictException, Injectable, Logger } from '@nestjs/common';

import { AuthenticationMessage, AuthUser, CreateUserWithFileIdDto } from '@backend/shared/core';
import { FitUserEntity } from '@backend/account/fit-user';

import { FitQuestionnaireRepository } from './fit-questionnaire.repository';

@Injectable()
export class FitQuestionnaireService {
  private readonly logger = new Logger(FitQuestionnaireService.name);

  constructor(
    private readonly fitUserRepository: FitQuestionnaireRepository,
  ) { }
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
        existQuestionnaire: false,
        passwordHash: ''
      };
  
      const userEntity = new FitUserEntity(fitUser);
  
  
      //await this.notifyService.registerSubscriber({ email, name }, requestId);
  
      return userEntity;
    }
      */
}
