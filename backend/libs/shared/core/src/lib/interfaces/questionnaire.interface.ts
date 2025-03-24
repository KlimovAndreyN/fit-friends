import { Duration } from '../types/duration.enum';
import { Specialisation } from '../types/specialisation.enum';
import { UserLevel } from '../types/user-level.enum';

export interface Questionnaire {
  id?: string;
  userId: string;
  specializations: Specialisation[];
  level: UserLevel;
  time?: Duration;
  caloriesLose?: number;
  caloriesWaste?: number;
  fileIds?: string[];
  description?: string;
  individualTraining?: boolean;
}
