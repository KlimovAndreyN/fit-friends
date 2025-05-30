import { State } from '../../types/state';
import { TrainingProcess } from '../../types/process/training.process';
import { StoreSlice } from '../../const';

export const getIsFetchForSportsmanTrainingsExecuting = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['isFetchForSportsmanTrainingsExecuting'] => TRAINING_PROCESS.isFetchForSportsmanTrainingsExecuting;
export const getForSportsmanTrainings = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['forSportsmanTrainings'] => TRAINING_PROCESS.forSportsmanTrainings;

export const getIsFetchSpecialTrainingsExecuting = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['isFetchSpecialTrainingsExecuting'] => TRAINING_PROCESS.isFetchSpecialTrainingsExecuting;
export const getSpecialTrainings = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['specialTrainings'] => TRAINING_PROCESS.specialTrainings;

export const getIsFetchPopularTrainingsExecuting = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['isFetchPopularTrainingsExecuting'] => TRAINING_PROCESS.isFetchPopularTrainingsExecuting;
export const getPopularTrainings = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['popularTrainings'] => TRAINING_PROCESS.popularTrainings;

export const getTrainingsFilter = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['trainingsFilter'] => TRAINING_PROCESS.trainingsFilter;
export const getIsTrainingsFilterActivate = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['isTrainingsFilterActivate'] => TRAINING_PROCESS.isTrainingsFilterActivate;
export const getIsFetchTrainingsExecuting = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['isFetchTrainingsExecuting'] => TRAINING_PROCESS.isFetchTrainingsExecuting;
export const getTrainings = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['trainings'] => TRAINING_PROCESS.trainings;
export const getIsHaveMoreTrainings = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['isHaveMoreTrainings'] => TRAINING_PROCESS.isHaveMoreTrainings;
export const getTrainingsMaxPrice = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['trainingsMaxPrice'] => TRAINING_PROCESS.trainingsMaxPrice;

export const getIsFetchDetailTrainingExecuting = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['isFetchDetailTrainingExecuting'] => TRAINING_PROCESS.isFetchDetailTrainingExecuting;
export const getIsFetchDetailTrainingError = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['isFetchDetailTrainingError'] => TRAINING_PROCESS.isFetchDetailTrainingError;
export const getDetailTraining = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['detailTraining'] => TRAINING_PROCESS.detailTraining;

export const getIsUpdateTrainingExecuting = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['isUpdateTrainingExecuting'] => TRAINING_PROCESS.isUpdateTrainingExecuting;
export const getIsUpdateTrainingError = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['isUpdateTrainingError'] => TRAINING_PROCESS.isUpdateTrainingError;

export const getIsIsSpecialTrainingChangeExecuting = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['isIsSpecialTrainingChangeExecuting'] => TRAINING_PROCESS.isIsSpecialTrainingChangeExecuting;
export const getIsSpecialTraining = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['isSpecialTraining'] => TRAINING_PROCESS.isSpecialTraining;

export const getIsCreateTrainingExecuting = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['isCreateTrainingExecuting'] => TRAINING_PROCESS.isCreateTrainingExecuting;
export const getIsCreatedTraining = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['isCreatedTraining'] => TRAINING_PROCESS.isCreatedTraining;

export const getIsFetchCoachTrainingsExecuting = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['isFetchCoachTrainingsExecuting'] => TRAINING_PROCESS.isFetchCoachTrainingsExecuting;
export const getCoachTrainings = ({ [StoreSlice.TrainingProcess]: TRAINING_PROCESS }: State): TrainingProcess['coachTrainings'] => TRAINING_PROCESS.coachTrainings;
