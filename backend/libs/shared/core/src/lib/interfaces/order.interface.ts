import { PaymentMethod } from '../types/payment-method.enum';

export interface Order {
  id?: string;
  userId: string;
  type: string; //! что такое "Вид покупки"? занятие или абонемент? / убрать?
  traningId: string;
  traningPrice: number;
  count: number;
  sum: number;
  paymentMethod: PaymentMethod;
  createdAt?: Date;
}
