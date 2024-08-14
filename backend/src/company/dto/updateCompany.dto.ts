import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateCompanyDto {
  @Field()
  @IsEmail()
  name?: string;

  @Field()
  @IsString()
  address?: string;

  @Field()
  @IsString()
  industry?: string;
}
