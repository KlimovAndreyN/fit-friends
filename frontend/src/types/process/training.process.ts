import { IDetailTrainingRdo, ITrainingQuery, ITrainingRdo } from '@backend/shared/core';

export type TrainingProcess = {
  isFetchForSportsmanTrainingsExecuting: boolean;
  forSportsmanTrainings: ITrainingRdo[];

  isFetchSpecialTrainingsExecuting: boolean;
  specialTrainings: ITrainingRdo[];

  isFetchPopularTrainingsExecuting: boolean;
  popularTrainings: ITrainingRdo[];

  trainingsFilter: ITrainingQuery;
  isFristPage: boolean;
  isTrainingsFilterActivate: boolean;
  isFetchTrainingsExecuting: boolean;
  trainings: ITrainingRdo[];
  isHaveMoreTrainings: boolean;
  trainingsMaxPrice?: number;

  showDetailTraining: boolean;

  isFetchDetailTrainingExecuting: boolean;
  detailTraining: IDetailTrainingRdo | null;
}
