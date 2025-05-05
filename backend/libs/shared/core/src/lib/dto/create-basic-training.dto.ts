import { PickType } from '@nestjs/swagger';

import { ICreateBasicTrainingDto } from '../interfaces/dto/i-create-basic-training.dto';
import { TrainingApiDoc } from '../constants/api-doc/training.api-doc';

export class CreateBasicTrainingDto extends PickType(
  TrainingApiDoc,
  [
    'title',
    'backgroundPath',
    'trainingLevel',
    'specialization',
    'duration',
    'price',
    'caloriesWaste',
    'description',
    'gender',
    'videoFileId'
  ]
)
  implements ICreateBasicTrainingDto { }
