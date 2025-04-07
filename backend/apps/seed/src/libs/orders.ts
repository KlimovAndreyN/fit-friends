import { Logger } from '@nestjs/common';

import { Order, PaymentMethod } from '@backend/shared/core';
import { getRandomDate, getRandomEnumItem, getRandomNumber, getRandomUniqueItems } from '@backend/shared/helpers';
import { FitUserEntity } from '@backend/account/fit-user';
import { TrainingEntity } from '@backend/fit/training';
import { OrderEntity, OrderRepository } from '@backend/fit/order';

import { MockOrderOption, MockTrainingOption } from './mock-data';

export async function clearOrders(orderRepository: OrderRepository): Promise<void> {
  await orderRepository.client.order.deleteMany();
}

export async function seedOrders(
  orderRepository: OrderRepository,
  trainings: TrainingEntity[],
  sportsmans: FitUserEntity[]
): Promise<OrderEntity[]> {
  const orders: OrderEntity[] = [];
  const { MIN_COUNT, MAX_COUNT } = MockOrderOption;
  const { MIN_DATE, MAX_DATE } = MockTrainingOption;

  for (const { id: userId } of sportsmans) {
    const userTrainingsCount = getRandomNumber(0, trainings.length / 2);
    const userTrainings = getRandomUniqueItems(trainings, userTrainingsCount);

    for (const { id: trainingId, price: trainingPrice } of userTrainings) {
      //! потом можно создавать через DTO и сервис
      const count = getRandomNumber(MIN_COUNT, MAX_COUNT);
      const sum = count * trainingPrice;
      const order: Order = {
        userId,
        type: 'type?', //! что такое "Вид покупки"? занятие или абонемент? / убрать?
        trainingId,
        trainingPrice,
        count,
        sum,
        paymentMethod: getRandomEnumItem(PaymentMethod),
        createdAt: getRandomDate(MIN_DATE, MAX_DATE)
      }
      const orderEntity = new OrderEntity(order);

      await orderRepository.save(orderEntity);
      orders.push(orderEntity);

      Logger.log(`Added order: userId: ${userId} / trainingId: ${trainingId}`);
    }
  }

  return orders;
}
