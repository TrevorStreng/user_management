import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AdminService } from './admin.service';

@Injectable()
export class AdminGaurd implements CanActivate {
  constructor(private adminService: AdminService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().user;

    if (!user) {
      throw new UnauthorizedException('User not found in context');
    }

    const isAdmin = await this.adminService.checkAdminByUserId(user.id);

    if (!isAdmin) {
      throw new UnauthorizedException('User is not an admin');
    }
    return true;
  }
}
