import { Args, Query, Resolver, Mutation, Int } from '@nestjs/graphql';
import { Payroll } from './payroll.entity';
import { PayrollService } from './payroll.service';
import { PayrollDto } from './dto/payroll.dto';

@Resolver((of: any) => Payroll)
export class PayrollResolver {
  constructor(private payrollService: PayrollService) {}

  @Query((returns) => [Payroll], { name: 'payrolls' })
  async getPayrolls(): Promise<Payroll[]> {
    return await this.payrollService.getPayrolls();
  }

  @Query((returns) => Payroll, { name: 'payroll' })
  async getPayroll(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Payroll> {
    return await this.payrollService.getPayroll(id);
  }

  @Mutation(() => Payroll, { name: 'createPayroll' })
  async createPayroll(
    @Args('createPayrollInput') createPayrollDto: PayrollDto,
  ): Promise<Payroll> {
    return await this.payrollService.createPayroll(createPayrollDto);
  }

  @Mutation(() => Payroll, { name: 'updatePayroll' })
  async updatePayroll(
    @Args('id', { type: () => Int }) id: number,
    @Args('updatePayrollInput') updatePayrollDto: PayrollDto,
  ): Promise<Payroll> {
    return await this.payrollService.updatePayroll(id, updatePayrollDto);
  }

  @Mutation(() => Boolean, { name: 'deletePayroll' })
  async deletePayroll(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Boolean> {
    await this.payrollService.deletePayroll(id);
    return true;
  }
}
