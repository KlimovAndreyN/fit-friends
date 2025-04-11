import { State } from '../../types/state';
import { TrainingProcess } from '../../types/training-process';
import { StoreSlice } from '../../const';

export const getIsFetchForSportsmanTrainingsExecuting = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['isFetchForSportsmanTrainingsExecuting'] => TRAINING_PROCESS.isFetchForSportsmanTrainingsExecuting;
export const getForSportsmanTrainings = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['forSportsmanTrainings'] => TRAINING_PROCESS.forSportsmanTrainings;
export const getIsFetchSpecialTrainingsExecuting = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['isFetchSpecialTrainingsExecuting'] => TRAINING_PROCESS.isFetchSpecialTrainingsExecuting;
export const getSpecialTrainings = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['specialTrainings'] => TRAINING_PROCESS.specialTrainings;
export const getIsFetchPopularTrainingsExecuting = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['isFetchPopularTrainingsExecuting'] => TRAINING_PROCESS.isFetchPopularTrainingsExecuting;
export const getPopularTrainings = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['popularTrainings'] => TRAINING_PROCESS.popularTrainings;
export const getIsTrainingsExecuting = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['isFetchTrainingsExecuting'] => TRAINING_PROCESS.isFetchTrainingsExecuting;
export const getTrainings = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['trainings'] => TRAINING_PROCESS.trainings;
export const getIsFetchDetailTrainingExecuting = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['isFetchDetailTrainingExecuting'] => TRAINING_PROCESS.isFetchDetailTrainingExecuting;
export const getDetailTraining = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['detailTraining'] => TRAINING_PROCESS.detailTraining;
