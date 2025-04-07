export interface Review {
  id?: string;
  userId: string;
  traningId: string;
  rating: number;
  message: string;
  createdAt?: Date;
}
