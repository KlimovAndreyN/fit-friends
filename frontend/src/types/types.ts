import { ICreateQuestionnaireCoachDto, ICreateQuestionnaireSportsmanDto } from '@backend/shared/core';

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export type OnFileInputChange = (filePath: string, file: File | undefined) => void;

export type OnClick = () => void;

export type Option = {
  value: string;
  title: string;
}

export type MinMaxRange = {
  min: number | undefined;
  max: number | undefined;
}

export type CreateQuestionnaireDto = ICreateQuestionnaireSportsmanDto | ICreateQuestionnaireCoachDto;
