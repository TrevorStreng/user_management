import { Args, Query, Resolver, Mutation, Int, Context } from '@nestjs/graphql';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { UsersService } from 'src/users/users.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.gaurd';
import { AdminGaurd } from './admin.gaurd';

@Resolver((of: any) => Admin)
export class AdminResolver {
  constructor(
    private adminService: AdminService,
    // private userService: UsersService,
  ) {}

  @Query((returns) => [Admin], { name: 'admins' })
  async getAdmins() {
    return await this.adminService.getAdmins();
  }

  @Query((returns) => [Admin], { name: 'admin' })
  async getAdmin(@Args('id', { type: () => Int }) id: number): Promise<Admin> {
    // console.log(user);
    // const id = user.sub;
    // const x = await this.userService.getUserById(id);

    return await this.adminService.getAdmin(id);
  }

  @Mutation(() => Admin, { name: 'createAdmin' })
  @UseGuards(AuthGuard, AdminGaurd)
  async createAdmin(
    @Args('createAdminInput') createAdminDto: AdminDto,
  ): Promise<Admin> {
    return await this.adminService.createAdmin(createAdminDto);
  }

  @Mutation(() => Admin, { name: 'updateAdmin' })
  async updateAdmin(
    @Args('id', { type: () => Int }) id: number,
    @Args('updatePositionInput') updateAdminDto: AdminDto,
  ): Promise<Admin> {
    return await this.adminService.updateAdmin(id, updateAdminDto);
  }

  @Mutation(() => Boolean)
  async deleteAdmin(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Boolean> {
    try {
      await this.adminService.deleteAdmin(id);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
