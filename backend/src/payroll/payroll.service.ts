import { Injectable } from '@nestjs/common';
import { Payroll } from './payroll.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PayrollDto } from './dto/payroll.dto';
import { Employee } from 'src/employees/employee.entity';
import { error } from 'console';

@Injectable()
export class PayrollService {
  constructor(
    @InjectRepository(Payroll)
    private payrollRepository: Repository<Payroll>,

    @InjectRepository(Employee)
    private emplyeeRepository: Repository<Payroll>,
  ) {}

  async getPayrolls(): Promise<Payroll[]> {
    return await this.payrollRepository.find();
  }

  async getPayroll(id: number): Promise<Payroll> {
    return await this.payrollRepository.findOneBy({ id });
  }

  async createPayroll(createPayrollDto: PayrollDto): Promise<Payroll> {
    const { employee_id, pay_date, base_salary, bonuses, deductions } =
      createPayrollDto;

    const employee = await this.emplyeeRepository.findOneBy({
      id: employee_id,
    });

    if (!employee) throw new error(`No employee found`);

    const net_salary = base_salary + bonuses - deductions;

    const payroll = this.payrollRepository.create({
      employee,
      pay_date,
      base_salary,
      bonuses,
      deductions,
      net_salary,
    });

    return await this.payrollRepository.save(payroll);
  }

  async updatePayroll(
    id: number,
    updatePayrollDto: PayrollDto,
  ): Promise<Payroll> {
    await this.payrollRepository.update(id, updatePayrollDto);
    return await this.payrollRepository.findOneBy({ id });
  }

  async deletePayroll(id: number): Promise<Boolean> {
    await this.payrollRepository.delete(id);
    return true;
  }
}
