import { OmitType } from '@nestjs/swagger';

import { ICreateQuestionnaireDto } from '../interfaces/dto/i-create-questionnaire.dto';
import { CreateQuestionnaireWithFileIdsDto } from './create-questionnaire-with-file-ids.dto';

export class CreateQuestionnaireDto extends OmitType(CreateQuestionnaireWithFileIdsDto, ['fileIds']) implements ICreateQuestionnaireDto { }
