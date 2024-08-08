import { Module } from '@nestjs/common';
import { EmployeeResolver } from './employees.resolver';
import { EmployeesService } from './employees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Position } from 'src/position/position.entity';
import { Department } from 'src/department/department.entity';
import { Attendance } from 'src/attendance/attendance.entity';
import { Payroll } from 'src/payroll/payroll.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      Position,
      Department,
      Attendance,
      Payroll,
    ]),
  ],
  providers: [EmployeeResolver, EmployeesService],
})
export class EmployeeModule {}
