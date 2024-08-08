import { Module } from '@nestjs/common';
import { AttendanceResolver } from './attendance.resolver';
import { AttendanceService } from './attendance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './attendance.entity';
import { Employee } from 'src/employees/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance, Employee])],
  providers: [AttendanceResolver, AttendanceService],
})
export class AttendanceModule {}
