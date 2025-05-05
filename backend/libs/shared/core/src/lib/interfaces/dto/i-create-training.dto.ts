import { ICreateBasicTrainingDto } from './i-create-basic-training.dto';

export const VIDEO_FILE_PROPERTY = 'videoFile';

export interface ICreateTrainingDto
  extends Omit<ICreateBasicTrainingDto, 'userId' | 'videoFileId'> {
  [VIDEO_FILE_PROPERTY]: File;
}
