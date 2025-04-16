import { IDetailTrainingRdo, ITrainingRdo } from '@backend/shared/core';

export type TrainingProcess = {
  isFetchForSportsmanTrainingsExecuting: boolean;
  forSportsmanTrainings: ITrainingRdo[];
  isFetchSpecialTrainingsExecuting: boolean;
  specialTrainings: ITrainingRdo[];
  isFetchPopularTrainingsExecuting: boolean;
  popularTrainings: ITrainingRdo[];
  isFetchTrainingsExecuting: boolean;
  trainings: ITrainingRdo[];
  isFetchDetailTrainingExecuting: boolean;
  detailTraining: IDetailTrainingRdo | null;
}
