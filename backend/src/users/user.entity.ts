import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Admin } from 'src/admin/admin.entity';
import { Employee } from 'src/employees/employee.entity';
import { Company } from 'src/company/company.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  role: string;

  @OneToOne(() => Admin, (admin) => admin.user)
  admin: Admin;

  @OneToOne(() => Employee, (employee) => employee.user)
  employee: Employee;

  @ManyToOne(() => Company, (company) => company.users)
  company: Company;
}
