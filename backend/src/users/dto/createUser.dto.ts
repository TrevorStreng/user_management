import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

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
}
