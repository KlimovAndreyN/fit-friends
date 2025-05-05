import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

export const TrainingApiProperty = {
  Id: {
    description: 'The unique training ID',
    example: '029ddde2-5fa2-4b20-8f59-01dc23c0176b'
  },
  VideoFile: {
    Types: ['video/quicktime', 'video/avi', 'video/mp4'],
    MaxSize: 10 * 1024 * 1024 * 1024,
    required: true
  }
} as const;

export const parseTrainingVideoFilePipeBuilder =
  new ParseFilePipeBuilder()
    .addFileTypeValidator({ fileType: TrainingApiProperty.VideoFile.Types.join('|') })
    .addMaxSizeValidator({ maxSize: TrainingApiProperty.VideoFile.MaxSize })
    .build({
      fileIsRequired: TrainingApiProperty.VideoFile.required,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    });
