import { UserRole } from '../../types/user-role.enum';
import { Questionnaire } from '../questionnaire.interface';

export interface ICreateQuestionnaireWithFileIdsDto
  extends Pick<
    Questionnaire,
    'specialisations' | 'level' | 'time' | 'caloriesLose' | 'caloriesWaste' | 'description' | 'fileIds' | 'individualTraining'
  > {
  userRole: UserRole;
}
