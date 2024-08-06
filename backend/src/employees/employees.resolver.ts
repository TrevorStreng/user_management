import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Employee } from './employee.entity';
import { EmployeesService } from './employees.service';

@Resolver((of: any) => Employee)
export class EmployeeResolver {
  constructor(private employeeService: EmployeesService) {}

  @Query((returns) => [Employee], { name: 'getEmployees' })
  getEmloyees() {
    return this.employeeService.getEmployees();
  }

  @Query((returns) => Employee, { name: 'getEmployee' })
  getEmployee(@Args('id', { type: () => Int }) id: number): Promise<Employee> {
    return this.employeeService.getEmployee(id);
  }
}
