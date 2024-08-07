import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Department } from 'src/department/department.entity';
import { Employee } from 'src/employees/employee.entity';

@ObjectType()
@Entity()
export class Position {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  position_title: string;

  @Field(() => Department)
  @ManyToOne(() => Department, (department) => department.positions)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @OneToOne(() => Employee, (employee) => employee.position)
  employee: Employee;
}
