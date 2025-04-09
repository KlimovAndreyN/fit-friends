import { Injectable } from '@nestjs/common';

import { Order } from '@backend/shared/core';

import { OrderRepository } from './order.repository';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository
  ) { }

  //! временно, нужно будет?
  public async findById(id: string): Promise<OrderEntity> {
    const foundOrder = await this.orderRepository.findById(id);

    return foundOrder;
  }

  //! временно Order потом будет CreateOrderDto
  public async create(dto: Order, userId: string): Promise<OrderEntity> {
    const entity: OrderEntity = new OrderEntity({ ...dto, userId });

    await this.orderRepository.save(entity);

    return entity;
  }
}
