import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';
import { PerformanceReview } from 'src/performanceReview/performanceReview.entity';

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
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(
    () => PerformanceReview,
    (performanceReview) => performanceReview.admin,
  )
  performanceReview: PerformanceReview;
}
