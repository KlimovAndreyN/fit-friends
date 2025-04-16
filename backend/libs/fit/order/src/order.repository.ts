import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClientService } from '@backend/fit/models';
import { BasePostgresRepository } from '@backend/shared/data-access';
import { Order, PaymentMethod, SortDirection } from '@backend/shared/core';

import { OrderEntity } from './order.entity';
import { OrderFactory } from './order.factory';

@Injectable()
export class OrderRepository extends BasePostgresRepository<OrderEntity, Order> {
  constructor(
    entityFactory: OrderFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  private convertFields({ paymentMethod }): { paymentMethod: PaymentMethod; } {
    return { paymentMethod: paymentMethod as PaymentMethod };
  }

  //! временно, нужно будет?
  public async findById(id: string): Promise<OrderEntity> {
    const record = await this.client.order.findFirst({ where: { id }, orderBy: { createdAt: SortDirection.Desc } });

    if (!record) {
      //! вынести в константы
      throw new NotFoundException('Order Not Found');
    }

    const order: Order = {
      ...record,
      ...this.convertFields(record)
    };

    return new OrderEntity(order);
  }

  public async save(entity: OrderEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();

    const record = await this.client.order.create({
      data: { ...pojoEntity }
    });

    entity.id = record.id;
    entity.createdAt = record.createdAt;
  }

  public async update(entity: OrderEntity): Promise<void> {
    const { id } = entity;
    const pojoEntity = entity.toPOJO();

    await this.client.training.update({
      where: { id },
      data: { ...pojoEntity }
    });
  }
}
