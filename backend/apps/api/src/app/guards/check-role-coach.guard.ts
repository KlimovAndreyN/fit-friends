import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Role } from '@backend/shared/core';
import { checkAccessByRole } from '@backend/shared/helpers';

@Injectable()
export class CheckRoleCoachGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    return checkAccessByRole(context, Role.Coach, CheckRoleCoachGuard.name);
  }
}
