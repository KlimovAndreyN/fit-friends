import { State } from '../../types/state';
import { UserProfileProcess } from '../../types/user-profile-process';
import { StoreSlice } from '../../const';

export const getIsExistQuestionnaireExecuting = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['isExistQuestionnaireExecuting'] => USER_PROFILE_PROCESS.isExistQuestionnaireExecuting;
export const getIsCreateQuestionnaireExecuting = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['isCreateQuestionnaireExecuting'] => USER_PROFILE_PROCESS.isCreateQuestionnaireExecuting;
export const getIsFetchUserProfileExecuting = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['isFetchUserProfileExecuting'] => USER_PROFILE_PROCESS.isFetchUserProfileExecuting;
export const getIsUpdateUserProfileExecuting = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['isUpdateUserProfileExecuting'] => USER_PROFILE_PROCESS.isUpdateUserProfileExecuting;
export const getIsUpdateUserProfileError = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['isUpdateUserProfileError'] => USER_PROFILE_PROCESS.isUpdateUserProfileError;
export const getIsReadyForTrainingChangeExecuting = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['isReadyForTrainingChangeExecuting'] => USER_PROFILE_PROCESS.isReadyForTrainingChangeExecuting;
export const getExistQuestionnaire = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['existQuestionnaire'] => USER_PROFILE_PROCESS.existQuestionnaire;
export const getUserProfile = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['userProfile'] => USER_PROFILE_PROCESS.userProfile;
export const getReadyForTraining = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['readyForTraining'] => USER_PROFILE_PROCESS.readyForTraining;
export const getIsFetchLookForCompanyUserProfilesExecuting = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['isFetchLookForCompanyUserProfilesExecuting'] => USER_PROFILE_PROCESS.isFetchLookForCompanyUserProfilesExecuting;
export const getLookForCompanyUserProfiles = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['lookForCompanyUserProfiles'] => USER_PROFILE_PROCESS.lookForCompanyUserProfiles;
export const getIsFetchUserProfilesExecuting = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['isFetchUserProfilesExecuting'] => USER_PROFILE_PROCESS.isFetchUserProfilesExecuting;
export const getUserProfiles = ({ [StoreSlice.UserProfileProcess]: USER_PROFILE_PROCESS }: State): UserProfileProcess['userProfiles'] => USER_PROFILE_PROCESS.userProfiles;
