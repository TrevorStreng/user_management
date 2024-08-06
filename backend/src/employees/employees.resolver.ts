import { Query, Resolver } from '@nestjs/graphql';
import { Employee } from './employee.entity';
import { EmployeesService } from './employees.service';

@Resolver((of: any) => Employee)
export class EmployeeResolver {
  constructor(private employeeService: EmployeesService) {}

  @Query((returns) => [Employee])
  findAll() {
    return this.employeeService.findAll();
  }
}
