import { ITrainingRdo } from '@backend/shared/core';

export type TrainingProcess = {
  isFetchForSportsmanTrainingsExecuting: boolean;
  forSportsmanTrainings: ITrainingRdo[];
}
