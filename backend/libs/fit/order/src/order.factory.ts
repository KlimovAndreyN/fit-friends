import { Injectable } from '@nestjs/common';

import { EntityFactory, Order } from '@backend/shared/core';

import { OrderEntity } from './order.entity';

@Injectable()
export class OrderFactory implements EntityFactory<OrderEntity> {
  public create(entityPlainData: Order): OrderEntity {
    return new OrderEntity(entityPlainData);
  }
}
