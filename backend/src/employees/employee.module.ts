import { Module } from '@nestjs/common';
import { EmployeeResolver } from './employees.resolver';
import { EmployeesService } from './employees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Position } from 'src/position/position.entity';
import { Department } from 'src/department/department.entity';
import { Attendance } from 'src/attendance/attendance.entity';
import { Payroll } from 'src/payroll/payroll.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { AdminService } from 'src/admin/admin.service';
import { Admin } from 'src/admin/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      Position,
      Department,
      Attendance,
      Payroll,
      User,
      Admin,
    ]),
  ],
  providers: [EmployeeResolver, EmployeesService, UsersService, AdminService],
})
export class EmployeeModule {}
