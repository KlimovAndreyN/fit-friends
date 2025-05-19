import { Duration } from '../types/duration.enum';
import { Gender } from '../types/gender.enum';
import { Specialization } from '../types/specialization.enum';
import { TrainingLevel } from '../types/training-level.enum';

export interface Training {
  id?: string;
  title: string;
  backgroundPath: string;
  trainingLevel: TrainingLevel;
  specialization: Specialization;
  duration: Duration;
  price: number;
  oldPrice: number;
  caloriesWaste: number;
  description: string;
  gender: Gender;
  videoFileId: string;
  rating?: number;
  userId: string;
  isSpecial: boolean;
  createdAt?: Date;
}
