import { Args, Query, Resolver, Mutation, Int } from '@nestjs/graphql';
import { Department } from './department.entity';
import { DepartmentService } from './department.service';
import { DepartmentDto } from './dto/department.dto';

@Resolver((of: any) => Department)
export class DepartmentResolver {
  constructor(private departmentService: DepartmentService) {}

  @Query((returns) => [Department], { name: 'departments' })
  async getDepartments() {
    return await this.departmentService.getDepartments();
  }

  @Query((returns) => Department, { name: 'department' })
  async getDepartment(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Department> {
    return await this.departmentService.getDepartment(id);
  }

  @Mutation(() => Department, { name: 'createDepartment' })
  async createDepartment(
    @Args('createDepartmentInput') createDepartmentDto: DepartmentDto,
  ): Promise<Department> {
    return await this.departmentService.createDepartment(createDepartmentDto);
  }

  @Mutation(() => Department, { name: 'updateDepartment' })
  async updateDepartment(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateDepartmentInput') updateDepartmentDto: DepartmentDto,
  ): Promise<Department> {
    return await this.departmentService.updateDepartment(
      id,
      updateDepartmentDto,
    );
  }

  @Mutation(() => Boolean)
  async deleteDepartment(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Boolean> {
    await this.departmentService.deleteDepartment(id);
    return true;
  }
}
