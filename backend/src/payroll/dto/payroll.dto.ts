import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';

@InputType()
export class PayrollDto {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  employee_id: number;

  @Field()
  @IsDate()
  @IsNotEmpty()
  pay_date: Date;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  base_salary: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  bonuses: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  deductions: number;
}
