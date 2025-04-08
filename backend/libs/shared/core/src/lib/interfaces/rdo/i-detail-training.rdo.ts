import { IDetailTrainingWithUserIdFileIdRdo } from './i-detail-training-with-user-id-file-id.rdo';

export interface IDetailTrainingRdo
  extends Omit<IDetailTrainingWithUserIdFileIdRdo, 'videoFileId'> {
  videoFilePath: string;
}

//! убрать userId и добавить user:{id, name, avatar}
