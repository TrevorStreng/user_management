import { Module } from '@nestjs/common';
import { PayrollResolver } from './payroll.resolver';
import { PayrollService } from './payroll.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payroll } from './payroll.entity';
import { Employee } from 'src/employees/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payroll, Employee])],
  providers: [PayrollResolver, PayrollService],
})
export class PayrollModule {}
