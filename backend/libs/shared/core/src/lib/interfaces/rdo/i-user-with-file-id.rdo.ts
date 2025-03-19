import { User, UserProp } from '../user.interface';

export interface IUserWithFileIdRdo
  extends Pick<
    User,
    UserProp.Name | UserProp.Email | UserProp.MetroStationName | UserProp.BackgroundPath | UserProp.Gender | UserProp.AvatarFileId | UserProp.Role
  > {
  [UserProp.Id]: User[UserProp.Id];
  [UserProp.Birthday]?: string;
  [UserProp.RegistrationDate]: string;
};
