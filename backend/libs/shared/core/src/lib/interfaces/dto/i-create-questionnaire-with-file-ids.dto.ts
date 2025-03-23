import { UserRole } from '../../types/user-role.enum';
import { Questionnaire } from '../questionnaire.interface';

export interface ICreateQuestionnaireWithfIleIdsDto
  extends Pick<
    Questionnaire,
    'specialisations' | 'level' | 'time' | 'caloriesLose' | 'caloriesWaste' | 'description' | 'fileIds' | 'individualTraining'
  > {
  userRole: UserRole;
}
