import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsString, IsNumber, IsDate } from 'class-validator';

@InputType()
export class UpdateEmployeeDto {
  @Field()
  @IsString()
  first_name: string;

  @Field()
  @IsString()
  last_name: string;

  @Field()
  @IsDate()
  date_of_birth: Date;

  @Field()
  @IsString()
  address: string;

  @Field()
  @IsString()
  phone_number: string;

  @Field()
  @IsDate()
  date_hired: Date;

  @Field(() => Float)
  @IsNumber()
  salary: number;

  @Field(() => Int)
  @IsNumber()
  department_id: number;

  @Field(() => Int)
  @IsNumber()
  position_id: number;
}
