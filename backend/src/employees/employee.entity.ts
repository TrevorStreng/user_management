import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Department } from 'src/department/department.entity';
import { Position } from 'src/position/position.entity';
import { User } from 'src/users/user.entity';

@ObjectType()
@Entity()
export class Employee {
  // @Field(() => Int)
  // @PrimaryGeneratedColumn()
  // id: number;
  @Field(() => Int)
  @OneToOne(() => User, (user) => user.employee)
  user: User;

  @Field()
  @Column()
  first_name: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column()
  date_of_birth: Date;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  phone_number: string;

  @Field()
  @Column()
  date_hired: Date;

  @Field(() => Float)
  @Column()
  salary: number;

  @Field(() => Department)
  @ManyToOne(() => Department, (department) => department.employees)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @Field(() => Position)
  @OneToOne(() => Position, (position) => position.employee)
  @JoinColumn({ name: 'position_id' })
  position: Position;
}
