import { Module } from '@nestjs/common';
import { EmployeeResolver } from './employees.resolver';
import { EmployeesService } from './employees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  providers: [EmployeeResolver, EmployeesService],
})
export class EmployeeModule {}
