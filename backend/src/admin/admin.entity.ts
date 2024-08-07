import { Entity, PrimaryGeneratedColumn, OneToOne, Column } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';

@ObjectType()
@Entity()
export class Admin {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  admin_level: number;

  @OneToOne(() => User, (user) => user.admin)
  user: User;
}
