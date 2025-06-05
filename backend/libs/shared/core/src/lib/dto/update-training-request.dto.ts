import { PickType } from '@nestjs/swagger';

import { IUpdateTrainingRequestDto } from '../interfaces/dto/i-update-training-request.dto';
import { TrainingRequestApiDoc } from '../constants/api-doc/training-request.api-doc';

export class UpdateTrainingRequestDto extends PickType(TrainingRequestApiDoc, ['status'])
    implements IUpdateTrainingRequestDto { }
