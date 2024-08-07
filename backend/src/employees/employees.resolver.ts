import { Args, Int, Query, Resolver, Mutation } from '@nestjs/graphql';
import { Employee } from './employee.entity';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { UpdateEmployeeDto } from './dto/updateEmloyee.dto';
// import { Base } from 'src/base/base.entity';
// import { BaseResolver } from 'src/base/base.resolver';

@Resolver((of: any) => Employee)
export class EmployeeResolver {
  constructor(private employeeService: EmployeesService) {
    // super(employeeService);
  }

  @Query((returns) => [Employee], { name: 'getEmployees' })
  async getEmloyees() {
    return await this.employeeService.getEmployees();
  }

  @Query((returns) => Employee, { name: 'getEmployee' })
  async getEmployee(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Employee> {
    return await this.employeeService.getEmployee(id);
  }

  @Mutation(() => Employee, { name: 'createEmployee' })
  async createEmployee(
    @Args('createEmployeeInput') createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return await this.employeeService.createEmployee(createEmployeeDto);
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
