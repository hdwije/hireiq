import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from '../types';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    return request.user as AuthUser;
  },
);
