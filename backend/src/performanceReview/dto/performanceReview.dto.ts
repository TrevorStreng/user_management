import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';

@InputType()
export class PerformanceReviewDto {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  employee_id: number;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  admin_id: number;

  @Field()
  @IsDate()
  review_date: Date;

  @Field()
  @IsNumber()
  performance_score: number;

  @Field()
  @IsString()
  comments: string;
}
