import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Employee } from 'src/employees/employee.entity';
import { Admin } from 'src/admin/admin.entity';

@ObjectType()
@Entity('performancereview')
export class PerformanceReview {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Employee, (employee) => employee.payroll)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @OneToOne(() => Admin, (admin) => admin.performanceReview)
  @JoinColumn({ name: 'admin_id' })
  admin: Admin;

  @Field()
  @Column()
  review_date: Date;

  @Field(() => Int)
  @Column()
  performance_score: number;

  @Field()
  @Column()
  comments: string;
}
