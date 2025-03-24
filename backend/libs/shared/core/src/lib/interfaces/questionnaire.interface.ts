import { Duration } from '../types/duration.enum';
import { Specialization } from '../types/specialization.enum';
import { UserLevel } from '../types/user-level.enum';

export interface Questionnaire {
  userId: string;
  specializations: Specialization[];
  level: UserLevel;
  readyForTraining: boolean;
  time?: Duration;
  caloriesLose?: number;
  caloriesWaste?: number;
  fileIds?: string[];
  description?: string;
  individualTraining?: boolean;
}
