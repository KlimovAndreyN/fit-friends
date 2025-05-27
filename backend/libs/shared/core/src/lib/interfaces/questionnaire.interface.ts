import { Duration } from '../types/duration.enum';
import { Specialization } from '../types/specialization.enum';
import { TrainingLevel } from '../types/training-level.enum';

export interface Questionnaire {
  userId: string;
  specializations: Specialization[];
  trainingLevel: TrainingLevel;
  readyForTraining: boolean;
  duration?: Duration;
  caloriesLose?: number;
  caloriesWaste?: number;
  fileIds?: string[];
  description?: string;
  individualTraining?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
