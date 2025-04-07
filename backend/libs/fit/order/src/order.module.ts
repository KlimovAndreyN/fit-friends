import { Module } from '@nestjs/common';

import { OrderController } from './order.controller';
import { OrderFactory } from './order.factory';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    OrderFactory
  ]
})
export class OrderModule { }
