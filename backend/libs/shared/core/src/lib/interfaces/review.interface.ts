export interface Review {
  id?: string;
  userId: string;
  trainingId: string;
  rating: number;
  message: string;
  createdAt?: Date;
}
