import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsDate, IsNumber } from 'class-validator';

@InputType()
export class AttendanceDto {
  @Field()
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  employee_id: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  check_in_time: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  check_out_time: string;

  @Field()
  @IsString()
  status: string;
}
