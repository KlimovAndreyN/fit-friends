import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Role } from '@backend/shared/core';
import { checkAccessByRole } from '@backend/shared/helpers';

@Injectable()
export class CheckSportsmanGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    return checkAccessByRole(context, Role.Sportsman, CheckSportsmanGuard.name);
  }
}
