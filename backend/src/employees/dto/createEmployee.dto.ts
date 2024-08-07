import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';

@InputType()
export class CreateEmployeeDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @Field()
  @IsDate()
  @IsNotEmpty()
  date_of_birth: Date;

  @Field()
  @IsString()
  @IsNotEmpty()
  address: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @Field()
  @IsDate()
  @IsNotEmpty()
  date_hired: Date;

  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  salary: number;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  department_id: number;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  position_id: number;
}
