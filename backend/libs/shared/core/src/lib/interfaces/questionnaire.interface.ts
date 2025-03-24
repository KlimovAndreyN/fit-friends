import { Duration } from '../types/duration.enum';
import { Specialization } from '../types/specialization.enum';
import { UserLevel } from '../types/user-level.enum';

export interface Questionnaire {
  id?: string;
  userId: string;
  specializations: Specialization[];
  level: UserLevel;
  time?: Duration;
  caloriesLose?: number;
  caloriesWaste?: number;
  fileIds?: string[];
  description?: string;
  individualTraining?: boolean;
}
