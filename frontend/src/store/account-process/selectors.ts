import { State } from '../../types/state';
import { AccountProcess } from '../../types/process/account.process';
import { StoreSlice } from '../../const';

export const getIsExistQuestionnaireExecuting = ({ [StoreSlice.AccountProcess]: ACCOUNT_PROCESS }: State): AccountProcess['isExistQuestionnaireExecuting'] => ACCOUNT_PROCESS.isExistQuestionnaireExecuting;
export const getExistQuestionnaire = ({ [StoreSlice.AccountProcess]: ACCOUNT_PROCESS }: State): AccountProcess['existQuestionnaire'] => ACCOUNT_PROCESS.existQuestionnaire;

export const getIsCreateQuestionnaireExecuting = ({ [StoreSlice.AccountProcess]: ACCOUNT_PROCESS }: State): AccountProcess['isCreateQuestionnaireExecuting'] => ACCOUNT_PROCESS.isCreateQuestionnaireExecuting;

export const getIsFetchUserProfileExecuting = ({ [StoreSlice.AccountProcess]: ACCOUNT_PROCESS }: State): AccountProcess['isFetchUserProfileExecuting'] => ACCOUNT_PROCESS.isFetchUserProfileExecuting;
export const getUserProfile = ({ [StoreSlice.AccountProcess]: ACCOUNT_PROCESS }: State): AccountProcess['userProfile'] => ACCOUNT_PROCESS.userProfile;
export const getCoachCertificates = ({ [StoreSlice.AccountProcess]: ACCOUNT_PROCESS }: State): AccountProcess['coachCertificates'] => ACCOUNT_PROCESS.coachCertificates;

export const getIsUpdateUserProfileExecuting = ({ [StoreSlice.AccountProcess]: ACCOUNT_PROCESS }: State): AccountProcess['isUpdateUserProfileExecuting'] => ACCOUNT_PROCESS.isUpdateUserProfileExecuting;
export const getIsUpdateUserProfileError = ({ [StoreSlice.AccountProcess]: ACCOUNT_PROCESS }: State): AccountProcess['isUpdateUserProfileError'] => ACCOUNT_PROCESS.isUpdateUserProfileError;

export const getIsUpdateCoachCertificatesExecuting = ({ [StoreSlice.AccountProcess]: ACCOUNT_PROCESS }: State): AccountProcess['isUpdateCoachCertificatesExecuting'] => ACCOUNT_PROCESS.isUpdateCoachCertificatesExecuting;

export const getIsReadyForTrainingChangeExecuting = ({ [StoreSlice.AccountProcess]: ACCOUNT_PROCESS }: State): AccountProcess['isReadyForTrainingChangeExecuting'] => ACCOUNT_PROCESS.isReadyForTrainingChangeExecuting;
export const getReadyForTraining = ({ [StoreSlice.AccountProcess]: ACCOUNT_PROCESS }: State): AccountProcess['readyForTraining'] => ACCOUNT_PROCESS.readyForTraining;
