import { Args, Int, Query, Resolver, Mutation, Context } from '@nestjs/graphql';
import { Employee } from './employee.entity';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { UpdateEmployeeDto } from './dto/updateEmloyee.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.gaurd';
import { AdminGaurd } from 'src/admin/admin.gaurd';
import { UsersService } from 'src/users/users.service';
// import { Base } from 'src/base/base.entity';
// import { BaseResolver } from 'src/base/base.resolver';

@Resolver((of: any) => Employee)
export class EmployeeResolver {
  constructor(
    private employeeService: EmployeesService,
    private userService: UsersService,
  ) {
    // super(employeeService);
  }

  @Query((returns) => [Employee], { name: 'getEmployees' })
  async getEmloyees() {
    return await this.employeeService.getEmployees();
  }

  @Query((returns) => Employee, { name: 'getEmployee' })
  @UseGuards(AuthGuard)
  async getEmployee(@Context('user') user): Promise<Employee> {
    const id = user.sub;
    return await this.employeeService.getEmployee(id);
  }

  @Mutation(() => Employee, { name: 'createEmployee' })
  @UseGuards(AuthGuard, AdminGaurd)
  async createEmployee(
    // @Context('user') user, // this is going to be needed to verify admin
    // @Args('id', { type: () => Int }) id: number,
    @Args('userEmailInput') email: string,
    @Args('createEmployeeInput') createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    // const id = user.sub;
    const newEmployee = await this.userService.getUserByEmail(email);
    return await this.employeeService.createEmployee(
      newEmployee.id,
      createEmployeeDto,
    );
  }

  @Mutation(() => Employee, { name: 'updateEmployee' })
  async updateEmployee(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateEmployeeInput') updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    return await this.employeeService.updateEmployee(id, updateEmployeeDto);
  }

  @Mutation(() => Boolean)
  async deleteEmployee(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Boolean> {
    await this.employeeService.deleteEmployee(id);
    return true;
  }
}
