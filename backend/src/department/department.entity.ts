import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Employee } from 'src/employees/employee.entity';
import { Position } from 'src/position/position.entity';

@ObjectType()
@Entity()
export class Department {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  department_name: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];

  @OneToMany(() => Position, (position) => position.department)
  positions: Position[];
}
