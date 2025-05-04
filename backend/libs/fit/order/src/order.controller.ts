import { Controller, Get, Param } from '@nestjs/common';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';

import { ServiceRoute, XApiHeaderOptions, Order } from '@backend/shared/core';

import { OrderService } from './order.service';

@ApiTags(ServiceRoute.Orders)
@ApiHeaders(XApiHeaderOptions)
@Controller(ServiceRoute.Orders)
export class OrderController {
  constructor(
    private readonly orderService: OrderService
  ) { }

  //! добавить описание
  // ApiResponse type -> OrderRdo
  @Get()
  public async show(@Param() id: string): Promise<Order> {
    const entity = await this.orderService.findById(id);

    //! временно
    return entity; //! fillDto: Order -> entity.toPOJO
  }
}
