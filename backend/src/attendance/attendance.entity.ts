import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Employee } from 'src/employees/employee.entity';

@ObjectType()
@Entity()
export class Attendance {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Employee, (employee) => employee.attendance)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Field()
  @Column()
  date: Date;

  @Field()
  @Column()
  check_in_time: String;

  @Field()
  @Column()
  check_out_time: String;

  @Field()
  @Column()
  status: string;
}
