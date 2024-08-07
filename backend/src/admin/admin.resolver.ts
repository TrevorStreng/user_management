import { Args, Query, Resolver, Mutation, Int } from '@nestjs/graphql';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';

@Resolver((of: any) => Admin)
export class AdminResolver {
  constructor(private adminService: AdminService) {}

  @Query((returns) => [Admin], { name: 'admins' })
  async getAdmins() {
    return await this.adminService.getAdmins();
  }

  @Query((returns) => [Admin], { name: 'admin' })
  async getAdmin(@Args('id', { type: () => Int }) id: number): Promise<Admin> {
    return await this.adminService.getAdmin(id);
  }

  @Mutation(() => Admin, { name: 'createAdmin' })
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
