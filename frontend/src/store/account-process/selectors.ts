import { State } from '../../types/state';
import { AccountProcess } from '../../types/process/account.process';
import { StoreSlice } from '../../const';

export const getIsExistQuestionnaireExecuting = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): AccountProcess['isExistQuestionnaireExecuting'] => USER_PROFILE_PROCESS.isExistQuestionnaireExecuting;
export const getExistQuestionnaire = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): AccountProcess['existQuestionnaire'] => USER_PROFILE_PROCESS.existQuestionnaire;

export const getIsCreateQuestionnaireExecuting = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): AccountProcess['isCreateQuestionnaireExecuting'] => USER_PROFILE_PROCESS.isCreateQuestionnaireExecuting;

export const getIsFetchUserProfileExecuting = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): AccountProcess['isFetchUserProfileExecuting'] => USER_PROFILE_PROCESS.isFetchUserProfileExecuting;
export const getUserProfile = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): AccountProcess['userProfile'] => USER_PROFILE_PROCESS.userProfile;
export const getCoachCertificates = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): AccountProcess['coachCertificates'] => USER_PROFILE_PROCESS.coachCertificates;

export const getIsUpdateUserProfileExecuting = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): AccountProcess['isUpdateUserProfileExecuting'] => USER_PROFILE_PROCESS.isUpdateUserProfileExecuting;
export const getIsUpdateUserProfileError = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): AccountProcess['isUpdateUserProfileError'] => USER_PROFILE_PROCESS.isUpdateUserProfileError;

export const getIsUpdateCoachCertificatesExecuting = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): AccountProcess['isUpdateCoachCertificatesExecuting'] => USER_PROFILE_PROCESS.isUpdateCoachCertificatesExecuting;

export const getIsReadyForTrainingChangeExecuting = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): AccountProcess['isReadyForTrainingChangeExecuting'] => USER_PROFILE_PROCESS.isReadyForTrainingChangeExecuting;
export const getReadyForTraining = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): AccountProcess['readyForTraining'] => USER_PROFILE_PROCESS.readyForTraining;

export const getIsFetchLookForCompanyUserProfilesExecuting = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): AccountProcess['isFetchLookForCompanyUserProfilesExecuting'] => USER_PROFILE_PROCESS.isFetchLookForCompanyUserProfilesExecuting;
export const getLookForCompanyUserProfiles = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): AccountProcess['lookForCompanyUserProfiles'] => USER_PROFILE_PROCESS.lookForCompanyUserProfiles;

export const getIsFetchUserProfilesExecuting = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): AccountProcess['isFetchUserProfilesExecuting'] => USER_PROFILE_PROCESS.isFetchUserProfilesExecuting;
export const getUserProfiles = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): AccountProcess['userProfiles'] => USER_PROFILE_PROCESS.userProfiles;
