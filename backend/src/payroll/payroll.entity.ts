import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Employee } from 'src/employees/employee.entity';

@ObjectType()
@Entity()
export class Payroll {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Employee, (employee) => employee.payroll)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Field()
  @Column()
  pay_date: Date;

  @Field(() => Float)
  @Column()
  base_salary: number;

  @Field(() => Float)
  @Column()
  bonuses: number;

  @Field(() => Float)
  @Column()
  deductions: number;

  @Field(() => Float)
  @Column()
  net_salary: number;
}
