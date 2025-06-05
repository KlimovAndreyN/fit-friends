import { PickType } from '@nestjs/swagger';

import { ICreateTrainingRequestDto } from '../interfaces/dto/i-create-training-request.dto';
import { TrainingRequestApiDoc } from '../constants/api-doc/training-request.api-doc';

export class CreateTrainingRequestDto extends PickType(TrainingRequestApiDoc, ['userId'])
    implements ICreateTrainingRequestDto { }
