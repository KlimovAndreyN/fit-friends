import { ICreateQuestionnaireCoachDto, ICreateQuestionnaireSportsmanDto } from '@backend/shared/core';

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export type OnFileInputChange = (filePath: string, file: File | undefined) => void;

export type Option = {
  value: string;
  title: string;
};

export type CreateQuestionnaireDto = ICreateQuestionnaireSportsmanDto | ICreateQuestionnaireCoachDto;

export type PlaceLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};
