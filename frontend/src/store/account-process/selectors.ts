import { State } from '../../types/state';
import { AccountProcess } from '../../types/process/account.process';
import { StoreSlice } from '../../const';

export const getIsExistQuestionnaireExecuting = ({ [StoreSlice.AccountProcess]: ACCOUNT_PROCESS }: State): AccountProcess['isExistQuestionnaireExecuting'] => ACCOUNT_PROCESS.isExistQuestionnaireExecuting;
export const getExistQuestionnaire = ({ [StoreSlice.AccountProcess]: ACCOUNT_PROCESS }: State): AccountProcess['existQuestionnaire'] => ACCOUNT_PROCESS.existQuestionnaire;

export const getIsCreateQuestionnaireExecuting = ({ [StoreSlice.AccountProcess]: ACCOUNT_PROCESS }: State): AccountProcess['isCreateQuestionnaireExecuting'] => ACCOUNT_PROCESS.isCreateQuestionnaireExecuting;

export const getIsFetchAccountExecuting = ({ [StoreSlice.AccountProcess]: ACCOUNT_PROCESS }: State): AccountProcess['isFetchAccountExecuting'] => ACCOUNT_PROCESS.isFetchAccountExecuting;
export const getAccount = ({ [StoreSlice.AccountProcess]: ACCOUNT_PROCESS }: State): AccountProcess['account'] => ACCOUNT_PROCESS.account;
export const getCoachCertificates = ({ [StoreSlice.AccountProcess]: ACCOUNT_PROCESS }: State): AccountProcess['coachCertificates'] => ACCOUNT_PROCESS.coachCertificates;

export const getIsUpdateAccountExecuting = ({ [StoreSlice.AccountProcess]: ACCOUNT_PROCESS }: State): AccountProcess['isUpdateAccountExecuting'] => ACCOUNT_PROCESS.isUpdateAccountExecuting;
export const getIsUpdateAccountError = ({ [StoreSlice.AccountProcess]: ACCOUNT_PROCESS }: State): AccountProcess['isUpdateAccountError'] => ACCOUNT_PROCESS.isUpdateAccountError;

export const getIsUpdateCoachCertificatesExecuting = ({ [StoreSlice.AccountProcess]: ACCOUNT_PROCESS }: State): AccountProcess['isUpdateCoachCertificatesExecuting'] => ACCOUNT_PROCESS.isUpdateCoachCertificatesExecuting;
export const getIsUpdateCoachCertificatesError = ({ [StoreSlice.AccountProcess]: ACCOUNT_PROCESS }: State): AccountProcess['isUpdateCoachCertificatesError'] => ACCOUNT_PROCESS.isUpdateCoachCertificatesError;

export const getIsReadyForTrainingChangeExecuting = ({ [StoreSlice.AccountProcess]: ACCOUNT_PROCESS }: State): AccountProcess['isReadyForTrainingChangeExecuting'] => ACCOUNT_PROCESS.isReadyForTrainingChangeExecuting;
export const getReadyForTraining = ({ [StoreSlice.AccountProcess]: ACCOUNT_PROCESS }: State): AccountProcess['readyForTraining'] => ACCOUNT_PROCESS.readyForTraining;
