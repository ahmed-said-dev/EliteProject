import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest();
      return request.user;
    } else {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req.user;
    }
  },
);
 