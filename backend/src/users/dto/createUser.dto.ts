import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  role: string;

  // @Field(() => Int)
  // @IsNumber()
  // company_id: number;
}
