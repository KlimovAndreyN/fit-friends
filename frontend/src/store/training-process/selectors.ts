import { State } from '../../types/state';
import { TrainingProcess } from '../../types/training-process';
import { StoreSlice } from '../../const';

export const getIsFetchForSportsmanTrainingsExecuting = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['isFetchForSportsmanTrainingsExecuting'] => TRAINING_PROCESS.isFetchForSportsmanTrainingsExecuting;
export const getForSportsmanTrainings = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['forSportsmanTrainings'] => TRAINING_PROCESS.forSportsmanTrainings;
