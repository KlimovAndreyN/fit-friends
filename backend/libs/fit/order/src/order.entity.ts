import { Entity, StorableEntity, Order } from '@backend/shared/core';

export class OrderEntity extends Entity implements StorableEntity<Order> {
  public userId: Order['userId'];
  public type: Order['type'];
  public trainingId: Order['trainingId'];
  public trainingPrice: Order['trainingPrice'];
  public count: Order['count'];
  public sum: Order['sum'];
  public paymentMethod: Order['paymentMethod'];
  public createdAt?: Order['createdAt'];

  constructor(order?: Order) {
    super();

    this.populate(order);
  }

  public populate(order?: Order): void {
    if (!order) {
      return;
    }

    this.id = order.id ?? undefined;
    this.userId = order.userId;
    this.type = order.type;
    this.trainingId = order.trainingId;
    this.trainingPrice = order.trainingPrice;
    this.count = order.count;
    this.sum = order.sum;
    this.paymentMethod = order.paymentMethod;
    this.createdAt = order.createdAt ?? undefined;
  }

  public toPOJO(): Order {
    return {
      id: this.id,
      userId: this.userId,
      type: this.type,
      trainingId: this.trainingId,
      trainingPrice: this.trainingPrice,
      count: this.count,
      sum: this.sum,
      paymentMethod: this.paymentMethod,
      createdAt: this.createdAt
    }
  }
}
