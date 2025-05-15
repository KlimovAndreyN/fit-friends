import { PickType } from '@nestjs/swagger';

import { ICreateTrainingDto } from '../interfaces/dto/i-create-training.dto';
import { TrainingApiDoc } from '../constants/api-doc/training.api-doc';

export class CreateTrainingDto extends PickType(
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
    'videoFile'
  ]
)
  implements ICreateTrainingDto { }
